import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/posts"
import { loadPost, loadVisibleMeta } from "@/lib/load-posts"

export async function generateStaticParams() {
  const posts = await loadVisibleMeta()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) return { title: "Nota não encontrada" }
  return { title: post.title, description: post.description }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) notFound()
  const Content = post.Content

  return (
    <article>
      <header className="post-head">
        <p className="post-kicker">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.categories.map((category) => (
            <Link key={category} href={`/?categoria=${encodeURIComponent(category)}`}>
              {category}
            </Link>
          ))}
        </p>
        <h1>{post.title}</h1>
        <p className="lede">{post.description}</p>
      </header>
      <div className="prose">
        <Content />
      </div>
    </article>
  )
}
