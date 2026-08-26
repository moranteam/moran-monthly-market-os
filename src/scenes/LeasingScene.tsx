import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { NameWithMark } from '@/components/CompanyMark'
import { PhotoPlate } from '@/components/PhotoPlate'
import { VacantShellList } from '@/components/VacantShellList'
import { GroupedBars } from '@/components/charts/GroupedBars'
import { fact, propertyById, snapshot } from '@/data/load'
import { useVisibleComps } from '@/hooks/useVisibleComps'
import { kpisFor } from '@/lib/kpis'
import { formatCompRent, formatFact, formatPercent, formatSf } from '@/lib/format'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function LeasingScene() {
  const { selectedId, setSelectedId, setCamera, takeaway, lens } = usePresenter()
  const comps = useVisibleComps('ls-new')
  const selected = comps.find((item) => item.id === selectedId)
  const selectedProperty = selected?.propertyId ? propertyById(selected.propertyId) : undefined

  useEffect(() => {
    if (!selectedProperty) return
    setCamera({
      longitude: selectedProperty.lng,
      latitude: selectedProperty.lat,
      zoom: 13,
      pitch: 38,
      bearing: -8,
    })
  }, [selectedProperty, setCamera])
  const kpis = kpisFor('leasing', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))

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
      emoji="🧪"
      title="The leftover shells are the inventory."
      thesis={
        takeaway ??
        'Science raced COVID demand. A couple of years in, demand died. 30.2% vacant — and the empty high-infrastructure product is the AI tour.'
      }
      kpis={kpis}
    >
      <GroupedBars
        caption="Life science · vacancy vs asking"
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
          `Bay Area science: ${formatFact(fact('baLsInventoryMsf'))}, ${formatFact(fact('baLsVacancyPct'))} vacant, ${formatFact(fact('baLsAskingNnn'))}. Developers and capital partners are sitting on vacant high-infrastructure R&D — power, HVAC, floor load, docks, clean-room-capable MEP.`,
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
      <div className="grid gap-2">
        {comps.map((item) => {
          const asset = item.propertyId ? propertyById(item.propertyId) : undefined
          const on = selectedId === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(on ? null : item.id)}
              className={`flex gap-3 border p-2 text-left ${
                on ? 'border-copper bg-white' : 'border-ink/10 bg-white/50 hover:border-ink/25'
              }`}
            >
              {asset ? (
                <PhotoPlate
                  name={asset.name}
                  address={asset.address}
                  city={asset.city}
                  photoUrl={asset.photoUrl}
                  className="h-16 w-16"
                />
              ) : (
                <PhotoPlate name={item.tenant} className="h-16 w-16" />
              )}
              <span className="min-w-0">
                <span className="block text-[16px] text-ink">
                  <NameWithMark name={item.tenant} size="lg" unnamed={item.confidential && !item.tenant} />
                  {item.confidential ? ' · confidential' : ''}
                </span>
                <span className="block text-[13px] text-ink/55">
                  {asset ? `${asset.name} · ${asset.city}` : 'Address not restated'}
                  {item.owner ? (
                    <span className="ml-2 inline-flex items-center gap-1">
                      · <NameWithMark name={item.owner} />
                    </span>
                  ) : null}
                </span>
                <span className="mt-1 block tabular text-[14px] text-ink">
                  {formatSf(item.areaLeasedSf, true)}
                  {formatCompRent(item) ? ` · ${formatCompRent(item)}` : ''}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </BriefingRail>
  )
}
