import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { ClusterTable } from '@/components/ClusterTable'
import { NameWithMark } from '@/components/CompanyMark'
import { LeaseCompStrip } from '@/components/LeaseCompStrip'
import { SubmarketTable } from '@/components/SubmarketTable'
import { VColumnChart } from '@/components/charts/VColumnChart'
import { fact, oaklandRndFigureComps, snapshot, svRndFigureComps } from '@/data/load'
import { formatFact, formatPercent, formatSf } from '@/lib/format'
import { kpisFor } from '@/lib/kpis'
import { VALLEY_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function RndScene() {
  const { setCamera, takeaway, lens, mode } = usePresenter()
  const share = mode === 'share'
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
        '135.2 msf. 13.3% vacant. +519k in Q2. Asking $2.84/sf NNN. 940,214 under construction — Intuitive 364k, Supermicro 333k, Arista 243k.'
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
      <div className="overflow-hidden border border-ink/12 bg-white">
        <p className="border-b border-ink/10 px-3 py-2 text-[12px] font-medium tracking-[0.14em] text-ink/50 uppercase">
          Named UC pipeline · header {formatFact(fact('svUnderConstructionSf'))}
        </p>
        <ul className="divide-y divide-ink/8">
          {snapshot.svRndPipeline.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 px-3 py-2 text-[13px]">
              <span className="flex items-center gap-2 font-medium text-ink">
                <NameWithMark name={item.name} size="sm" />
                <span className="text-[12px] font-normal text-ink/50">{item.place}</span>
              </span>
              <span className="tabular text-ink">{formatSf(item.sf, true)}</span>
            </li>
          ))}
        </ul>
      </div>
      <SpokenFacts
        items={[
          `Inventory ${formatFact(fact('svTotalNraSf'))}. Vacancy ${formatFact(fact('svVacancyPct'))} (−30 bps QoQ, +100 bps YoY). Asking ${formatFact(fact('svAvgAskingNnn'))}.`,
          `Q2 absorption ${formatFact(fact('svQ2AbsSf'))}. YTD still ${formatFact(fact('svYtdAbsSf'))}. Leasing ${formatFact(fact('svLeasingMsf'))}, ${formatFact(fact('svLeasingQoqPct'))} QoQ.`,
          `Delivered ${formatFact(fact('svDeliveredSf'))}. Under construction ${formatFact(fact('svUnderConstructionSf'))} — Intuitive 364k Sunnyvale, Supermicro 333k Brokaw, Arista 243k Santa Clara.`,
          `Oakland R&D ${formatFact(fact('oakRndVacancyPct'))} vacant, ${formatFact(fact('oakRndAbsSf'))}, asking ${formatFact(fact('oakRndNnn'))}. Emeryville ${formatFact(fact('oakEmeryvilleVac'))}. San Leandro ${formatFact(fact('oakSanLeandroVac'))}.`,
        ]}
      />
      <SubmarketTable product="rnd" />
      <SubmarketTable product="oak-rnd" />
      <LeaseCompStrip caption="Silicon Valley R&D Figure comps" comps={svRndFigureComps(share)} />
      <LeaseCompStrip caption="Oakland R&D Figure comps" comps={oaklandRndFigureComps(share)} />
    </BriefingRail>
  )
}
