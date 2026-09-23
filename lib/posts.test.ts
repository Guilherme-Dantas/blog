import { describe, expect, it } from "vitest"
import {
  filterPosts,
  formatDate,
  listCategories,
  parseFrontmatter,
  visiblePosts,
  type PostMeta,
} from "./posts"

const base = {
  title: "A média esconde a fila",
  description: "Três leituras da mesma rota.",
  date: "2026-09-23",
  categories: ["performance"],
  draft: false,
}

function meta(overrides: Partial<PostMeta> = {}): PostMeta {
  return {
    slug: "nota",
    title: "Nota",
    description: "Resumo",
    date: "2026-09-01",
    categories: ["ferramentas"],
    draft: false,
    ...overrides,
  }
}

describe("parseFrontmatter", () => {
  it("aceita um post válido", () => {
    expect(parseFrontmatter("fila", base)).toEqual({
      slug: "fila",
      title: "A média esconde a fila",
      description: "Três leituras da mesma rota.",
      date: "2026-09-23",
      categories: ["performance"],
      draft: false,
    })
  })

  it("trata draft ausente como publicado", () => {
    expect(
      parseFrontmatter("fila", {
        title: base.title,
        description: base.description,
        date: base.date,
        categories: base.categories,
      }).draft,
    ).toBe(false)
  })

  it("normaliza data vinda como Date UTC", () => {
    expect(
      parseFrontmatter("fila", { ...base, date: new Date("2026-09-23T00:00:00.000Z") }).date,
    ).toBe("2026-09-23")
  })

  it("recusa post sem título", () => {
    expect(() => parseFrontmatter("fila", { ...base, title: "  " })).toThrow(/title/)
  })

  it("recusa post sem categoria", () => {
    expect(() => parseFrontmatter("fila", { ...base, categories: [] })).toThrow(/categories/)
  })

  it("recusa data inválida", () => {
    expect(() => parseFrontmatter("fila", { ...base, date: "23/09/2026" })).toThrow(/date/)
  })
})

describe("visiblePosts", () => {
  const posts = [
    meta({ slug: "antigo", title: "Antigo", date: "2026-01-01" }),
    meta({ slug: "rascunho", title: "Rascunho", date: "2026-09-22", draft: true }),
    meta({ slug: "novo", title: "Novo", date: "2026-09-23" }),
  ]

  it("esconde rascunho e ordena do mais recente", () => {
    expect(visiblePosts(posts, false).map((post) => post.slug)).toEqual(["novo", "antigo"])
  })

  it("mantém rascunho quando o preview pede", () => {
    expect(visiblePosts(posts, true).map((post) => post.slug)).toEqual([
      "novo",
      "rascunho",
      "antigo",
    ])
  })
})

describe("listCategories", () => {
  it("junta categorias sem duplicar e ordena em português", () => {
    expect(
      listCategories([
        meta({ categories: ["arquitetura", "performance"] }),
        meta({ categories: ["performance", "áudio"] }),
      ]),
    ).toEqual(["arquitetura", "áudio", "performance"])
  })
})

describe("formatDate", () => {
  it("formata sem depender do fuso ou do motor de Intl", () => {
    expect(formatDate("2026-09-23")).toBe("23 set 2026")
  })
})

describe("filterPosts", () => {
  const posts = [
    meta({
      slug: "fila",
      title: "A média esconde a fila",
      description: "Latência no p99",
      categories: ["performance", "arquitetura"],
    }),
    meta({
      slug: "preview",
      title: "Do preview ao ar",
      description: "Publicar uma nota",
      categories: ["ferramentas"],
    }),
  ]

  it("busca no título e no resumo, ignorando acento", () => {
    expect(filterPosts(posts, "LATENCIA", null).map((post) => post.slug)).toEqual(["fila"])
  })

  it("cruza texto e categoria", () => {
    expect(filterPosts(posts, "fila", "arquitetura").map((post) => post.slug)).toEqual(["fila"])
    expect(filterPosts(posts, "fila", "ferramentas")).toEqual([])
  })

  it("trata lista vazia como resultado, não como erro", () => {
    expect(filterPosts(posts, "inexistente", null)).toEqual([])
    expect(filterPosts(posts, "", "ausente")).toEqual([])
  })
})
