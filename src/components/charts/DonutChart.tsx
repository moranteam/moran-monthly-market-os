import { useReducedMotion } from '@/hooks/useReducedMotion'
import { motion } from 'motion/react'

type DonutChartProps = {
  percent: number
  label: string
  remainder: string
  caption?: string
}

export function DonutChart({ percent, label, remainder, caption }: DonutChartProps) {
  const reduced = useReducedMotion()
  const radius = 36
  const circ = 2 * Math.PI * radius
  const dash = (Math.min(100, Math.max(0, percent)) / 100) * circ

  return (
    <figure className="flex items-center gap-4">
      <svg viewBox="0 0 96 96" className="h-24 w-24 shrink-0" aria-hidden>
        <circle cx="48" cy="48" r={radius} fill="none" stroke="#0b1c18" strokeOpacity="0.1" strokeWidth="10" />
        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="#d36f35"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform="rotate(-90 48 48)"
          initial={{ strokeDasharray: reduced ? `${dash} ${circ}` : `0 ${circ}` }}
          animate={{ strokeDasharray: `${dash} ${circ}` }}
          transition={{ duration: reduced ? 0 : 0.7 }}
        />
        <text
          x="48"
          y="52"
          textAnchor="middle"
          className="tabular"
          fill="#0b1c18"
          fontSize="16"
          fontFamily="Instrument Serif, Times New Roman, serif"
        >
          {Number.isInteger(percent) ? percent : percent.toFixed(1)}%
        </text>
      </svg>
      <div>
        {caption ? <p className="text-[13px] font-medium text-ink/55">{caption}</p> : null}
        <p className="mt-0.5 text-[16px] leading-snug text-ink">{label}</p>
        <p className="mt-1 text-[14px] text-ink/60">{remainder}</p>
      </div>
    </figure>
  )
}
