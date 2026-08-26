import { ChartLegend } from '@/components/charts/ChartLegend'
import { chartHex, type ChartTone } from '@/lib/chartTheme'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { motion } from 'motion/react'

type Segment = {
  id: string
  label: string
  sharePct: number
  display: string
  tone: ChartTone
}

type StackBarProps = {
  segments: Segment[]
  caption?: string
  totalLabel?: string
}

export function StackBar({ segments, caption, totalLabel }: StackBarProps) {
  const reduced = useReducedMotion()

  return (
    <figure>
      {caption ? <figcaption className="mb-2 text-[13px] font-medium text-ink/55">{caption}</figcaption> : null}
      {totalLabel ? <p className="mb-2 font-display text-[28px] leading-none text-ink">{totalLabel}</p> : null}
      <div className="flex h-8 overflow-hidden bg-ink/8">
        {segments.map((segment, index) => (
          <motion.div
            key={segment.id}
            className="h-full"
            style={{ background: chartHex(segment.tone) }}
            initial={{ width: reduced ? `${segment.sharePct}%` : 0 }}
            animate={{ width: `${segment.sharePct}%` }}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : index * 0.08 }}
            title={`${segment.label} ${segment.display}`}
          />
        ))}
      </div>
      <ChartLegend
        items={segments.map((segment) => ({
          tone: segment.tone,
          label: `${segment.label} · ${segment.display}`,
        }))}
      />
    </figure>
  )
}
