import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer, WhatsAppButton } from "@/components/Footer";
import { Cursor, Intro, SmoothScroll } from "@/components/Effects";
import { MotionProvider } from "@/components/motion";
import { site } from "@/content/site";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Vistas Atelier | Websites, apps & data tools for growing businesses",
    template: "%s | Vistas Atelier",
  },
  description: site.description,
  keywords: ["web design studio India", "website development", "web app development", "UI/UX design", "dashboard development", "small business website"],
  authors: [{ name: site.founder }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Vistas Atelier | Websites, apps & data tools",
    description: site.description,
    url: site.url,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#15110e" },
  ],
};

// Applies the saved or system theme before first paint so there's no flash.
const themeScript = `try{var t=localStorage.getItem("va-theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description: site.description,
  founder: { "@type": "Person", name: site.founder },
  areaServed: "Worldwide",
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  sameAs: [site.social.linkedin, site.social.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}.split-word{transform:none!important}`}</style>
        </noscript>
      </head>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionProvider>
          <Intro />
          <SmoothScroll />
          <Cursor />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
