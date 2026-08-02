import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const image = `${protocol}://${host}/og-cmspec.png`;

  return {
    title: "CMSpec — Conocimiento a través de todo el espectro",
    description: "Matemáticas, salud, tejido y exploración: un espectro de intereses de Camila Muñoz.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "CMSpec — Conocimiento a través de todo el espectro",
      description: "Matemáticas, salud, tejido y exploración: un espectro de intereses de Camila Muñoz.",
      images: [{ url: image, width: 1536, height: 1024, alt: "CMSpec — Conocimiento a través de todo el espectro" }],
    },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
