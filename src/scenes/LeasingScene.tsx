import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { ChatterBoard } from '@/components/ChatterBoard'
import { ClusterTable } from '@/components/ClusterTable'
import { LeaseCompStrip } from '@/components/LeaseCompStrip'
import { VacantShellList } from '@/components/VacantShellList'
import { GroupedBars } from '@/components/charts/GroupedBars'
import { compsBySet, fact, snapshot } from '@/data/load'
import { formatFact, formatPercent } from '@/lib/format'
import { kpisFor } from '@/lib/kpis'
import { LEASING_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function LeasingScene() {
  const { setCamera, takeaway, lens, mode } = usePresenter()
  const comps = compsBySet('ls-new', mode === 'share')
  const kpis = kpisFor('leasing', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))

  useEffect(() => {
    setCamera({ ...LEASING_CAMERA })
  }, [setCamera])

  const markets = snapshot.lifeScienceMarkets.map((market) => {
    const vacancy = fact(market.vacancyFact)
    const asking = fact(market.rentFact)
    return {
      id: market.id,
      label: market.name,
      vacancy: Number(vacancy.value ?? 0),
      vacancyDisplay: formatPercent(Number(vacancy.value ?? 0)),
      asking: Number(asking.value ?? 0),
      askingDisplay: formatFact(asking),
    }
  })

  return (
    <BriefingRail
      kicker="Life science"
      title="The leftover shells are the inventory."
      thesis={
        takeaway ??
        'Science raced COVID demand. A couple of years in, demand died. 30.2% vacant — and the empty high-infrastructure product is the AI tour.'
      }
      kpis={kpis}
    >
      <ClusterTable product="ls" />
      <GroupedBars
        caption="Life science · vacancy vs asking · Q4 2025 snapshot"
        series={[
          { key: 'vacancy', label: 'Vacancy', tone: 'vacancy' },
          { key: 'asking', label: 'Asking / rent', tone: 'asking' },
        ]}
        categories={markets.map((market) => ({
          id: market.id,
          label: market.label,
          values: {
            vacancy: { value: market.vacancy, display: market.vacancyDisplay },
            asking: { value: market.asking, display: market.askingDisplay },
          },
        }))}
      />
      <SpokenFacts
        items={[
          `Bay Area science: ${formatFact(fact('baLsInventoryMsf'))}, ${formatFact(fact('baLsVacancyPct'))} vacant, ${formatFact(fact('baLsAskingNnn'))}. This life-science block is still the Q4 2025 / Q1 2026 cluster print — we did not invent a Q2 science quarterly.`,
          `Northern Peninsula ${formatFact(fact('nPenLsInventoryMsf'))} at ${formatFact(fact('nPenLsVacancyPct'))} vacant · ${formatFact(fact('nPenLsAskingNnn'))}. Central Peninsula ${formatFact(fact('cPenLsInventoryMsf'))} at ${formatFact(fact('cPenLsVacancyPct'))} vacant · ${formatFact(fact('cPenLsAskingNnn'))}.`,
          'The paper that still printed is purpose-built: UCSF 280,472 SF at Kilroy Oyster Point Phase II, $5.85/sf NNN, 16.5 years.',
          'Natera 62,969 SF at Brittan West, San Carlos, $5.50/sf NNN (1/23/26).',
          '150 Industrial is the conversion tell — a closed 230,961 SF robotics deal, same product type, because the utilities were already there. Do not treat it as vacant inventory.',
        ]}
      />
      <VacantShellList
        caption="Vacant new-construction LS shells · overbuild proof"
        includeContrast
      />
      <ChatterBoard />
      <LeaseCompStrip caption="Life science lease transactions · new construction" comps={comps} />
    </BriefingRail>
  )
}
