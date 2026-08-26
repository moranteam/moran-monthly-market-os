import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { PhotoPlate } from '@/components/PhotoPlate'
import { VacantShellList } from '@/components/VacantShellList'
import { fact, propertyById, vacantTourProperties } from '@/data/load'
import { kpisFor } from '@/lib/kpis'
import { NameWithMark } from '@/components/CompanyMark'
import { formatFact, formatPropertyAsking, formatSf } from '@/lib/format'
import { BAY_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function InventoryScene() {
  const { selectedId, setSelectedId, setCamera, takeaway, lens } = usePresenter()
  const vacant = vacantTourProperties()
  const property = vacant.find((item) => item.id === selectedId)
  const kpis = kpisFor('inventory', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))
  const closed = propertyById('san-carlos-research')
  const signed = propertyById('mission-rock-b')

  useEffect(() => {
    setCamera({ ...BAY_CAMERA })
  }, [setCamera])

  useEffect(() => {
    if (!property) return
    setCamera({
      longitude: property.lng,
      latitude: property.lat,
      zoom: 13.4,
      pitch: 52,
      bearing: -14,
    })
  }, [property, setCamera])

  return (
    <BriefingRail
      kicker="Live inventory"
      emoji="📍"
      title="Vacant shells and Mission Bay overflow."
      thesis={
        takeaway ??
        'Name the vacant new-construction product. 150 Industrial is a closed robotics deal. Mission Rock B is signed.'
      }
      kpis={kpis}
    >
      <SpokenFacts
        items={[
          `Bay Area science ${formatFact(fact('baLsVacancyPct'))} vacant. The six shells below are the overbuild proof — not a full inventory matrix.`,
          `1450 Owens is the Mission Bay tour: ${formatFact(fact('owens1450Sf'))}, 100% vacant cold shell, ${formatFact(fact('owens1450Asking'))}, CBREIM, 100 lbs/SF, all-electric.`,
          '150 Industrial (230,961 SF) is a closed Moran Team deal to a humanoid robotics user. Mission Rock B has Coinbase 150,671 SF at $9.92/sf FSG and the Warriors. NVIDIA is reported Moran chatter — not vacant inventory.',
        ]}
      />
      <VacantShellList caption="Vacant new-construction LS shells · overbuild proof" />
      <div>
        <p className="mb-2 text-[13px] font-medium text-ink/55">Mission Bay availability</p>
        {vacant.map((item) => {
          const on = selectedId === item.id
          const asking = formatPropertyAsking(item)
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(on ? null : item.id)}
              className={`mb-1.5 flex w-full gap-3 border p-3 text-left ${
                on ? 'border-copper bg-white' : 'border-ink/10 bg-white/50 hover:border-ink/25'
              }`}
            >
              <PhotoPlate
                name={item.name}
                address={item.address}
                city={item.city}
                photoUrl={item.photoUrl}
                className="h-16 w-16"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-[16px] text-ink">{item.name}</span>
                <span className="block text-[13px] text-ink/55">
                  {item.owner ? <NameWithMark name={item.owner} /> : null}
                  <span className="text-ink/55"> · {item.city}</span>
                </span>
                <span className="mt-1 block tabular text-[14px] text-ink">
                  {item.propertySf ? formatSf(item.propertySf, true) : 'SF —'}
                  {asking ? ` · ${asking}` : ''}
                  {' · 100% vacant'}
                </span>
              </span>
            </button>
          )
        })}
      </div>
      <div className="space-y-1.5">
        <p className="text-[13px] font-medium text-ink/55">Not vacant inventory</p>
        {closed ? (
          <p className="flex items-center gap-3 border border-ink/10 bg-white/40 px-3 py-2 text-[15px] text-ink/80">
            <PhotoPlate name={closed.name} address={closed.address} city={closed.city} photoUrl={closed.photoUrl} className="h-12 w-12" />
            <span>
              {closed.address} · {formatSf(closed.propertySf ?? 0, true)} · closed robotics deal · former{' '}
              <NameWithMark name="Novartis" />
            </span>
          </p>
        ) : null}
        {signed ? (
          <p className="flex items-center gap-3 border border-ink/10 bg-white/40 px-3 py-2 text-[15px] text-ink/80">
            <PhotoPlate name={signed.name} address={signed.address} city={signed.city} photoUrl={signed.photoUrl} className="h-12 w-12" />
            <span>
              {signed.name} · <NameWithMark name="Coinbase" /> 150,671 SF signed ·{' '}
              <NameWithMark name="NVIDIA" /> is chatter
            </span>
          </p>
        ) : null}
      </div>
    </BriefingRail>
  )
}
