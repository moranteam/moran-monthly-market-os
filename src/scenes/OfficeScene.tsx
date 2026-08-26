import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { ChatterBoard } from '@/components/ChatterBoard'
import { ClusterTable } from '@/components/ClusterTable'
import { LeaseCompStrip } from '@/components/LeaseCompStrip'
import { SubmarketTable } from '@/components/SubmarketTable'
import { DivergeBar } from '@/components/charts/DivergeBar'
import { VColumnChart } from '@/components/charts/VColumnChart'
import {
  fact,
  oaklandOfficeFigureComps,
  peninsulaFigureComps,
  q2OfficeComps,
  sfFigureComps,
  svOfficeFigureComps,
} from '@/data/load'
import { formatFact, formatPercent } from '@/lib/format'
import { kpisFor } from '@/lib/kpis'
import { BAY_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function OfficeScene() {
  const { setCamera, takeaway, lens, mode } = usePresenter()
  const share = mode === 'share'
  const kpis = kpisFor('office', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))
  const visualComps = q2OfficeComps(share)

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
          caption="San Francisco Q2 absorption"
          label="Net absorption"
          value={Number(fact('sfOfficeQ2AbsSf').value)}
          display={formatFact(fact('sfOfficeQ2AbsSf'))}
        />
        <DivergeBar
          caption="Peninsula Q2 absorption"
          label="Net absorption"
          value={Number(fact('penOfficeAbsSf').value)}
          display={formatFact(fact('penOfficeAbsSf'))}
        />
        <DivergeBar
          caption="Greater SV Q2 absorption"
          label="Net absorption"
          value={Number(fact('gsvOfficeAbsSf').value)}
          display={formatFact(fact('gsvOfficeAbsSf'))}
        />
        <DivergeBar
          caption="Oakland Q2 absorption"
          label="Net absorption"
          value={Number(fact('oakOfficeAbsSf').value)}
          display={formatFact(fact('oakOfficeAbsSf'))}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <ClassPrint label="Peninsula Class A" factId="penOfficeClassAFsg" />
        <ClassPrint label="Peninsula Class B" factId="penOfficeClassBFsg" />
        <ClassPrint label="Peninsula Class C" factId="penOfficeClassCFsg" />
      </div>
      <SpokenFacts
        items={[
          `San Francisco ${formatFact(fact('sfOfficeNraSf'))}, ${formatFact(fact('sfOfficeVacancyPct'))} vacant, Q2 ${formatFact(fact('sfOfficeQ2AbsSf'))} / YTD ${formatFact(fact('sfOfficeYtdAbsSf'))}. Asking $72.96 FSG/YR = ${formatFact(fact('sfOfficeAsking'))}. TIMS ${formatFact(fact('sfTimsMsf'))}. Leasing ${formatFact(fact('sfLeasingQ2Msf'))} / ${formatFact(fact('sfLeasingYtdMsf'))} YTD. Zero UC, zero deliveries.`,
          `Peninsula ${formatFact(fact('penOfficeVacancyPct'))} vacant, Q2 ${formatFact(fact('penOfficeAbsSf'))}, asking ${formatFact(fact('penOfficeFsg'))}. UC ${formatFact(fact('penOfficeUcSf'))}. Class A ${formatFact(fact('penOfficeClassAFsg'))} / B ${formatFact(fact('penOfficeClassBFsg'))} / C ${formatFact(fact('penOfficeClassCFsg'))}. TIMS ${formatFact(fact('penOfficeTimsMsf'))} / ${formatFact(fact('penOfficeTimsTenants'))} tenants. AI ${formatFact(fact('penAiDemandMsf'))}.`,
          `Greater SV office ${formatFact(fact('gsvOfficeVacancyPct'))} vacant, Q2 ${formatFact(fact('gsvOfficeAbsSf'))}, ${formatFact(fact('gsvOfficeFsg'))}. UC ${formatFact(fact('gsvOfficeUcSf'))} in Santa Clara. Leasing ${formatFact(fact('gsvOfficeLeasingMsf'))}. Demand ${formatFact(fact('gsvDemandMsf'))}, tech ${formatFact(fact('gsvDemandTechPct'))}.`,
          `Oakland office ${formatFact(fact('oakOfficeVacancyPct'))} vacant, Q2 ${formatFact(fact('oakOfficeAbsSf'))}, ${formatFact(fact('oakOfficeFsg'))}. CBD ${formatFact(fact('oakCbdVac'))}. Table: Emeryville −11,000. CBD +25,000.`,
          `Tightest Peninsula pocket: San Bruno / Millbrae ${formatFact(fact('penTightestVac'))}. Worst: Redwood City / Shores ${formatFact(fact('penWorstVac'))}. Palo Alto office is printed once — on the Peninsula table.`,
        ]}
      />
      <SubmarketTable product="pen-office" />
      <SubmarketTable product="sv-office" omitIds={['palo-alto']} />
      <p className="text-[12px] text-ink/50">
        Palo Alto office is the same 8.00 msf / 16.5% / $9.35 FSG / −23k print on both packs. It is shown on the
        Peninsula table only in this chapter.
      </p>
      <SubmarketTable product="oak-office" />
      <SubmarketTable product="sf-office" />
      <ChatterBoard />
      <LeaseCompStrip caption="Peninsula visual comps · 30k SF+ · CBRE deals in green" comps={visualComps} />
      <LeaseCompStrip
        caption="Peninsula Figure comps · Palantir 74,000 as that pack printed"
        comps={peninsulaFigureComps(share)}
      />
      <LeaseCompStrip caption="San Francisco Figure 7 comps" comps={sfFigureComps(share)} />
      <LeaseCompStrip
        caption="Greater SV office Figure comps · Palantir 74,250 as that pack printed"
        comps={svOfficeFigureComps(share)}
      />
      <LeaseCompStrip
        caption="Oakland office Figure 6 comps · confidential 12,000 at 180 Grand"
        comps={oaklandOfficeFigureComps(share)}
      />
    </BriefingRail>
  )
}

function ClassPrint({ label, factId }: { label: string; factId: string }) {
  const item = fact(factId)
  return (
    <div className="border border-ink/10 bg-white/70 px-3 py-2">
      <p className="text-[11px] font-medium tracking-[0.12em] text-ink/45 uppercase">{label}</p>
      <p className="mt-1 font-display text-[20px] leading-none text-ink tabular">{formatFact(item)}</p>
    </div>
  )
}
