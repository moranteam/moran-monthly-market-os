type PlaceholderChartProps = {
  title: string
  subtitle: string
  label: string
}

export function PlaceholderChart({ title, subtitle, label }: PlaceholderChartProps) {
  return (
    <div className="density-glass h-full p-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-paper/45">{subtitle}</p>
      <h3 className="mt-1 font-display text-[24px] text-paper">{title}</h3>
      <div className="placeholder-hatch mt-5 flex h-36 items-end justify-between gap-2 rounded-sm border border-dashed border-paper/20 px-3 pb-3">
        {[42, 68, 31, 55, 24].map((height, index) => (
          <div
            key={index}
            className="w-full rounded-sm border border-paper/15 bg-paper/5"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <p className="mt-3 text-[13px] text-gold/90">Placeholder · {label}</p>
    </div>
  )
}
