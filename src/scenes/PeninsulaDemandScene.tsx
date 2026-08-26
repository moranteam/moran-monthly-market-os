import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { CompareBars } from '@/components/charts/CompareBars'
import { DonutChart } from '@/components/charts/DonutChart'
import { fact, propertyById, snapshot } from '@/data/load'
import { useVisibleComps } from '@/hooks/useVisibleComps'
import { kpisFor } from '@/lib/kpis'
import { formatFact, formatPercent, formatSf } from '@/lib/format'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function PeninsulaDemandScene() {
  const { selectedId, setSelectedId, setCamera, takeaway, lens } = usePresenter()
  const comps = useVisibleComps('pen-office')
  const comp = comps.find((item) => item.id === selectedId)
  const property = comp?.propertyId ? propertyById(comp.propertyId) : undefined

  useEffect(() => {
    if (!property) return
    setCamera({
      longitude: property.lng,
      latitude: property.lat,
      zoom: 13,
      pitch: 50,
      bearing: -10,
    })
  }, [property, setCamera])
  const kpis = kpisFor('peninsula-demand', lens).map((item) => ({
    fact: fact(item.factId),
    icon: item.icon,
  }))

  return (
    <BriefingRail
      kicker="Peninsula office"
      emoji="🏢"
      title="Space is available. Product is not."
      thesis={
        takeaway ??
        'Peninsula office is 23.8% vacant. Silicon Valley R&D is 12.3%. Software took 56% of the top 25.'
      }
      kpis={kpis}
      asOf={snapshot.demand.asOf}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <CompareBars
          caption="Vacancy vs the Valley"
          items={[
            {
              label: 'Peninsula office',
              display: formatPercent(Number(fact('penOfficeVacancyPct').value)),
              value: Number(fact('penOfficeVacancyPct').value),
              accent: 'copper',
            },
            {
              label: 'SV R&D',
              display: formatPercent(Number(fact('svVacancyPct').value)),
              value: Number(fact('svVacancyPct').value),
              accent: 'forest',
            },
          ]}
        />
        <DonutChart
          percent={Number(fact('penOfficeSoftwarePct').value)}
          caption="Leasing mix · top 25"
          label={`Software ${formatFact(fact('penOfficeSoftwarePct'))}`}
          remainder={`${formatFact(fact('penOfficeTop25Sf'))} in the top 25 · remainder other industries`}
        />
      </div>
      <SpokenFacts
        items={[
          `Q4 absorption ${formatFact(fact('penOfficeAbsSf'))}. Under construction ${formatFact(fact('penOfficeUcSf'))}. ${formatFact(fact('penOfficeLeasesQ4'))} leases in the quarter.`,
          `Existing ${formatFact(fact('penOfficeFsg'))} · Class A ${formatFact(fact('penOfficeClassAFsg'))} · Class B ${formatFact(fact('penOfficeClassBFsg'))}.`,
          `Demand is ±${fact('penOfficeDemandMsf').value} msf across ${formatFact(fact('penOfficeReqs'))} office requirements, ${formatFact(fact('penOfficeDemandSoftwarePct'))} software.`,
          `Life science demand on the same corridor is ±${fact('penLsDemandMsf').value} msf / ${formatFact(fact('penLsReqs'))} requirements, ${formatFact(fact('penLsDemandDrugPct'))} drug development.`,
          'Office comps 30k+ that printed in Q1 2026 sit on the map. Click a pin for photo and terms.',
        ]}
      />
      <div>
        <p className="mb-2 text-[13px] font-medium text-ink/55">Office comps 30k+ · Q1 2026</p>
        <div className="flex flex-col gap-1.5">
          {comps.map((item) => {
            const asset = item.propertyId ? propertyById(item.propertyId) : undefined
            const on = selectedId === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(on ? null : item.id)}
                className={`flex items-center justify-between gap-3 border px-3 py-2 text-left ${
                  on ? 'border-copper bg-white' : 'border-ink/10 bg-white/50 hover:border-ink/25'
                }`}
              >
                <span className="text-[15px] text-ink">
                  {item.tenant}
                  <span className="ml-2 text-[13px] text-ink/50">
                    {asset ? `${asset.name} · ${asset.city}` : 'Address not restated'}
                  </span>
                </span>
                <span className="tabular text-[14px] text-ink">
                  {item.areaLeasedNote ?? formatSf(item.areaLeasedSf, true)}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </BriefingRail>
  )
}
