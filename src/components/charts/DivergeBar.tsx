import { ChartLegend } from '@/components/charts/ChartLegend'
import { chartHex } from '@/lib/chartTheme'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { motion } from 'motion/react'

type DivergeBarProps = {
  caption?: string
  label: string
  value: number
  display: string
}

export function DivergeBar({ caption, label, value, display }: DivergeBarProps) {
  const reduced = useReducedMotion()
  const positive = value >= 0
  const tone = positive ? 'ai' : 'vacancy'
  const width = `${Math.min(48, 18 + Math.min(30, Math.abs(value) / 8_000))}%`

  return (
    <figure className="min-w-0">
      {caption ? (
        <figcaption className="mb-2 text-[13px] font-medium tracking-[0.04em] text-ink/55">{caption}</figcaption>
      ) : null}
      <div className="flex items-center justify-between gap-3 text-[13px]">
        <span className="text-ink/70">{label}</span>
        <span className="tabular text-ink">{display}</span>
      </div>
      <div className="relative mt-1.5 h-3 bg-ink/8">
        <span className="absolute inset-y-0 left-1/2 w-px bg-ink/25" />
        <motion.span
          className="absolute top-0 h-full"
          style={{
            background: chartHex(tone),
            left: positive ? '50%' : undefined,
            right: positive ? undefined : '50%',
          }}
          initial={{ width: reduced ? width : 0 }}
          animate={{ width }}
          transition={{ duration: reduced ? 0 : 0.55 }}
        />
      </div>
      <ChartLegend
        items={[
          { tone: 'ai', label: 'Positive absorption' },
          { tone: 'vacancy', label: 'Negative absorption' },
        ]}
      />
    </figure>
  )
}
