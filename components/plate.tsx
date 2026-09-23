"use client"

import { Component, type ReactNode } from "react"

type BoundaryProps = { children: ReactNode }
type BoundaryState = { failed: boolean }

class FigBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false }

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <p className="figure-error" role="alert">
          Esta figura falhou ao renderizar.
        </p>
      )
    }
    return this.props.children
  }
}

export function Plate({
  caption,
  children,
}: {
  caption: string
  children: ReactNode
}) {
  return (
    <figure className="plate">
      <FigBoundary>
        <div className="plate-canvas">{children}</div>
      </FigBoundary>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
