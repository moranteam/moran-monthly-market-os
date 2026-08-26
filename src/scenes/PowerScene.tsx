import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { HighPoweredSpec } from '@/components/HighPoweredSpec'
import { PowerBlueprint } from '@/components/PowerBlueprint'
import { PhotoPlate } from '@/components/PhotoPlate'
import { fact, snapshot } from '@/data/load'
import { kpisFor } from '@/lib/kpis'
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
      kicker="Power · blueprint"
      title="The high-powered AI tenant."
      thesis={
        takeaway ??
        '30 W/SF minimum, prefer 35–50+. Connectivity, security, mechanical, flexible design. May 2026 working file — older than the Q2 market snapshot.'
      }
      kpis={kpis}
      asOf={snapshot.meta.powerFreshness}
    >
      <PowerBlueprint />
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
      <SpokenFacts
        items={[
          'Blueprint, not a photograph: connectivity, power 30 W/SF min prefer 35–50+, security, mechanical, flexible design.',
          `Feb 3 spec is the sale against vacant LS shells. Avia/Spur comments 8 W/USF lab. 999 Baker is 27 W/SF building, 40 W/SF lab.`,
          `${fact('powerBuildings').value} buildings / ${fact('powerSfM').value} msf in the May 2026 working layer. ${fact('powerTier01').value} of them are tier 0–1.`,
          'Anonymous nodes stay unnamed. MW per asset is not in the snapshot. We will not invent it.',
          snapshot.meta.powerFreshness,
        ]}
      />
    </BriefingRail>
  )
}
