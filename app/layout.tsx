import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cmspec-camila.hector-math.chatgpt.site";
const image = "/og-cmspec.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CMSpec — Conocimiento a través de todo el espectro",
  description: "Matemáticas, salud, tejido y exploración: un espectro de intereses de Camila Muñoz.",
  icons: { icon: `${basePath}/favicon.svg`, shortcut: `${basePath}/favicon.svg` },
  openGraph: {
    title: "CMSpec — Conocimiento a través de todo el espectro",
    description: "Matemáticas, salud, tejido y exploración: un espectro de intereses de Camila Muñoz.",
    images: [{ url: image, width: 1536, height: 1024, alt: "CMSpec — Conocimiento a través de todo el espectro" }],
  },
  twitter: { card: "summary_large_image", images: [image] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body id="top" className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <a className="back-to-top" href="#top" aria-label="Volver al inicio de la página" title="Volver arriba">
          <span aria-hidden="true">↑</span>
        </a>
      </body>
    </html>
  );
}
