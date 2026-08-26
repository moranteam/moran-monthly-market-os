import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { LogoStrip } from '@/components/LogoStrip'
import { GroupedBars } from '@/components/charts/GroupedBars'
import { NamedRoundChart } from '@/components/charts/NamedRoundChart'
import { StackBar } from '@/components/charts/StackBar'
import { VColumnChart } from '@/components/charts/VColumnChart'
import { fact, snapshot } from '@/data/load'
import { kpisFor } from '@/lib/kpis'
import { formatFact } from '@/lib/format'
import { BAY_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function FundingScene() {
  const { setCamera, takeaway, lens } = usePresenter()
  const kpis = kpisFor('funding', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))
  useEffect(() => {
    setCamera({ ...BAY_CAMERA, zoom: 8.7, pitch: 40 })
  }, [setCamera])

  return (
    <BriefingRail
      kicker="Funding"
      emoji="📊"
      title="Venture and investment, same quarter."
      thesis={takeaway ?? snapshot.funding.thesis}
      kpis={kpis}
      asOf="PitchBook / Crunchbase + CBRE Research · Feb 2026"
    >
      <GroupedBars
        caption="Bay Area VC · quarter vs year"
        series={[
          { key: 'q', label: 'Q4 2025', tone: 'ai' },
          { key: 'y', label: 'FY 2025', tone: 'ink' },
        ]}
        categories={[
          {
            id: 'ba',
            label: 'Bay Area',
            values: {
              q: { value: Number(fact('baVcQ4Usd').value), display: formatFact(fact('baVcQ4Usd')) },
              y: { value: Number(fact('baVcFyUsd').value), display: formatFact(fact('baVcFyUsd')) },
            },
          },
        ]}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <VColumnChart
          caption="Closed investment · 2025"
          columns={[
            {
              id: 'all',
              label: 'All property',
              value: Number(fact('baInvestUsd').value),
              display: formatFact(fact('baInvestUsd')),
              tone: 'ink',
            },
            {
              id: 'off',
              label: 'Office',
              value: Number(fact('baOfficeInvestUsd').value),
              display: formatFact(fact('baOfficeInvestUsd')),
              tone: 'ink',
            },
          ]}
        />
        <StackBar
          caption="2025 Bay Area VC mix"
          totalLabel={`Tech ${formatFact(fact('baVcTechPct'))}`}
          segments={[
            {
              id: 'tech',
              label: 'Tech',
              sharePct: Number(fact('baVcTechPct').value),
              display: formatFact(fact('baVcTechPct')),
              tone: 'ai',
            },
            {
              id: 'rest',
              label: 'Life science residual',
              sharePct: 100 - Number(fact('baVcTechPct').value),
              display: `${(100 - Number(fact('baVcTechPct').value)).toFixed(1)}%`,
              tone: 'ink',
            },
          ]}
        />
      </div>
      <StackBar
        caption="U.S. AI VC since 2020"
        totalLabel={formatFact(fact('usAiVcShareSince2020Pct'))}
        segments={[
          {
            id: 'bay',
            label: 'Lands in the Bay Area',
            sharePct: Number(fact('usAiVcShareSince2020Pct').value),
            display: formatFact(fact('usAiVcShareSince2020Pct')),
            tone: 'ai',
          },
          {
            id: 'rest',
            label: 'Rest of U.S.',
            sharePct: 100 - Number(fact('usAiVcShareSince2020Pct').value),
            display: `${100 - Number(fact('usAiVcShareSince2020Pct').value)}%`,
            tone: 'ink',
          },
        ]}
      />
      <NamedRoundChart rounds={snapshot.funding.namedRounds} active tone="paper" />
      <LogoStrip
        caption="Named investors"
        names={snapshot.funding.investors.map((investor) => investor.name)}
      />
      <SpokenFacts
        items={[
          `Q4 ${formatFact(fact('baVcQ4Usd'))} across ${formatFact(fact('baVcQ4Deals'))} deals. Full year ${formatFact(fact('baVcFyUsd'))} / ${formatFact(fact('baVcFyDeals'))} deals. Tech ${formatFact(fact('baVcTechPct'))}.`,
          `The Bay Area has drawn ${formatFact(fact('usAiVcShareSince2020Pct'))} of U.S. AI venture funding since 2020.`,
          `Life science VC is the residual: ${formatFact(fact('baLsVcQ4Usd'))} / ${formatFact(fact('baLsVcQ4Deals'))} deals in the quarter.`,
          `San Francisco County printed ${formatFact(fact('sfCountyVcQ4Usd'))} in Q4. Office investment ${formatFact(fact('baOfficeInvestUsd'))}, ${formatFact(fact('baOfficeInvestYoyPct'))}. Capital does not turn commodity office into a requirement.`,
        ]}
      />
    </BriefingRail>
  )
}
