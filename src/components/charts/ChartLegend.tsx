import { chartHex, uniqueLegend, type ChartLegendItem } from '@/lib/chartTheme'

type ChartLegendProps = {
  items: ChartLegendItem[]
}

export function ChartLegend({ items }: ChartLegendProps) {
  const legend = uniqueLegend(items)
  if (legend.length < 2) return null

  return (
    <div className="mt-2 border border-ink/15 bg-white/80 px-2 py-1.5">
      <p className="mb-1 text-[10px] font-medium tracking-[0.12em] text-ink/40 uppercase">Legend</p>
      <ul className="flex flex-wrap gap-x-3 gap-y-1">
        {legend.map((item) => (
          <li key={item.tone} className="flex items-center gap-1.5 text-[12px] leading-tight text-ink/80">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: chartHex(item.tone) }} />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
