import type { DemandBand } from '@/data/types'
import { formatPercent } from '@/lib/format'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { motion } from 'motion/react'

type DemandBandsProps = {
  bands: DemandBand[]
  active: boolean
}

export function DemandBands({ bands, active }: DemandBandsProps) {
  const reduced = useReducedMotion()
  return (
    <div className="space-y-3">
      {bands.map((band, index) => {
        const measured = band.sharePct !== null && !band.placeholder
        const width = measured ? `${Math.max(22, band.sharePct ?? 0)}%` : '46%'
        return (
          <div key={band.id}>
            <div className="flex items-baseline justify-between">
              <p className="text-[15px] text-paper">{band.label}</p>
              <p className={`tabular text-[14px] ${measured ? 'text-cryo' : 'text-paper/40'}`}>
                {measured ? formatPercent(band.sharePct ?? 0) : 'Not restated'}
              </p>
            </div>
            <div className="mt-1.5 h-8 overflow-hidden rounded-sm bg-paper/8">
              <motion.div
                className={`h-full ${measured ? 'bg-cryo/70' : 'placeholder-hatch border-r border-dashed border-paper/20'}`}
                initial={{ width: reduced ? width : 0 }}
                animate={{ width: active ? width : 0 }}
                transition={{ duration: reduced ? 0 : 0.75, delay: reduced ? 0 : index * 0.08 }}
              />
            </div>
            <p className="mt-1 text-[12px] text-paper/40">{band.note}</p>
          </div>
        )
      })}
    </div>
  )
}
