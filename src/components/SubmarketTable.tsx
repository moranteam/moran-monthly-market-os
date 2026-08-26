import { snapshot } from '@/data/load'
import { formatFsg, formatNnn, formatPercent, formatSf, signedSf } from '@/lib/format'

type SubmarketTableProps = {
  product: 'rnd' | 'sf-office'
}

export function SubmarketTable({ product }: SubmarketTableProps) {
  if (product === 'rnd') {
    const rows = snapshot.svRndSubmarkets
    if (rows.length === 0) {
      return <EmptyTable label="Silicon Valley R&D submarkets are not in this restage." />
    }
    return (
      <div className="overflow-hidden border border-ink/12 bg-white">
        <p className="border-b border-ink/10 px-3 py-2 text-[12px] font-medium tracking-[0.14em] text-ink/50 uppercase">
          Silicon Valley R&D · Q2 2026
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

  const rows = snapshot.sfSubmarkets
  if (rows.length === 0) {
    return <EmptyTable label="San Francisco office submarkets are not in this restage." />
  }
  return (
    <div className="overflow-hidden border border-ink/12 bg-white">
      <p className="border-b border-ink/10 px-3 py-2 text-[12px] font-medium tracking-[0.14em] text-ink/50 uppercase">
        San Francisco office submarkets · Q2 2026
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

function EmptyTable({ label }: { label: string }) {
  return (
    <div className="border border-dashed border-ink/20 bg-white/40 px-3 py-6 text-[14px] text-ink/55">{label}</div>
  )
}
