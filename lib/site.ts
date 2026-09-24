export function siteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const deploymentUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL.trim()}`
    : undefined
  return (configured || deploymentUrl || "http://localhost:3000").replace(/\/$/, "")
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
