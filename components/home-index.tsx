"use client"

import Link from "next/link"
import { useState } from "react"
import { filterPosts, formatDate, listCategories, type PostMeta } from "@/lib/posts"

function writeUrl(query: string, category: string | null) {
  const params = new URLSearchParams()
  if (query.trim()) params.set("q", query.trim())
  if (category) params.set("categoria", category)
  const search = params.toString()
  window.history.replaceState(null, "", search ? `/?${search}` : "/")
}

export function HomeIndex({
  posts,
  initialQuery,
  initialCategory,
}: {
  posts: PostMeta[]
  initialQuery: string
  initialCategory: string | null
}) {
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState<string | null>(initialCategory)
  const categories = listCategories(posts)
  const visible = filterPosts(posts, query, category)
  const featured = visible[0]
  const archive = visible.slice(1)
  const hasFilter = query.trim() !== "" || category !== null

  function selectCategory(next: string | null) {
    setCategory(next)
    writeUrl(query, next)
  }

  function clearFilters() {
    setQuery("")
    setCategory(null)
    writeUrl("", null)
  }

  return (
    <div className="index">
      <section className="intro" aria-labelledby="intro-title">
        <p className="eyebrow">Notas, ensaios e experimentos</p>
        <h1 id="intro-title">Tecnologia, por dentro e ao redor.</h1>
        <p className="intro-copy">
          Textos sobre sistemas, ferramentas e as escolhas por trás da tecnologia que usamos.
        </p>
      </section>

      {featured ? (
        <section className="latest" aria-labelledby="latest-title">
          <p className="section-label" id="latest-title">Leitura mais recente</p>
          <article className="featured">
            <div className="featured-main">
              <p className="featured-meta">
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                {featured.draft ? <span className="draft-label">Rascunho</span> : null}
                {featured.categories.map((item) => (
                  <button key={item} type="button" onClick={() => selectCategory(item)}>
                    {item}
                  </button>
                ))}
              </p>
              <h2>
                <Link href={`/posts/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p className="featured-description">{featured.description}</p>
            </div>
            <Link className="read-link" href={`/posts/${featured.slug}`}>
              Ler texto <span aria-hidden="true">↗</span>
            </Link>
          </article>
        </section>
      ) : null}

      <section className="archive" aria-labelledby="archive-title">
        <div className="archive-heading">
          <h2 id="archive-title">Arquivo</h2>
          <p className="count" aria-live="polite">
            {visible.length === 1 ? "1 texto" : `${visible.length} textos`}
          </p>
        </div>
        <div className="filters">
          <label className="search">
            <span>Buscar</span>
            <input
              type="search"
              value={query}
              placeholder="Título ou resumo"
              onChange={(event) => {
                const next = event.target.value
                setQuery(next)
                writeUrl(next, category)
              }}
            />
          </label>
          <div className="chips" role="group" aria-label="Filtrar por categoria">
            <button
              type="button"
              className="chip"
              aria-pressed={category === null}
              onClick={() => selectCategory(null)}
            >
              Todas
            </button>
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className="chip"
                aria-pressed={category === item}
                onClick={() => selectCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {archive.length > 0 ? (
          <ol className="archive-list">
            {archive.map((post) => (
              <li className="archive-item" key={post.slug}>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <Link className="archive-title" href={`/posts/${post.slug}`}>
                  {post.title}{post.draft ? " · Rascunho" : ""}
                </Link>
                <span className="archive-categories" aria-label="Categorias">
                  {post.categories.map((item) => <span key={item}>{item}</span>)}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="empty">
            <p>{hasFilter ? "Não encontrei textos com esses filtros." : "Ainda não há textos publicados."}</p>
            {hasFilter ? (
              <button type="button" className="text-button" onClick={clearFilters}>
                Limpar filtros
              </button>
            ) : null}
          </div>
        )}
      </section>
    </div>
  )
}
