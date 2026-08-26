import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { GroupedBars } from '@/components/charts/GroupedBars'
import { HBarChart } from '@/components/charts/HBarChart'
import { StackBar } from '@/components/charts/StackBar'
import { VColumnChart } from '@/components/charts/VColumnChart'
import { fact, snapshot } from '@/data/load'
import { kpisFor } from '@/lib/kpis'
import { formatFact, formatPercent, formatSf } from '@/lib/format'
import { MISSION_BAY_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function TalentScene() {
  const { setCamera, takeaway, lens } = usePresenter()
  const kpis = kpisFor('talent', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))
  const nodes = [...snapshot.talent.aiLeaseNodes].sort((a, b) => b.sf - a.sf)

  useEffect(() => {
    setCamera({ ...MISSION_BAY_CAMERA, zoom: 12.2, pitch: 50 })
  }, [setCamera])

  return (
    <BriefingRail
      kicker="AI & talent"
      emoji="📊"
      title="They have to be here. They want to sit in the building."
      thesis={takeaway ?? snapshot.talent.thesis}
      kpis={kpis}
      asOf={snapshot.talent.asOf}
    >
      <HBarChart
        caption="SF AI leasing by node · Feb 3 deck"
        tone="ai"
        rows={nodes.map((node) => ({
          id: node.id,
          label: `${node.name} · ${node.companies}`,
          value: node.sf,
          display:
            node.sf >= 1_000_000
              ? `${(node.sf / 1_000_000).toFixed(2)} msf`
              : formatSf(node.sf, true),
        }))}
      />
      <p className="text-[14px] text-ink/60">
        {formatFact(fact('sfAiLeaseCompanies'))} companies · {formatFact(fact('sfAiLeaseMsf'))} total.
        Mission Bay {formatFact(fact('mbAiLeaseCompanies'))} leases / {formatFact(fact('mbAiLeaseSf'))} — largest average.
        Named nodes do not sum to the city total — other SF submarkets were not restated.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <StackBar
          caption="AI share of Bay Area tech listings"
          totalLabel={formatPercent(Number(fact('baAiListingPct').value))}
          segments={[
            {
              id: 'ai',
              label: 'AI · June 2026',
              sharePct: Number(fact('baAiListingPct').value),
              display: formatFact(fact('baAiListingPct')),
              tone: 'ai',
            },
            {
              id: 'other',
              label: 'Non-AI listings',
              sharePct: 100 - Number(fact('baAiListingPct').value),
              display: `${100 - Number(fact('baAiListingPct').value)}%`,
              tone: 'ink',
            },
          ]}
        />
        <VColumnChart
          caption="Software engineers in the tech industry"
          columns={[
            {
              id: 'ba',
              label: 'Bay Area',
              value: Number(fact('baSoftwareEngPct').value),
              display: formatPercent(Number(fact('baSoftwareEngPct').value)),
              tone: 'ai',
            },
            {
              id: 'us',
              label: 'U.S.',
              value: Number(fact('usSoftwareEngPct').value),
              display: formatPercent(Number(fact('usSoftwareEngPct').value)),
              tone: 'ink',
            },
          ]}
        />
      </div>
      <GroupedBars
        caption="AI listings · Bay Area vs U.S."
        series={[
          { key: 'now', label: 'June 2026', tone: 'ai' },
          { key: 'then', label: 'Mid-2022 baseline', tone: 'ink' },
        ]}
        categories={[
          {
            id: 'ba',
            label: 'Bay Area',
            values: {
              now: {
                value: Number(fact('baAiListingPct').value),
                display: formatFact(fact('baAiListingPct')),
              },
              then: {
                value: Number(fact('baAiListingPct2022').value),
                display: formatFact(fact('baAiListingPct2022')),
              },
            },
          },
          {
            id: 'us',
            label: 'U.S.',
            values: {
              now: {
                value: Number(fact('usAiListingPct').value),
                display: formatFact(fact('usAiListingPct')),
              },
              then: {
                value: Number(fact('usAiListingPct2022').value),
                display: formatFact(fact('usAiListingPct2022')),
              },
            },
          },
        ]}
      />
      <SpokenFacts
        items={[
          `Bay Area is #1 on the 50-market scorecard (same top 6 as last year). Workforce ${formatFact(fact('talentWorkforce'))} — contracted ~23,900 from 2022–2025. New York Metro is now larger at ${formatFact(fact('nyMetroTalent'))}.`,
          `AI-specialty talent ${formatFact(fact('aiSpecialtyTalent'))} (LinkedIn, mid-2026) — about one-sixth of U.S. AI-specialty talent.`,
          `AI listings ${formatFact(fact('baAiListingPct'))} in June 2026 versus ${formatFact(fact('baAiListingPct2022'))} mid-2022 (U.S. ${formatFact(fact('usAiListingPct'))} vs ${formatFact(fact('usAiListingPct2022'))}). Non-AI postings fell ${formatFact(fact('baNonAiPostingsDownPct'))} here versus ${formatFact(fact('usNonAiPostingsDownPct'))} U.S. AI postings are up one-third versus that peak.`,
          `Remote ${formatFact(fact('baRemoteListingPct'))} in April 2026 versus ${formatFact(fact('baRemoteListingPct2022'))} mid-2022 (U.S. ${formatFact(fact('usRemoteListingPct'))}). AI companies largely require full-time in-person.`,
          `${formatFact(fact('usAiVcShareSince2020Pct'))} of U.S. AI venture funding since 2020. AI-related companies = ${formatFact(fact('sfOfficeAiActivityPct'))} of San Francisco office activity since 2023.`,
          `U.S./Canada AI-skilled talent ${formatFact(fact('naAiSkilledYoyPct'))} to ${formatFact(fact('naAiSkilledTalent'))} mid-2026. U.S. tech talent ${formatFact(fact('usTechJobsYoyPct'))} / +${formatFact(fact('usTechJobsAdded'))} jobs in 2025. Data scientists ${formatFact(fact('usDataScientistYoyPct'))}.`,
          `A typical 500-person / 60,000 SF tech company is ${formatFact(fact('ba500PersonCostUsd'))} all-in labor + real estate here — highest of 50 markets.`,
        ]}
      />
    </BriefingRail>
  )
}
