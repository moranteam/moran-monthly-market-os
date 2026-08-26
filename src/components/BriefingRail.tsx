import { FreshnessChip } from '@/components/FreshnessChip'
import { Icon, type IconName } from '@/components/icons'
import { factAsOf, previousValue, snapshot } from '@/data/load'
import type { Fact } from '@/data/types'
import { formatFact, formatVsLast } from '@/lib/format'
import type { ReactNode } from 'react'

type Kpi = {
  fact: Fact
  icon: IconName
}

type BriefingRailProps = {
  kicker: string
  emoji?: string
  title: string
  thesis: string
  kpis?: Kpi[]
  asOf?: string
  children?: ReactNode
}

export function BriefingRail({ kicker, emoji, title, thesis, kpis, asOf, children }: BriefingRailProps) {
  return (
    <article className="briefing-rail flex h-full min-w-0 flex-col overflow-y-auto bg-paper px-5 pt-4 pb-10 text-ink md:px-6">
      <header>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <p className="text-[12px] font-medium tracking-[0.16em] text-copper uppercase">
            {emoji ? <span className="mr-1.5 normal-case">{emoji}</span> : null}
            {kicker}
          </p>
          <FreshnessChip label={asOf ?? snapshot.meta.marketAsOfLabel} tone="ink" />
        </div>
        <h1 className="mt-2 font-display text-[26px] leading-[1.06] text-ink md:text-[32px]">{title}</h1>
        <p className="mt-2 font-editorial text-[16px] leading-snug text-ink/85 md:text-[18px]">{thesis}</p>
      </header>
      {kpis && kpis.length > 0 ? <KpiStrip items={kpis} /> : null}
      <div className="mt-3 flex min-h-0 flex-1 flex-col gap-3 pb-6">{children}</div>
    </article>
  )
}

export function KpiStrip({ items }: { items: Kpi[] }) {
  return (
    <div className={`mt-4 grid gap-2.5 ${items.length > 3 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-3'}`}>
      {items.map(({ fact, icon }) => {
        const prior = previousValue(fact.id)
        return (
          <div key={fact.id} className="min-w-0 border-t-2 border-copper/80 pt-1.5">
            <p className="flex items-center gap-1.5 text-[11px] leading-tight font-medium tracking-[0.04em] text-ink/55 uppercase">
              <Icon name={icon} className="h-3.5 w-3.5 text-copper" />
              {fact.label}
            </p>
            <p className="mt-1 font-display text-[22px] leading-none text-ink tabular md:text-[26px]">
              {formatFact(fact)}
            </p>
            <p className={`mt-1.5 text-[12px] ${fact.vintage === 'power' ? 'text-copper' : 'text-ink/45'}`}>
              {factAsOf(fact)}
              {fact.vintage === 'power' ? ' · older' : ''}
            </p>
            {prior !== null && typeof fact.value === 'number' ? (
              <p className="mt-0.5 text-[12px] text-copper">{formatVsLast(fact.value, prior)}</p>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export function SpokenFacts({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((line) => (
        <li key={line} className="border-l-2 border-copper/70 pl-3 text-[16px] leading-snug text-ink/90">
          {line}
        </li>
      ))}
    </ul>
  )
}
