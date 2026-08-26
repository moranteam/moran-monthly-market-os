import { useReducedMotion } from '@/hooks/useReducedMotion'
import { motion } from 'motion/react'

type CompareItem = {
  label: string
  display: string
  value: number
  accent?: 'copper' | 'forest' | 'cryo'
}

type CompareBarsProps = {
  items: CompareItem[]
  caption?: string
}

const fill: Record<NonNullable<CompareItem['accent']>, string> = {
  copper: 'bg-copper',
  forest: 'bg-forest',
  cryo: 'bg-cryo',
}

export function CompareBars({ items, caption }: CompareBarsProps) {
  const reduced = useReducedMotion()
  const max = Math.max(...items.map((item) => Math.abs(item.value)), 1)

  return (
    <figure>
      {caption ? <figcaption className="mb-2 text-[13px] font-medium text-ink/55">{caption}</figcaption> : null}
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => {
          const height = `${Math.max(12, (Math.abs(item.value) / max) * 100)}%`
          return (
            <div key={item.label} className="flex flex-col items-center">
              <div className="flex h-24 w-full items-end justify-center rounded-sm bg-ink/6 px-4 pb-0">
                <motion.div
                  className={`w-12 rounded-t-sm ${fill[item.accent ?? 'forest']}`}
                  initial={{ height: reduced ? height : 0 }}
                  animate={{ height }}
                  transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : index * 0.08 }}
                />
              </div>
              <p className="mt-2 font-display text-[28px] leading-none text-ink">{item.display}</p>
              <p className="mt-1 text-center text-[13px] text-ink/60">{item.label}</p>
            </div>
          )
        })}
      </div>
    </figure>
  )
}
