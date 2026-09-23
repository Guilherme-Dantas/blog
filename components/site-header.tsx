import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="mast">
      <Link className="mark" href="/">Guilherme</Link>
      <nav className="mast-nav" aria-label="Navegação principal">
        <a className="rss" href="/rss.xml">RSS</a>
        <ThemeToggle />
      </nav>
    </header>
  )
}
