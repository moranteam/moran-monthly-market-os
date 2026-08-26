import { factAsOf, previousValue } from '@/data/load'
import { formatFact, formatVsLast } from '@/lib/format'
import type { Fact } from '@/data/types'
import { useCountUp } from '@/hooks/useCountUp'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type MetricHeroProps = {
  fact: Fact
  active: boolean
  size?: 'lg' | 'md'
}

function numericTarget(fact: Fact) {
  return typeof fact.value === 'number' ? Math.abs(fact.value) : 0
}

export function MetricHero({ fact, active, size = 'lg' }: MetricHeroProps) {
  const reduced = useReducedMotion()
  const raw = numericTarget(fact)
  const counted = useCountUp(raw, active, reduced)
  const signed = typeof fact.value === 'number' && fact.value < 0 ? -counted : counted
  const display = formatFact({ ...fact, value: typeof fact.value === 'number' ? signed : fact.value })
  const prior = previousValue(fact.id)
  const asOf = factAsOf(fact)

  return (
    <div>
      <p className="text-[12px] uppercase tracking-[0.18em] text-paper/50">{fact.label}</p>
      <p
        className={`mt-1 font-display tabular leading-none text-paper ${size === 'lg' ? 'text-[42px] md:text-[52px]' : 'text-[28px] md:text-[34px]'}`}
      >
        {display}
      </p>
      <p className={`mt-2 text-[12px] ${fact.vintage === 'power' ? 'text-copper' : 'text-paper/40'}`}>
        {asOf}
        {fact.vintage === 'power' ? ' · older working layer' : ''}
      </p>
      {prior !== null && typeof fact.value === 'number' ? (
        <p className="mt-1 text-[12px] text-gold/80">{formatVsLast(fact.value, prior)}</p>
      ) : null}
      {fact.note ? <p className="mt-2 max-w-xs text-[13px] text-paper/45">{fact.note}</p> : null}
    </div>
  )
}
