import { ChartLegend } from '@/components/charts/ChartLegend'
import { chartHex, type ChartTone } from '@/lib/chartTheme'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { motion } from 'motion/react'

export type Column = {
  id: string
  label: string
  value: number
  display: string
  tone?: ChartTone
}

type VColumnChartProps = {
  columns: Column[]
  caption?: string
  max?: number
}

export function VColumnChart({ columns, caption, max }: VColumnChartProps) {
  const reduced = useReducedMotion()
  const peak = max ?? Math.max(...columns.map((column) => Math.abs(column.value)), 1)
  const tones = columns.map((column) => ({
    tone: column.tone ?? 'ink',
    label: legendLabel(column.tone ?? 'ink', column.label),
  }))

  return (
    <figure className="min-w-0">
      {caption ? (
        <figcaption className="mb-2 text-[13px] font-medium tracking-[0.04em] text-ink/55">{caption}</figcaption>
      ) : null}
      <div className={`grid items-end gap-2`} style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
        {columns.map((column, index) => {
          const height = `${Math.max(10, (Math.abs(column.value) / peak) * 100)}%`
          const tone = column.tone ?? 'ink'
          return (
            <div key={column.id} className="flex min-w-0 flex-col items-center">
              <p className="mb-1 text-center tabular text-[13px] leading-none text-ink">{column.display}</p>
              <div className="flex h-16 w-full items-end justify-center bg-ink/6 px-1.5">
                <motion.div
                  className="w-full max-w-10 rounded-t-sm"
                  style={{ background: chartHex(tone) }}
                  initial={{ height: reduced ? height : 0 }}
                  animate={{ height }}
                  transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : index * 0.05 }}
                />
              </div>
              <p className="mt-1.5 text-center text-[12px] leading-tight text-ink/70">{column.label}</p>
            </div>
          )
        })}
      </div>
      <ChartLegend items={tones} />
    </figure>
  )
}

function legendLabel(tone: ChartTone, fallback: string) {
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
      return fallback
    default: {
      const _exhaustive: never = tone
      return _exhaustive
    }
  }
}
