"use client"

export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement
    const current = root.dataset.theme ?? (
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    )
    const next = current === "dark" ? "light" : "dark"
    root.dataset.theme = next
    window.localStorage.setItem("blog-theme", next)
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Alternar tema claro e escuro" title="Alternar tema">
      ◐ <span>Tema</span>
    </button>
  )
}
