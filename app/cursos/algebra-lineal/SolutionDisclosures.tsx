"use client";

import { useEffect } from "react";

export default function SolutionDisclosures() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>(".sol_thmwrapper").forEach((wrapper) => {
      const heading = wrapper.querySelector<HTMLElement>(".sol_thmheading");
      const content = wrapper.querySelector<HTMLElement>(".sol_thmcontent");
      if (!heading || !content) return;

      const setOpen = (open: boolean) => {
        content.hidden = !open;
        heading.setAttribute("aria-expanded", String(open));
        wrapper.classList.toggle("sol-is-open", open);
      };
      const toggle = () => setOpen(content.hidden);
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        toggle();
      };

      heading.setAttribute("role", "button");
      heading.setAttribute("tabindex", "0");
      heading.setAttribute("aria-expanded", "false");
      content.hidden = true;
      heading.addEventListener("click", toggle);
      heading.addEventListener("keydown", onKeyDown);

      cleanups.push(() => {
        heading.removeEventListener("click", toggle);
        heading.removeEventListener("keydown", onKeyDown);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
