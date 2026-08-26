import { fact } from '@/data/load'
import type { FundingChart } from '@/data/types'
import { formatFact } from '@/lib/format'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { motion } from 'motion/react'

type FundingSeriesChartProps = {
  chart: FundingChart
  active: boolean
  tone?: 'stage' | 'paper'
}

export function FundingSeriesChart({ chart, active, tone = 'stage' }: FundingSeriesChartProps) {
  const reduced = useReducedMotion()
  const items = chart.items ?? []
  const numeric = items.map((item) => {
    const print = fact(item.factId)
    return typeof print.value === 'number' ? Math.abs(print.value) : 0
  })
  const max = Math.max(...numeric, 1)
  const paper = tone === 'paper'

  return (
    <div className={paper ? 'border border-ink/10 bg-white/50 p-3' : 'density-glass flex h-full flex-col p-5'}>
      <p className={`text-[12px] tracking-[0.14em] uppercase ${paper ? 'text-ink/50' : 'text-paper/45'}`}>
        {chart.subtitle}
      </p>
      <h3 className={`mt-1 font-display leading-tight ${paper ? 'text-[20px] text-ink' : 'text-[24px] text-paper'}`}>
        {chart.title}
      </h3>
      <div className="mt-3 space-y-3">
        {items.map((item, index) => {
          const print = fact(item.factId)
          const support = item.supportFactId ? fact(item.supportFactId) : null
          const width =
            print.format === 'percent' || print.format === 'percentYoY'
              ? `${Math.min(100, Number(print.value ?? 0))}%`
              : `${Math.max(16, (numeric[index] / max) * 100)}%`
          return (
            <div key={`${chart.id}-${item.factId}`}>
              <div className="flex items-baseline justify-between gap-3">
                <p className={`text-[14px] ${paper ? 'text-ink/80' : 'text-paper/80'}`}>{item.label}</p>
                <p className={`tabular text-[15px] ${paper ? 'text-ink' : 'text-gold'}`}>{formatFact(print)}</p>
              </div>
              <div className={`mt-1.5 h-2.5 overflow-hidden rounded-sm ${paper ? 'bg-ink/8' : 'bg-paper/10'}`}>
                <motion.div
                  className={`h-full rounded-sm ${paper ? 'bg-forest' : 'bg-linear-to-r from-copper to-gold'}`}
                  initial={{ width: reduced ? width : 0 }}
                  animate={{ width: active ? width : 0 }}
                  transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : index * 0.1 }}
                />
              </div>
              {support ? (
                <p className={`mt-1 text-[12px] ${paper ? 'text-ink/50' : 'text-paper/45'}`}>
                  {formatFact(support)}
                  {item.supportSuffix ? ` ${item.supportSuffix}` : ''}
                </p>
              ) : print.note ? (
                <p className={`mt-1 text-[12px] ${paper ? 'text-ink/50' : 'text-paper/45'}`}>{print.note}</p>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
