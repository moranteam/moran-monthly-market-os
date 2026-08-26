import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { HBarChart } from '@/components/charts/HBarChart'
import { fact, snapshot } from '@/data/load'
import { kpisFor } from '@/lib/kpis'
import { formatFact, formatNnn, formatPercent, signedSf } from '@/lib/format'
import { VALLEY_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function SiliconValleyScene() {
  const { selectedId, setSelectedId, setCamera, takeaway, lens } = usePresenter()
  const sub = snapshot.submarkets.find((item) => item.id === selectedId)
  const fremont = snapshot.submarkets.find((item) => item.id === 'fremont')
  const kpis = kpisFor('silicon-valley', lens).map((item) => ({
    fact: fact(item.factId),
    icon: item.icon,
  }))

  useEffect(() => {
    setCamera(VALLEY_CAMERA)
  }, [setCamera])

  useEffect(() => {
    if (!sub) return
    setCamera({
      longitude: sub.lng,
      latitude: sub.lat,
      zoom: 11.6,
      pitch: 48,
      bearing: 10,
    })
  }, [setCamera, sub])

  const rows = [...snapshot.submarkets]
    .sort((a, b) => b.vacancyPct - a.vacancyPct)
    .map((item) => ({
      id: item.id,
      label: item.name,
      value: item.vacancyPct,
      display: formatPercent(item.vacancyPct),
      active: selectedId === item.id,
    }))

  return (
    <BriefingRail
      kicker="Silicon Valley R&D"
      emoji="🏢"
      title="One vacancy rate. Ten different bids."
      thesis={takeaway ?? 'Palo Alto still prices scarcity. Fremont cleared when the rest gave space back.'}
      kpis={kpis}
    >
      <HBarChart
        caption="Submarket vacancy"
        rows={rows}
        onSelect={(id) => setSelectedId(selectedId === id ? null : id)}
      />
      <SpokenFacts
        items={[
          `Valley inventory ${formatFact(fact('svTotalNraSf'))} · vacant ${formatFact(fact('svVacancyPct'))} · asking ${formatFact(fact('svAvgAskingNnn'))}.`,
          `Palo Alto asks ${formatNnn(snapshot.submarkets.find((item) => item.id === 'palo-alto')?.askingNnn ?? 5.79)} — still the scarce product.`,
          `Fremont / Newark absorbed ${signedSf(fremont?.q4AbsorptionSf ?? 304694)} in Q4 while the Valley net was ${formatFact(fact('q4NetAbsorptionSf'))}.`,
          sub
            ? `${sub.name}: ${formatPercent(sub.vacancyPct)} vacant, Q4 ${signedSf(sub.q4AbsorptionSf)}. ${sub.callout}`
            : `${formatFact(fact('seeking100kPlusPct'))} of tenants are seeking 100k+ SF.`,
          `Under construction ${formatFact(fact('svUnderConstructionSf'))}. Annual leasing ${formatFact(fact('annualLeasingMsf'))}.`,
        ]}
      />
    </BriefingRail>
  )
}
