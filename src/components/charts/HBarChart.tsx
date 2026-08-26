import { ChartLegend } from '@/components/charts/ChartLegend'
import { chartHex, type ChartTone } from '@/lib/chartTheme'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { motion } from 'motion/react'

export type BarRow = {
  id: string
  label: string
  value: number
  display: string
  active?: boolean
  tone?: ChartTone
}

type HBarChartProps = {
  rows: BarRow[]
  max?: number
  caption?: string
  tone?: ChartTone
  onSelect?: (id: string) => void
}

export function HBarChart({ rows, max, caption, tone = 'ink', onSelect }: HBarChartProps) {
  const reduced = useReducedMotion()
  const peak = max ?? Math.max(...rows.map((row) => Math.abs(row.value)), 1)
  const legend = rows.map((row) => ({
    tone: row.tone ?? tone,
    label: legendLabel(row.tone ?? tone),
  }))

  return (
    <figure className="min-w-0">
      {caption ? (
        <figcaption className="mb-2 text-[13px] font-medium tracking-[0.04em] text-ink/55">
          {caption}
        </figcaption>
      ) : null}
      <div className="space-y-1.5">
        {rows.map((row, index) => {
          const width = `${Math.max(8, (Math.abs(row.value) / peak) * 100)}%`
          const fill = row.tone ?? tone
          return (
            <button
              key={row.id}
              type="button"
              onClick={() => onSelect?.(row.id)}
              className={`grid w-full grid-cols-[minmax(0,8.5rem)_1fr_auto] items-center gap-2 text-left ${
                onSelect ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <span
                className={`truncate text-[13px] leading-tight ${row.active ? 'text-ink' : 'text-ink/70'}`}
              >
                {row.label}
              </span>
              <span className="h-3 overflow-hidden bg-ink/8">
                <motion.span
                  className="block h-full"
                  style={{ background: chartHex(fill) }}
                  initial={{ width: reduced ? width : 0 }}
                  animate={{ width }}
                  transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : index * 0.04 }}
                />
              </span>
              <span className="tabular text-[13px] text-ink">{row.display}</span>
            </button>
          )
        })}
      </div>
      <ChartLegend items={legend} />
    </figure>
  )
}

function legendLabel(tone: ChartTone) {
  switch (tone) {
    case 'ink':
      return 'Baseline / citywide'
    case 'ai':
      return 'AI / demand'
    case 'vacancy':
      return 'Vacancy / risk'
    case 'asking':
      return 'Asking / rent'
    case 'muted':
      return 'Owner / occupier'
    default: {
      const _exhaustive: never = tone
      return _exhaustive
    }
  }
}
