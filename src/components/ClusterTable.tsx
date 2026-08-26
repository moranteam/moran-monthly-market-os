import { fact, snapshot } from '@/data/load'
import { formatFact, signedSf } from '@/lib/format'
import { usePresenter } from '@/state/presenter'

type ClusterTableProps = {
  product: 'overview' | 'office' | 'ls' | 'rnd'
}

export function ClusterTable({ product }: ClusterTableProps) {
  const { selectedId, setSelectedId } = usePresenter()

  return (
    <div className="overflow-hidden border border-ink/12 bg-white">
      <div className="flex items-center justify-between border-b border-ink/10 px-3 py-2">
        <p className="text-[12px] font-medium tracking-[0.14em] text-ink/50 uppercase">
          San Francisco Bay Area · four geos
        </p>
        <div className="flex gap-3 text-[11px] text-ink/55">
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 bg-[#1a4a6e]" /> Core
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 bg-[#c9892e]" /> Growth
          </span>
        </div>
      </div>
      <table className="w-full text-left text-[13px]">
        <thead className="bg-ink/4 text-[11px] tracking-[0.08em] text-ink/50 uppercase">
          <tr>
            <th className="px-3 py-2 font-medium">Market</th>
            <th className="px-3 py-2 font-medium">Vacancy</th>
            <th className="px-3 py-2 font-medium">Asking</th>
            <th className="px-3 py-2 font-medium">Q2 abs</th>
          </tr>
        </thead>
        <tbody>
          {snapshot.markets.map((market) => {
            const vacId =
              product === 'rnd'
                ? market.rndVacFact
                : product === 'ls'
                  ? market.lsVacFact
                  : market.officeVacFact
            const askId = product === 'rnd' ? market.rndAskFact : market.officeAskFact
            const absId = product === 'rnd' ? market.rndAbsFact : market.officeAbsFact
            const vac = factsSafe(vacId)
            const ask = factsSafe(askId)
            const abs = factsSafe(absId)
            const on = selectedId === market.id
            return (
              <tr
                key={market.id}
                onClick={() => setSelectedId(on ? null : market.id)}
                className={`cursor-pointer border-t border-ink/8 ${on ? 'bg-paper' : 'hover:bg-paper/70'}`}
              >
                <td className="px-3 py-2">
                  <span className="inline-flex items-center gap-2 font-medium text-ink">
                    <span className="h-2.5 w-2.5 shrink-0" style={{ background: market.color }} />
                    {market.name}
                    <span className="text-[10px] tracking-[0.12em] text-ink/40 uppercase">{market.role}</span>
                  </span>
                </td>
                <td className="px-3 py-2 tabular">{vac ? formatFact(vac) : '—'}</td>
                <td className="px-3 py-2 tabular">{ask ? formatFact(ask) : '—'}</td>
                <td className="px-3 py-2 tabular">
                  {abs && typeof abs.value === 'number' ? signedSf(abs.value) : '—'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function factsSafe(id: string | null) {
  if (!id) return null
  try {
    return fact(id)
  } catch {
    return null
  }
}
