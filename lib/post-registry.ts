// Gerado por scripts/write-registry.mjs. Não edite.
import type { PostModule } from "@/lib/posts"

export const postModules: Record<string, () => Promise<PostModule>> = {
  "do-preview-ao-ar": () => import("@/content/posts/do-preview-ao-ar/index.mdx"),
  "nota-interna": () => import("@/content/posts/nota-interna/index.mdx"),
  "p99-nao-e-media": () => import("@/content/posts/p99-nao-e-media/index.mdx"),
}
