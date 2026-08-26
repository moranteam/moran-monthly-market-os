import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { ClusterTable } from '@/components/ClusterTable'
import { VColumnChart } from '@/components/charts/VColumnChart'
import { fact } from '@/data/load'
import { formatFact, formatPercent, signedSf } from '@/lib/format'
import { kpisFor } from '@/lib/kpis'
import { BAY_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function MarketsScene() {
  const { setCamera, takeaway, lens } = usePresenter()
  const kpis = kpisFor('markets', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))

  useEffect(() => {
    setCamera({ ...BAY_CAMERA })
  }, [setCamera])

  return (
    <BriefingRail
      kicker="Markets"
      title="Four geos. No pin salad."
      thesis={
        takeaway ??
        'San Francisco, SF Peninsula, Silicon Valley, East Bay. Color-coded overlays, a table, and spaced callouts — not a corridor junk drawer.'
      }
      kpis={kpis}
    >
      <ClusterTable product="overview" />
      <div className="grid gap-4 md:grid-cols-2">
        <VColumnChart
          caption="Office vacancy · four geos"
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
          caption="Q2 office absorption"
          columns={[
            {
              id: 'sf',
              label: 'San Francisco',
              value: Number(fact('sfOfficeQ2AbsSf').value),
              display: signedSf(Number(fact('sfOfficeQ2AbsSf').value)),
              tone: 'ai',
            },
            {
              id: 'pen',
              label: 'Peninsula',
              value: Math.abs(Number(fact('penOfficeAbsSf').value)),
              display: signedSf(Number(fact('penOfficeAbsSf').value)),
              tone: 'vacancy',
            },
            {
              id: 'gsv',
              label: 'Greater SV',
              value: Number(fact('gsvOfficeAbsSf').value),
              display: signedSf(Number(fact('gsvOfficeAbsSf').value)),
              tone: 'ink',
            },
            {
              id: 'oak',
              label: 'Oakland',
              value: Math.abs(Number(fact('oakOfficeAbsSf').value)),
              display: signedSf(Number(fact('oakOfficeAbsSf').value)),
              tone: 'vacancy',
            },
          ]}
        />
      </div>
      <SpokenFacts
        items={[
          `San Francisco office ${formatFact(fact('sfOfficeNraSf'))}, ${formatFact(fact('sfOfficeVacancyPct'))} vacant — first print under 30% since Q1 2023. TIMS ${formatFact(fact('sfTimsMsf'))}. Asking ${formatFact(fact('sfOfficeAsking'))}.`,
          `Peninsula office ${formatFact(fact('penOfficeVacancyPct'))} vacant, Q2 absorption ${formatFact(fact('penOfficeAbsSf'))}, asking ${formatFact(fact('penOfficeFsg'))}. AI is ${formatFact(fact('penAiDemandMsf'))} of ${formatFact(fact('penOfficeTimsMsf'))} TIMS.`,
          `Greater SV office ${formatFact(fact('gsvOfficeVacancyPct'))} vacant, ${formatFact(fact('gsvOfficeFsg'))}. SV R&D ${formatFact(fact('svVacancyPct'))} vacant on ${formatFact(fact('svTotalNraSf'))}. Combined demand ${formatFact(fact('gsvDemandMsf'))}.`,
          `East Bay: Oakland office ${formatFact(fact('oakOfficeVacancyPct'))} vacant, ${formatFact(fact('oakOfficeAbsSf'))}. Oakland R&D ${formatFact(fact('oakRndVacancyPct'))} vacant, ${formatFact(fact('oakRndAbsSf'))}.`,
          'Stanford is a landmark on this cluster map only. There is no Stanford Research Park chapter.',
        ]}
      />
    </BriefingRail>
  )
}
