import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { ChatterBoard } from '@/components/ChatterBoard'
import { StackBar } from '@/components/charts/StackBar'
import { VColumnChart } from '@/components/charts/VColumnChart'
import { fact } from '@/data/load'
import { formatFact, formatPercent } from '@/lib/format'
import { kpisFor } from '@/lib/kpis'
import { PENINSULA_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function ExplodingScene() {
  const { setCamera, takeaway, lens } = usePresenter()
  const kpis = kpisFor('exploding', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))

  useEffect(() => {
    setCamera({ ...PENINSULA_CAMERA, latitude: 37.5, zoom: 10.2 })
  }, [setCamera])

  return (
    <BriefingRail
      kicker="Exploding industries"
      title="AI on the Peninsula."
      thesis={
        takeaway ??
        'AI is 1.1 msf of 4.0 msf Peninsula TIMS. 61 tenants in the stack. They have to be here for the talent, and they want to sit in the building.'
      }
      kpis={kpis}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <VColumnChart
          caption="Peninsula TIMS"
          columns={[
            {
              id: 'tims',
              label: 'All TIMS',
              value: Number(fact('penOfficeTimsMsf').value),
              display: formatFact(fact('penOfficeTimsMsf')),
              tone: 'ink',
            },
            {
              id: 'ai',
              label: 'AI of TIMS',
              value: Number(fact('penAiDemandMsf').value),
              display: formatFact(fact('penAiDemandMsf')),
              tone: 'ai',
            },
          ]}
        />
        <StackBar
          caption="AI share of Peninsula TIMS"
          totalLabel={`${formatFact(fact('penAiDemandMsf'))} of ${formatFact(fact('penOfficeTimsMsf'))}`}
          segments={[
            {
              id: 'ai',
              label: 'AI',
              sharePct: (Number(fact('penAiDemandMsf').value) / Number(fact('penOfficeTimsMsf').value)) * 100,
              display: formatFact(fact('penAiDemandMsf')),
              tone: 'ai',
            },
            {
              id: 'rest',
              label: 'Rest of TIMS',
              sharePct:
                100 - (Number(fact('penAiDemandMsf').value) / Number(fact('penOfficeTimsMsf').value)) * 100,
              display: `${(
                Number(fact('penOfficeTimsMsf').value) - Number(fact('penAiDemandMsf').value)
              ).toFixed(1)} msf`,
              tone: 'ink',
            },
          ]}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <StackBar
          caption="Bay Area tech listings · AI vs rest"
          totalLabel={formatFact(fact('baAiListingPct'))}
          segments={[
            {
              id: 'ai',
              label: 'AI listings',
              sharePct: Number(fact('baAiListingPct').value),
              display: formatFact(fact('baAiListingPct')),
              tone: 'ai',
            },
            {
              id: 'rest',
              label: 'Rest of listings',
              sharePct: 100 - Number(fact('baAiListingPct').value),
              display: `${100 - Number(fact('baAiListingPct').value)}%`,
              tone: 'ink',
            },
          ]}
        />
        <VColumnChart
          caption="Remote share of tech listings"
          columns={[
            {
              id: 'ba',
              label: 'Bay Area now',
              value: Number(fact('baRemoteListingPct').value),
              display: formatPercent(Number(fact('baRemoteListingPct').value)),
              tone: 'ai',
            },
            {
              id: 'ba22',
              label: 'Bay Area mid-2022',
              value: Number(fact('baRemoteListingPct2022').value),
              display: formatPercent(Number(fact('baRemoteListingPct2022').value)),
              tone: 'ink',
            },
            {
              id: 'us',
              label: 'U.S. now',
              value: Number(fact('usRemoteListingPct').value),
              display: formatPercent(Number(fact('usRemoteListingPct').value)),
              tone: 'vacancy',
            },
          ]}
        />
      </div>
      <SpokenFacts
        items={[
          `Peninsula TIMS ${formatFact(fact('penOfficeTimsMsf'))} / ${formatFact(fact('penOfficeTimsTenants'))} tenants. AI is ${formatFact(fact('penAiDemandMsf'))} of that stack. ${formatFact(fact('penOfficeTenants100k'))} tenants at 100k+ SF.`,
          `Bay Area is #1 on the 50-market tech talent scorecard. Workforce ${formatFact(fact('talentWorkforce'))}. AI listings ${formatFact(fact('baAiListingPct'))} (June 2026). Remote ${formatFact(fact('baRemoteListingPct'))} (April 2026).`,
          `AI-related companies are ${formatFact(fact('sfOfficeAiActivityPct'))} of San Francisco office activity since 2023. SF AI leasing: ${formatFact(fact('sfAiLeaseCompanies'))} companies / ${formatFact(fact('sfAiLeaseMsf'))}.`,
          `${formatFact(fact('usAiVcShareSince2020Pct'))} of U.S. AI venture funding since 2020 lands here. That is not a bid for every empty Peninsula floor.`,
          'No fake AI building photographs. The map is the four-geo overlay. Named comps sit on the Office chapter.',
        ]}
      />
      <ChatterBoard />
    </BriefingRail>
  )
}
