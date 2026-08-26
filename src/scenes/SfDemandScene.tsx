import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { StackBar } from '@/components/charts/StackBar'
import { fact, snapshot } from '@/data/load'
import { kpisFor } from '@/lib/kpis'
import { formatFact } from '@/lib/format'
import { usePresenter } from '@/state/presenter'

export function SfDemandScene() {
  const { takeaway, lens } = usePresenter()
  const kpis = kpisFor('sf-demand', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))
  const ai = Number(fact('sfOfficeAiPct').value ?? 0)
  const remainder = Math.max(0, 100 - ai)
  const stack = snapshot.demand.stacks.find((item) => item.id === 'sf-office')

  return (
    <BriefingRail
      kicker="SF demand"
      emoji="📊"
      title="Overflow from the waterfront."
      thesis={takeaway ?? 'Active and pending office demand, as restated February 2026.'}
      kpis={kpis}
    >
      <StackBar
        caption="8.1 msf stacked by industry"
        totalLabel={formatFact(fact('sfOfficeDemandMsf'))}
        segments={[
          {
            id: 'ai',
            label: 'AI / AI-related',
            sharePct: ai,
            display: formatFact(fact('sfOfficeAiPct')),
            tone: 'ai',
          },
          {
            id: 'other',
            label: 'All other industries',
            sharePct: remainder,
            display: `${remainder}% · names not restated`,
            tone: 'ink',
          },
        ]}
      />
      <SpokenFacts
        items={[
          `${formatFact(fact('sfOfficeDemandMsf'))} active + pending. ${stack?.note ?? 'Active + pending'}.`,
          `Projected net absorption ${formatFact(fact('sfProjectedAbsMsf'))}, of which AI ${formatFact(fact('sfProjectedAiAbsMsf'))}.`,
          'That overflow sits next to a compressed Mission Bay waterfront — UCSF, OpenAI, NVIDIA, Coinbase.',
          'This is a demand statement, not a closed loan.',
        ]}
      />
    </BriefingRail>
  )
}
