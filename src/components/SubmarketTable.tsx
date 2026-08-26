import { snapshot } from '@/data/load'
import type { Q2Submarket, RentBasis } from '@/data/types'
import { formatFsg, formatNnn, formatPercent, formatSf, signedSf } from '@/lib/format'

type SubmarketTableProps = {
  product: 'rnd' | 'sf-office' | 'pen-office' | 'sv-office' | 'oak-office' | 'oak-rnd'
  omitIds?: string[]
}

const captions: Record<SubmarketTableProps['product'], string> = {
  rnd: 'Silicon Valley R&D · Q2 2026 statistics table',
  'sf-office': 'San Francisco office submarkets · Q2 2026',
  'pen-office': 'Peninsula office · Q2 2026 statistics table',
  'sv-office': 'Greater SV office · Q2 2026 statistics table',
  'oak-office': 'Oakland office · Q2 2026 statistics table',
  'oak-rnd': 'Oakland R&D · Q2 2026 statistics table',
}

export function SubmarketTable({ product, omitIds = [] }: SubmarketTableProps) {
  if (product === 'rnd') {
    const rows = snapshot.svRndSubmarkets.filter((row) => !omitIds.includes(row.id))
    if (rows.length === 0) return <EmptyTable label="Silicon Valley R&D submarkets are not in this restage." />
    return (
      <div className="overflow-hidden border border-ink/12 bg-white">
        <p className="border-b border-ink/10 px-3 py-2 text-[12px] font-medium tracking-[0.14em] text-ink/50 uppercase">
          {captions.rnd}
        </p>
        <table className="w-full text-left text-[13px]">
          <thead className="bg-ink/4 text-[11px] tracking-[0.08em] text-ink/50 uppercase">
            <tr>
              <th className="px-3 py-2 font-medium">Submarket</th>
              <th className="px-3 py-2 font-medium">NRA</th>
              <th className="px-3 py-2 font-medium">Vacancy</th>
              <th className="px-3 py-2 font-medium">Asking</th>
              <th className="px-3 py-2 font-medium">Q2 abs</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-ink/8">
                <td className="px-3 py-2 font-medium text-ink">
                  {row.name}
                  {row.note ? <span className="ml-2 text-[11px] font-normal text-ink/45">{row.note}</span> : null}
                </td>
                <td className="px-3 py-2 tabular">{formatSf(row.nraSf, true)}</td>
                <td className="px-3 py-2 tabular">{formatPercent(row.vacancyPct)}</td>
                <td className="px-3 py-2 tabular">{formatNnn(row.askingNnn)}</td>
                <td className="px-3 py-2 tabular">{signedSf(row.q2AbsSf)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (product === 'sf-office') {
    const rows = snapshot.sfSubmarkets.filter((row) => !omitIds.includes(row.id))
    if (rows.length === 0) return <EmptyTable label="San Francisco office submarkets are not in this restage." />
    return (
      <div className="overflow-hidden border border-ink/12 bg-white">
        <p className="border-b border-ink/10 px-3 py-2 text-[12px] font-medium tracking-[0.14em] text-ink/50 uppercase">
          {captions['sf-office']}
        </p>
        <table className="w-full text-left text-[13px]">
          <thead className="bg-ink/4 text-[11px] tracking-[0.08em] text-ink/50 uppercase">
            <tr>
              <th className="px-3 py-2 font-medium">Submarket</th>
              <th className="px-3 py-2 font-medium">Vacancy</th>
              <th className="px-3 py-2 font-medium">Asking</th>
              <th className="px-3 py-2 font-medium">Q2 abs</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-ink/8">
                <td className="px-3 py-2 font-medium text-ink">
                  {row.name}
                  {row.note ? <span className="ml-2 text-[11px] font-normal text-ink/45">{row.note}</span> : null}
                </td>
                <td className="px-3 py-2 tabular">{formatPercent(row.vacancyPct)}</td>
                <td className="px-3 py-2 tabular">{formatFsg(row.askingAnnual, 'annual')}</td>
                <td className="px-3 py-2 tabular">{signedSf(row.absSf)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const pack: Record<Exclude<SubmarketTableProps['product'], 'rnd' | 'sf-office'>, Q2Submarket[]> = {
    'pen-office': snapshot.peninsulaOfficeSubmarkets,
    'sv-office': snapshot.svOfficeSubmarkets,
    'oak-office': snapshot.oaklandOfficeSubmarkets,
    'oak-rnd': snapshot.oaklandRndSubmarkets,
  }
  const rows = pack[product].filter((row) => !omitIds.includes(row.id))
  if (rows.length === 0) return <EmptyTable label="This statistics table is not in this restage." />

  return (
    <div className="overflow-hidden border border-ink/12 bg-white">
      <p className="border-b border-ink/10 px-3 py-2 text-[12px] font-medium tracking-[0.14em] text-ink/50 uppercase">
        {captions[product]}
      </p>
      <table className="w-full text-left text-[13px]">
        <thead className="bg-ink/4 text-[11px] tracking-[0.08em] text-ink/50 uppercase">
          <tr>
            <th className="px-3 py-2 font-medium">Submarket</th>
            <th className="px-3 py-2 font-medium">NRA</th>
            <th className="px-3 py-2 font-medium">Vacancy</th>
            <th className="px-3 py-2 font-medium">Asking</th>
            <th className="px-3 py-2 font-medium">Q2 abs</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className={`border-t border-ink/8 ${row.total ? 'bg-ink/4 font-medium' : ''}`}>
              <td className="px-3 py-2 text-ink">
                {row.name}
                {row.ucSf ? (
                  <span className="ml-2 text-[11px] font-normal text-ink/45">{formatSf(row.ucSf, true)} UC</span>
                ) : null}
                {row.note ? <span className="ml-2 text-[11px] font-normal text-ink/45">{row.note}</span> : null}
              </td>
              <td className="px-3 py-2 tabular">{formatSf(row.nraSf, true)}</td>
              <td className="px-3 py-2 tabular">{formatPercent(row.vacancyPct)}</td>
              <td className="px-3 py-2 tabular">{askingDisplay(row.asking, row.askingBasis)}</td>
              <td className="px-3 py-2 tabular">{row.q2AbsSf === null ? '—' : signedSf(row.q2AbsSf)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function askingDisplay(value: number, basis: RentBasis) {
  switch (basis) {
    case 'FSG':
      return formatFsg(value)
    case 'NNN':
      return formatNnn(value)
    default: {
      const _exhaustive: never = basis
      return _exhaustive
    }
  }
}

function EmptyTable({ label }: { label: string }) {
  return (
    <div className="border border-dashed border-ink/20 bg-white/40 px-3 py-6 text-[14px] text-ink/55">{label}</div>
  )
}
