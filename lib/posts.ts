import type { ComponentType } from "react"

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  categories: string[]
  draft: boolean
}

export type PostModule = {
  frontmatter: unknown
  default: ComponentType
}

const datePattern = /^\d{4}-\d{2}-\d{2}$/

function fail(slug: string, message: string): never {
  throw new Error(`Post "${slug}": ${message}`)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function dateToIso(value: unknown): string | null {
  if (typeof value === "string" && datePattern.test(value)) return value
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const year = value.getUTCFullYear()
    const month = String(value.getUTCMonth() + 1).padStart(2, "0")
    const day = String(value.getUTCDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }
  return null
}

export function parseFrontmatter(slug: string, raw: unknown): PostMeta {
  if (!isRecord(raw)) fail(slug, "falta o frontmatter.")

  const title = raw.title
  if (typeof title !== "string" || title.trim() === "") {
    fail(slug, "title precisa ser um texto.")
  }

  const description = raw.description
  if (typeof description !== "string" || description.trim() === "") {
    fail(slug, "description precisa ser um texto.")
  }

  const date = dateToIso(raw.date)
  if (!date) fail(slug, "date precisa ser AAAA-MM-DD.")

  if (!Array.isArray(raw.categories) || raw.categories.length === 0) {
    fail(slug, "categories precisa ter pelo menos uma categoria.")
  }
  const categories = raw.categories.map((category) => {
    if (typeof category !== "string" || category.trim() === "") {
      fail(slug, "cada categoria precisa ser um texto.")
    }
    return category.trim()
  })

  if (raw.draft !== undefined && typeof raw.draft !== "boolean") {
    fail(slug, "draft precisa ser true ou false.")
  }

  return {
    slug,
    title: title.trim(),
    description: description.trim(),
    date,
    categories,
    draft: raw.draft ?? false,
  }
}

export function fold(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("pt-BR")
}

export function visiblePosts(posts: PostMeta[], includeDrafts: boolean): PostMeta[] {
  return posts
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? 1 : -1
      return a.title.localeCompare(b.title, "pt-BR")
    })
}

export function listCategories(posts: PostMeta[]): string[] {
  return [...new Set(posts.flatMap((post) => post.categories))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  )
}

export function filterPosts(
  posts: PostMeta[],
  query: string,
  category: string | null,
): PostMeta[] {
  const needle = fold(query.trim())
  return posts.filter((post) => {
    const categoryOk = !category || post.categories.includes(category)
    const textOk =
      !needle ||
      fold(post.title).includes(needle) ||
      fold(post.description).includes(needle)
    return categoryOk && textOk
  })
}

const months = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
]

export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-")
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`
}
