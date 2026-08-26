import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { ClusterTable } from '@/components/ClusterTable'
import { SubmarketTable } from '@/components/SubmarketTable'
import { VColumnChart } from '@/components/charts/VColumnChart'
import { fact } from '@/data/load'
import { formatFact, formatPercent } from '@/lib/format'
import { kpisFor } from '@/lib/kpis'
import { VALLEY_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function RndScene() {
  const { setCamera, takeaway, lens } = usePresenter()
  const kpis = kpisFor('rnd', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))

  useEffect(() => {
    setCamera({ ...VALLEY_CAMERA })
  }, [setCamera])

  return (
    <BriefingRail
      kicker="Silicon Valley R&D"
      title="The empty boxes are still the product."
      thesis={
        takeaway ??
        '135.2 msf. 13.3% vacant. +519k in Q2. Asking $2.84/sf NNN. 940k under construction — the table print, not the 1.26 msf preleased pipeline note.'
      }
      kpis={kpis}
    >
      <ClusterTable product="rnd" />
      <div className="grid gap-4 md:grid-cols-2">
        <VColumnChart
          caption="Vacancy · R&D vs office"
          columns={[
            {
              id: 'rd',
              label: 'SV R&D',
              value: Number(fact('svVacancyPct').value),
              display: formatPercent(Number(fact('svVacancyPct').value)),
              tone: 'vacancy',
            },
            {
              id: 'off',
              label: 'Greater SV office',
              value: Number(fact('gsvOfficeVacancyPct').value),
              display: formatPercent(Number(fact('gsvOfficeVacancyPct').value)),
              tone: 'vacancy',
            },
            {
              id: 'oak',
              label: 'Oakland R&D',
              value: Number(fact('oakRndVacancyPct').value),
              display: formatPercent(Number(fact('oakRndVacancyPct').value)),
              tone: 'vacancy',
            },
          ]}
        />
        <VColumnChart
          caption="Delivery clock"
          columns={[
            {
              id: 'del',
              label: 'Delivered',
              value: Number(fact('svDeliveredSf').value),
              display: formatFact(fact('svDeliveredSf')),
              tone: 'ink',
            },
            {
              id: 'uc',
              label: 'Under construction',
              value: Number(fact('svUnderConstructionSf').value),
              display: formatFact(fact('svUnderConstructionSf')),
              tone: 'ai',
            },
          ]}
        />
      </div>
      <SpokenFacts
        items={[
          `Inventory ${formatFact(fact('svTotalNraSf'))}. Vacancy ${formatFact(fact('svVacancyPct'))} (−30 bps QoQ, +100 bps YoY). Asking ${formatFact(fact('svAvgAskingNnn'))}.`,
          `Q2 absorption ${formatFact(fact('svQ2AbsSf'))}. YTD still ${formatFact(fact('svYtdAbsSf'))}. Leasing ${formatFact(fact('svLeasingMsf'))}, ${formatFact(fact('svLeasingQoqPct'))} QoQ.`,
          `Delivered ${formatFact(fact('svDeliveredSf'))}. Under construction ${formatFact(fact('svUnderConstructionSf'))} from the table. Body copy also cites 1.26 msf all preleased in Sunnyvale / SJ-North / Santa Clara — we print 940k.`,
          `Oakland R&D ${formatFact(fact('oakRndVacancyPct'))} vacant, ${formatFact(fact('oakRndAbsSf'))}, asking ${formatFact(fact('oakRndNnn'))}. Emeryville ${formatFact(fact('oakEmeryvilleVac'))}. San Leandro ${formatFact(fact('oakSanLeandroVac'))}.`,
        ]}
      />
      <SubmarketTable product="rnd" />
    </BriefingRail>
  )
}
