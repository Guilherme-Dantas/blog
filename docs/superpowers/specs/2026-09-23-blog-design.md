# Blog técnico com figuras interativas

Notas pessoais de tecnologia, em português, com React dentro do texto. Preview local com `npm run dev`. Push na branch principal publica na Vercel; pull request ganha URL de preview.

## Decisões

- Next.js (App Router) e TypeScript, no repositório `F:\homelab\blog`.
- Cada nota é `content/posts/<slug>/index.mdx`. O slug é o nome da pasta.
- Figura reutilizável em `components/`. Figura de uma nota só, ao lado do `index.mdx`, importada por ele.
- Frontmatter obrigatório: `title`, `description`, `date` (`AAAA-MM-DD`), `categories` (pelo menos uma). `draft` opcional, padrão `false`.
- Frontmatter inválido ou import quebrado falha o build. A Vercel não publica.
- `draft: true` aparece no `next dev` e sai da home, do RSS e das rotas públicas no build de produção. Slug ausente ou rascunho em produção responde 404.
- A home lista notas visíveis, da mais recente para a mais antiga. Busca no título e na descrição, no browser, sem acento. Filtro por categoria. Os dois juntos. Lista vazia é um estado vazio, com o filtro ainda na tela.
- Categorias são a união das categorias das notas visíveis.
- RSS em `/rss.xml`, só com notas visíveis naquele ambiente.
- Sem comentários, login, CMS ou busca externa.
- `Plate` envolve a figura. Se o componente lançar erro ao renderizar, a prancha mostra o aviso e o resto da nota permanece.
- `NEXT_PUBLIC_SITE_URL` é a origem dos links do RSS. Sem a variável, o fallback é `http://localhost:3000`.

## Peças

| Peça | Função |
| --- | --- |
| `lib/posts.ts` | Validar frontmatter, esconder rascunho, ordenar, listar categorias, filtrar |
| `scripts/write-registry.mjs` | Gerar `lib/post-registry.ts` a partir das pastas de notas |
| `lib/load-posts.ts` | Carregar MDX e aplicar a regra de rascunho |
| `components/home-index.tsx` | Busca e categorias no browser |
| `components/plate.tsx` | Prancha da figura e limite de erro |
| `app/posts/[slug]/page.tsx` | Nota |
| `app/rss.xml/route.ts` | Feed |

## Testes

Vitest cobre validação, rascunho, categorias e filtro. O post `p99-nao-e-media` prova o MDX com um componente clicável. O post `nota-interna` prova o rascunho.
