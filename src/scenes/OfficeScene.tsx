import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { ChatterBoard } from '@/components/ChatterBoard'
import { ClusterTable } from '@/components/ClusterTable'
import { LeaseCompStrip } from '@/components/LeaseCompStrip'
import { SubmarketTable } from '@/components/SubmarketTable'
import { DivergeBar } from '@/components/charts/DivergeBar'
import { VColumnChart } from '@/components/charts/VColumnChart'
import { fact, q2OfficeComps } from '@/data/load'
import { formatFact, formatPercent } from '@/lib/format'
import { kpisFor } from '@/lib/kpis'
import { BAY_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function OfficeScene() {
  const { setCamera, takeaway, lens, mode } = usePresenter()
  const kpis = kpisFor('office', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))
  const comps = q2OfficeComps(mode === 'share')

  useEffect(() => {
    setCamera({ ...BAY_CAMERA, longitude: -122.2, latitude: 37.52, zoom: 9.2 })
  }, [setCamera])

  return (
    <BriefingRail
      kicker="Office"
      title="Space is available. The AI product is not this stack."
      thesis={
        takeaway ??
        'Peninsula office is 24.9% vacant. San Francisco is 29.2%. Greater SV is 15.2%. Talent still comes in — remote listings are 7%.'
      }
      kpis={kpis}
    >
      <ClusterTable product="office" />
      <div className="grid gap-4 md:grid-cols-2">
        <VColumnChart
          caption="Vacancy · four office geos"
          columns={[
            {
              id: 'sf',
              label: 'San Francisco',
              value: Number(fact('sfOfficeVacancyPct').value),
              display: formatPercent(Number(fact('sfOfficeVacancyPct').value)),
              tone: 'vacancy',
            },
            {
              id: 'pen',
              label: 'Peninsula',
              value: Number(fact('penOfficeVacancyPct').value),
              display: formatPercent(Number(fact('penOfficeVacancyPct').value)),
              tone: 'vacancy',
            },
            {
              id: 'gsv',
              label: 'Greater SV',
              value: Number(fact('gsvOfficeVacancyPct').value),
              display: formatPercent(Number(fact('gsvOfficeVacancyPct').value)),
              tone: 'vacancy',
            },
            {
              id: 'oak',
              label: 'Oakland',
              value: Number(fact('oakOfficeVacancyPct').value),
              display: formatPercent(Number(fact('oakOfficeVacancyPct').value)),
              tone: 'vacancy',
            },
          ]}
        />
        <VColumnChart
          caption="Asking · monthly FSG"
          columns={[
            {
              id: 'sf',
              label: 'San Francisco',
              value: Number(fact('sfOfficeAsking').value) / 12,
              display: formatFact(fact('sfOfficeAsking')),
              tone: 'asking',
            },
            {
              id: 'pen',
              label: 'Peninsula',
              value: Number(fact('penOfficeFsg').value),
              display: formatFact(fact('penOfficeFsg')),
              tone: 'asking',
            },
            {
              id: 'gsv',
              label: 'Greater SV',
              value: Number(fact('gsvOfficeFsg').value),
              display: formatFact(fact('gsvOfficeFsg')),
              tone: 'asking',
            },
            {
              id: 'oak',
              label: 'Oakland',
              value: Number(fact('oakOfficeFsg').value),
              display: formatFact(fact('oakOfficeFsg')),
              tone: 'asking',
            },
          ]}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <DivergeBar
          caption="Peninsula Q2 absorption"
          label="Net absorption"
          value={Number(fact('penOfficeAbsSf').value)}
          display={formatFact(fact('penOfficeAbsSf'))}
        />
        <DivergeBar
          caption="San Francisco Q2 absorption"
          label="Net absorption"
          value={Number(fact('sfOfficeQ2AbsSf').value)}
          display={formatFact(fact('sfOfficeQ2AbsSf'))}
        />
      </div>
      <SpokenFacts
        items={[
          `San Francisco ${formatFact(fact('sfOfficeNraSf'))}, ${formatFact(fact('sfOfficeVacancyPct'))} vacant, Q2 ${formatFact(fact('sfOfficeQ2AbsSf'))} / YTD ${formatFact(fact('sfOfficeYtdAbsSf'))}. Asking ${formatFact(fact('sfOfficeAsking'))}. TIMS ${formatFact(fact('sfTimsMsf'))}. Leasing ${formatFact(fact('sfLeasingQ2Msf'))} / ${formatFact(fact('sfLeasingYtdMsf'))} YTD. Zero UC, zero deliveries.`,
          `Peninsula ${formatFact(fact('penOfficeVacancyPct'))} vacant, Q2 ${formatFact(fact('penOfficeAbsSf'))}, asking ${formatFact(fact('penOfficeFsg'))}. UC ${formatFact(fact('penOfficeUcSf'))}. TIMS ${formatFact(fact('penOfficeTimsMsf'))} / ${formatFact(fact('penOfficeTimsTenants'))} tenants. AI ${formatFact(fact('penAiDemandMsf'))}.`,
          `Greater SV office ${formatFact(fact('gsvOfficeVacancyPct'))} vacant, Q2 ${formatFact(fact('gsvOfficeAbsSf'))}, ${formatFact(fact('gsvOfficeFsg'))}. UC ${formatFact(fact('gsvOfficeUcSf'))} in Santa Clara. Leasing ${formatFact(fact('gsvOfficeLeasingMsf'))}. Demand ${formatFact(fact('gsvDemandMsf'))}, tech ${formatFact(fact('gsvDemandTechPct'))}.`,
          `Oakland office ${formatFact(fact('oakOfficeVacancyPct'))} vacant, Q2 ${formatFact(fact('oakOfficeAbsSf'))}, ${formatFact(fact('oakOfficeFsg'))}. CBD ${formatFact(fact('oakCbdVac'))}.`,
          `Tightest Peninsula pocket: San Bruno / Millbrae ${formatFact(fact('penTightestVac'))}. Worst: Redwood City / Shores ${formatFact(fact('penWorstVac'))}.`,
        ]}
      />
      <SubmarketTable product="sf-office" />
      <ChatterBoard />
      <LeaseCompStrip caption="Office lease transactions · 30k SF+" comps={comps} />
    </BriefingRail>
  )
}
