# Guilherme

Notas sobre tecnologia. O texto fica em MDX, a figura interativa fica ao lado da nota, e a Vercel publica o que o GitHub recebe.

## Preview local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Rascunho (`draft: true`) aparece aqui e some no build de produção.

## Escrever uma nota

Crie uma pasta em `content/posts`. O nome da pasta é o endereço: `content/posts/minha-nota` vira `/posts/minha-nota`.

```mdx
---
title: Título da nota
description: Uma frase que a home usa na busca.
date: "2026-09-23"
categories:
  - ferramentas
draft: false
---

O texto vem aqui.
```

A data fica entre aspas. Categorias nascem desse campo: a home monta os filtros sozinha.

`npm run dev` observa a pasta e registra a nota nova. Se o endereço não aparecer, salve de novo ou reinicie o preview.

## Figura interativa

Um componente na mesma pasta da nota:

```tsx
"use client"

import { Plate } from "@/components/plate"

export function Figura() {
  return (
    <Plate caption="Fig. 01 · o que a figura mostra">
      <p>Qualquer React. D3, Plot ou Three entram por import.</p>
    </Plate>
  )
}
```

No MDX:

```mdx
import { Figura } from "./figura"

<Figura />
```

`Plate` desenha a prancha e isola a figura: se ela quebrar, o texto da nota continua.

Biblioteca nova é dependência do projeto (`npm install d3`) e um import dentro do componente da nota. Não precisa de serviço à parte.

## Publicar

1. Suba este repositório para o GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório. Framework: Next.js. O build é `npm run build`.
3. Defina `NEXT_PUBLIC_SITE_URL` com o domínio final, por exemplo `https://blog.seudominio.com`.
4. Cada push na branch principal publica. Cada pull request ganha uma URL de preview.

O RSS fica em `/rss.xml`.
