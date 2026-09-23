import { HomeIndex } from "@/components/home-index"
import { loadVisibleMeta } from "@/lib/load-posts"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string }>
}) {
  const params = await searchParams
  const posts = await loadVisibleMeta()
  const category = params.categoria?.trim() ? params.categoria : null

  return (
    <HomeIndex posts={posts} initialQuery={params.q ?? ""} initialCategory={category} />
  )
}
