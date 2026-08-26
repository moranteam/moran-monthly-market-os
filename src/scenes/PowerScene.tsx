import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { HighPoweredSpec } from '@/components/HighPoweredSpec'
import { PhotoPlate } from '@/components/PhotoPlate'
import { HBarChart } from '@/components/charts/HBarChart'
import { fact, snapshot } from '@/data/load'
import { kpisFor } from '@/lib/kpis'
import { formatSf } from '@/lib/format'
import { PENINSULA_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function PowerScene() {
  const { selectedId, setSelectedId, setCamera, takeaway, lens } = usePresenter()
  const kpis = kpisFor('power', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))
  const named = snapshot.power.namedPropertyIds
    .map((id) => snapshot.properties.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => (b.propertySf ?? 0) - (a.propertySf ?? 0))

  useEffect(() => {
    setCamera({ ...PENINSULA_CAMERA, zoom: 9.9, pitch: 32 })
  }, [setCamera])

  useEffect(() => {
    const property = snapshot.properties.find((item) => item.id === selectedId)
    if (!property) return
    setCamera({
      longitude: property.lng,
      latitude: property.lat,
      zoom: 13,
      pitch: 36,
      bearing: -8,
    })
  }, [selectedId, setCamera])

  return (
    <BriefingRail
      kicker="Power · one chapter"
      emoji="⚡"
      title={snapshot.power.thesis}
      thesis={
        takeaway ??
        'Delivery timing, transformer excess, and cooling are why vacant LS product wins the AI tour. May 2026 working file — older than the February market snapshot.'
      }
      kpis={kpis}
      asOf={snapshot.meta.powerFreshness}
    >
      <HighPoweredSpec />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {named.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
            className={`flex gap-2 border p-1.5 text-left ${
              selectedId === item.id ? 'border-copper bg-white' : 'border-ink/10 bg-white/55'
            }`}
          >
            <PhotoPlate
              name={item.name}
              address={item.address}
              city={item.city}
              photoUrl={item.photoUrl}
              className="h-14 w-14"
            />
            <span className="min-w-0">
              <span className="block truncate text-[12px] font-medium text-ink">{item.name}</span>
              <span className="block truncate text-[11px] text-ink/55">{item.city}</span>
            </span>
          </button>
        ))}
      </div>
      <HBarChart
        caption="Named seed assets by SF · MW not restated"
        rows={named.map((item) => ({
          id: item.id,
          label: item.name,
          value: item.propertySf ?? 0,
          display: item.propertySf ? formatSf(item.propertySf, true) : 'SF —',
          active: selectedId === item.id,
        }))}
        tone="ink"
        onSelect={(id) => setSelectedId(selectedId === id ? null : id)}
      />
      <SpokenFacts
        items={[
          'Feb 3 spec is the sale against vacant LS shells: 30 W/SF minimum, prefer 35–50+. Avia/Spur comments 8 W/USF lab. 999 Baker is 27 W/SF building, 40 W/SF lab.',
          `${fact('powerBuildings').value} buildings / ${fact('powerSfM').value} msf in the May 2026 working layer. ${fact('powerTier01').value} of them are tier 0–1.`,
          'This is why AI and R&D companies sign vacant LS product: usable power and cooling on their delivery date, not a 36-month utility narrative.',
          'Anonymous nodes stay on the map. Names are not restated from the May file. Do not treat this as a building-level claim.',
          'MW per asset is not in the February snapshot. We will not invent it.',
          snapshot.meta.powerFreshness,
        ]}
      />
    </BriefingRail>
  )
}
