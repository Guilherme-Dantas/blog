"use client"

import { useState } from "react"
import { Plate } from "@/components/plate"

const points = [
  {
    id: "p50",
    label: "p50",
    ms: 48,
    note: "A mediana cabe num orçamento folgado. Quase ninguém reclama dela.",
  },
  {
    id: "p95",
    label: "p95",
    ms: 190,
    note: "No pico, a fila já aparece. O gráfico médio ainda mente.",
  },
  {
    id: "p99",
    label: "p99",
    ms: 640,
    note: "O p99 é outra aplicação. É ele que estoura o timeout.",
  },
]

export function SeriesChart() {
  const [active, setActive] = useState("p99")
  const current = points.find((point) => point.id === active) ?? points[2]
  const max = Math.max(...points.map((point) => point.ms))

  return (
    <Plate caption="Fig. 01 · mesma rota, três leituras">
      <div className="series">
        <div className="series-bars" role="group" aria-label="Percentis de latência">
          {points.map((point) => (
            <button
              key={point.id}
              type="button"
              className="bar"
              aria-pressed={point.id === active}
              onClick={() => setActive(point.id)}
            >
              <span className="bar-track">
                <span className="bar-fill" style={{ height: `${(point.ms / max) * 100}%` }} />
              </span>
              <span className="bar-label">{point.label}</span>
            </button>
          ))}
        </div>
        <p className="series-readout">
          <strong>{current.ms} ms</strong>
          <span>{current.note}</span>
        </p>
      </div>
    </Plate>
  )
}
