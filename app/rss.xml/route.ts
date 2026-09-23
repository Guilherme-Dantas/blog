import { loadVisibleMeta } from "@/lib/load-posts"
import { escapeXml, siteUrl } from "@/lib/site"

export async function GET() {
  const posts = await loadVisibleMeta()
  const origin = siteUrl()
  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${origin}/posts/${post.slug}</link>
      <guid>${origin}/posts/${post.slug}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00.000Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`,
    )
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Guilherme</title>
    <link>${origin}</link>
    <description>Notas sobre tecnologia.</description>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
