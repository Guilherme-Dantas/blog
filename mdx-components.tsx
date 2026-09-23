import type { MDXComponents } from "mdx/types"
import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"
import { Plate } from "@/components/plate"

function Anchor({ href, children, ...props }: ComponentProps<"a">) {
  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} {...props} rel="noreferrer" target="_blank">
      {children}
    </a>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: Anchor,
    Plate: Plate as (props: { caption: string; children?: ReactNode }) => ReactNode,
    ...components,
  }
}
