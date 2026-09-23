import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const postsDir = path.join(root, "content", "posts")
const outFile = path.join(root, "lib", "post-registry.ts")
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function slugs() {
  if (!fs.existsSync(postsDir)) return []
  return fs
    .readdirSync(postsDir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() && fs.existsSync(path.join(postsDir, entry.name, "index.mdx")),
    )
    .map((entry) => entry.name)
    .sort()
}

function render(list) {
  const entries = list.map((slug) => {
    if (!slugPattern.test(slug)) {
      throw new Error(
        `Pasta de post inválida: "${slug}". Use letras minúsculas, números e hífens.`,
      )
    }
    return `  ${JSON.stringify(slug)}: () => import(${JSON.stringify(`@/content/posts/${slug}/index.mdx`)}),`
  })

  return `// Gerado por scripts/write-registry.mjs. Não edite.
import type { PostModule } from "@/lib/posts"

export const postModules: Record<string, () => Promise<PostModule>> = {
${entries.join("\n")}
}
`
}

function write() {
  const next = render(slugs())
  const previous = fs.existsSync(outFile) ? fs.readFileSync(outFile, "utf8") : ""
  if (previous === next) return
  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, next)
}

write()

if (process.argv.includes("--watch")) {
  let timer
  fs.mkdirSync(postsDir, { recursive: true })
  fs.watch(postsDir, { recursive: true }, () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      try {
        write()
      } catch (error) {
        console.error(error instanceof Error ? error.message : error)
      }
    }, 80)
  })
}
