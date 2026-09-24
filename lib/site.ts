export function siteUrl(): string {
  const deploymentUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000"
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? deploymentUrl
  return configured.replace(/\/$/, "")
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
