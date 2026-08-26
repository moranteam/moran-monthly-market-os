import { PhotoPlate } from '@/components/PhotoPlate'
import { HBarChart } from '@/components/charts/HBarChart'
import { leasingContrastShells, vacantOverbuildShells } from '@/data/load'
import { formatPercent, formatPsf, formatSf } from '@/lib/format'

type VacantShellListProps = {
  caption: string
  includeContrast?: boolean
}

export function VacantShellList({ caption, includeContrast = false }: VacantShellListProps) {
  const shells = vacantOverbuildShells()
  const contrast = includeContrast ? leasingContrastShells() : []

  return (
    <div>
      <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-3">
        {shells.map((item) => (
          <div key={item.id} className="flex gap-2 border border-ink/10 bg-white/60 p-1.5">
            <PhotoPlate name={item.name} address={item.address} city={item.city} className="h-14 w-14" />
            <span className="min-w-0">
              <span className="block truncate text-[12px] font-medium text-ink">{item.name}</span>
              <span className="block truncate text-[11px] text-ink/55">
                {item.sf ? formatSf(item.sf, true) : item.city ?? 'SF —'}
              </span>
            </span>
          </div>
        ))}
      </div>
      <HBarChart
        caption={caption}
        tone="vacancy"
        rows={shells.map((item) => ({
          id: item.id,
          label: item.name,
          value: item.sf ?? item.occupancyPct,
          display: [
            item.sf ? formatSf(item.sf, true) : null,
            `${formatPercent(item.occupancyPct)} vacant`,
            item.asking !== null ? formatPsf(item.asking) : null,
          ]
            .filter(Boolean)
            .join(' · '),
        }))}
      />
      {contrast.length > 0 ? (
        <div className="mt-3">
          <HBarChart
            caption="Leasing contrast"
            tone="ai"
            rows={contrast.map((item) => ({
              id: item.id,
              label: item.name,
              value: item.occupancyPct,
              display: `${formatPercent(item.occupancyPct)} vacant${item.note ? ` · ${item.note}` : ''}`,
              tone: 'ai',
            }))}
          />
        </div>
      ) : null}
    </div>
  )
}
