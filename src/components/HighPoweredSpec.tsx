import { snapshot } from '@/data/load'
import { VColumnChart } from '@/components/charts/VColumnChart'

export function HighPoweredSpec() {
  const spec = snapshot.productSpec.highPowered

  return (
    <div className="border border-ink/10 bg-white/50 p-3">
      <p className="text-[13px] font-medium tracking-[0.12em] text-copper uppercase">{spec.hed}</p>
      <p className="mt-1 text-[13px] text-ink/50">{spec.asOf} · the sell against vacant LS shells</p>
      <ul className="mt-2 space-y-1 text-[15px] text-ink/85">
        {spec.lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <div className="mt-3">
        <VColumnChart
          caption="W/SF as restated · Feb 3"
          columns={[
            {
              id: 'ai-min',
              label: 'AI tenant min',
              value: spec.minWsf,
              display: `${spec.minWsf}`,
              tone: 'ai',
            },
            ...spec.benchmarks.map((item) => ({
              id: item.id,
              label: item.label,
              value: item.wsf,
              display: `${item.wsf}`,
              tone: 'ink' as const,
            })),
          ]}
        />
      </div>
    </div>
  )
}
