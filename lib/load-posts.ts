import { postModules } from "@/lib/post-registry"
import { parseFrontmatter, visiblePosts, type PostMeta, type PostModule } from "@/lib/posts"

export type LoadedPost = PostMeta & { Content: PostModule["default"] }

export function includeDrafts(): boolean {
  return process.env.NODE_ENV === "development"
}

async function loadMeta(slug: string, load: () => Promise<PostModule>): Promise<PostMeta> {
  const mod = await load()
  return parseFrontmatter(slug, mod.frontmatter)
}

export async function loadAllMeta(): Promise<PostMeta[]> {
  const posts = await Promise.all(
    Object.entries(postModules).map(([slug, load]) => loadMeta(slug, load)),
  )
  return visiblePosts(posts, true)
}

export async function loadVisibleMeta(): Promise<PostMeta[]> {
  return visiblePosts(await loadAllMeta(), includeDrafts())
}

export async function loadPost(slug: string): Promise<LoadedPost | null> {
  const load = postModules[slug]
  if (!load) return null
  const mod = await load()
  const meta = parseFrontmatter(slug, mod.frontmatter)
  if (meta.draft && !includeDrafts()) return null
  return { ...meta, Content: mod.default }
}
