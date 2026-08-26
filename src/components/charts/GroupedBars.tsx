import { ChartLegend } from '@/components/charts/ChartLegend'
import { chartHex, type ChartTone } from '@/lib/chartTheme'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { motion } from 'motion/react'

export type GroupedSeries = {
  key: string
  label: string
  tone: ChartTone
}

export type GroupedCategory = {
  id: string
  label: string
  values: Record<string, { value: number; display: string }>
}

type GroupedBarsProps = {
  caption?: string
  series: GroupedSeries[]
  categories: GroupedCategory[]
}

export function GroupedBars({ caption, series, categories }: GroupedBarsProps) {
  const reduced = useReducedMotion()
  const peaks = Object.fromEntries(
    series.map((item) => [
      item.key,
      Math.max(...categories.map((category) => Math.abs(category.values[item.key]?.value ?? 0)), 1),
    ]),
  )

  return (
    <figure className="min-w-0">
      {caption ? (
        <figcaption className="mb-2 text-[13px] font-medium tracking-[0.04em] text-ink/55">{caption}</figcaption>
      ) : null}
      <div
        className="grid items-end gap-3"
        style={{ gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))` }}
      >
        {categories.map((category) => (
          <div key={category.id} className="min-w-0">
            <div className="flex h-24 items-end justify-center gap-1 bg-ink/6 px-2">
              {series.map((item, index) => {
                const cell = category.values[item.key]
                const value = cell?.value ?? 0
                const height = `${Math.max(8, (Math.abs(value) / peaks[item.key]) * 100)}%`
                return (
                  <div key={item.key} className="flex h-full w-full max-w-8 flex-col items-center justify-end">
                    <p className="mb-0.5 text-center tabular text-[11px] leading-none text-ink">{cell?.display ?? '—'}</p>
                    <motion.div
                      className="w-full rounded-t-sm"
                      style={{ background: chartHex(item.tone) }}
                      initial={{ height: reduced ? height : 0 }}
                      animate={{ height }}
                      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : index * 0.06 }}
                    />
                  </div>
                )
              })}
            </div>
            <p className="mt-1.5 text-center text-[12px] leading-tight text-ink/70">{category.label}</p>
          </div>
        ))}
      </div>
      <ChartLegend items={series.map((item) => ({ tone: item.tone, label: item.label }))} />
    </figure>
  )
}
