import { NameWithMark } from '@/components/CompanyMark'
import type { NamedRound } from '@/data/types'
import { formatUsd } from '@/lib/format'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { motion } from 'motion/react'

type NamedRoundChartProps = {
  rounds: NamedRound[]
  active: boolean
  tone?: 'stage' | 'paper'
}

export function NamedRoundChart({ rounds, active, tone = 'stage' }: NamedRoundChartProps) {
  const reduced = useReducedMotion()
  const max = Math.max(...rounds.map((round) => round.amountUsd), 1)
  const paper = tone === 'paper'
  return (
    <div className="space-y-3">
      {rounds.map((round, index) => {
        const width = `${Math.max(18, (round.amountUsd / max) * 100)}%`
        return (
          <div key={round.id}>
            <div className="flex items-baseline justify-between gap-3">
              <p className={`flex min-w-0 items-center gap-2 text-[15px] ${paper ? 'text-ink' : 'text-paper'}`}>
                <NameWithMark name={round.company} size="lg" />
                <span className={`text-[13px] ${paper ? 'text-ink/50' : 'text-paper/45'}`}>
                  {round.round} · {round.city}
                </span>
              </p>
              <p className={`tabular text-[15px] ${paper ? 'text-ink' : 'text-gold'}`}>
                {formatUsd(round.amountUsd)}
              </p>
            </div>
            <div className={`mt-1.5 h-2.5 overflow-hidden rounded-sm ${paper ? 'bg-ink/8' : 'bg-paper/10'}`}>
              <motion.div
                className={`h-full rounded-sm ${paper ? 'bg-copper' : 'bg-linear-to-r from-copper to-gold'}`}
                initial={{ width: reduced ? width : 0 }}
                animate={{ width: active ? width : 0 }}
                transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : index * 0.12 }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
