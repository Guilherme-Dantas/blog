import type { Metadata } from "next"
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google"
import Script from "next/script"
import { SiteHeader } from "@/components/site-header"
import { siteUrl } from "@/lib/site"
import "./globals.css"

const display = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Guilherme",
    template: "%s · Guilherme",
  },
  description: "Notas sobre tecnologia. Texto, opinião e figura que dá para mexer.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${mono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-preference" strategy="beforeInteractive">
          {`try { var savedTheme = localStorage.getItem("blog-theme"); if (savedTheme === "light" || savedTheme === "dark") document.documentElement.dataset.theme = savedTheme; } catch {}`}
        </Script>
        <a className="skip" href="#conteudo">
          Ir para o conteúdo
        </a>
        <div className="shell">
          <SiteHeader />
          <main id="conteudo">{children}</main>
        </div>
      </body>
    </html>
  )
}
