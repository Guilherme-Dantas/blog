export function siteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  return configured.replace(/\/$/, "")
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
