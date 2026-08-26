import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import type { Accent } from '@/data/types'
import { snapshot } from '@/data/load'
import { BAY_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

const accentBar: Record<Accent, string> = {
  cryo: 'bg-cryo',
  copper: 'bg-copper',
  gold: 'bg-gold',
  paper: 'bg-forest',
}

export function CorridorScene() {
  const { selectedId, setSelectedId, setCamera, takeaway } = usePresenter()
  const active = snapshot.corridors.find((corridor) => corridor.id === selectedId) ?? snapshot.corridors[0]

  useEffect(() => {
    if (!selectedId) setCamera(BAY_CAMERA)
  }, [selectedId, setCamera])

  useEffect(() => {
    if (!active) return
    if (selectedId !== active.id) return
    setCamera({
      longitude: active.lng,
      latitude: active.lat,
      zoom: active.zoom,
      pitch: active.pitch,
      bearing: active.bearing,
    })
  }, [active, selectedId, setCamera])

  return (
    <BriefingRail
      kicker="The corridor"
      emoji="📍"
      title="The Bay Area is not one market."
      thesis={takeaway ?? 'Four products on one 101 / 280 spine. Click a node. The camera follows.'}
    >
      <div className="grid grid-cols-2 gap-2">
        {snapshot.corridors.map((corridor) => {
          const on = (selectedId ?? snapshot.corridors[0]?.id) === corridor.id
          return (
            <button
              key={corridor.id}
              type="button"
              onClick={() => setSelectedId(on ? null : corridor.id)}
              className={`text-left border px-3 py-3 ${
                on ? 'border-copper bg-white' : 'border-ink/10 bg-white/40 hover:border-ink/25'
              }`}
            >
              <span className={`mb-2 block h-0.5 w-8 ${accentBar[corridor.accent]}`} />
              <p className="text-[12px] tracking-[0.14em] text-ink/45 uppercase">0{corridor.index}</p>
              <p className="mt-0.5 font-display text-[22px] leading-tight text-ink">{corridor.name}</p>
              <p className="mt-1 text-[13px] text-ink/55">{corridor.city}</p>
            </button>
          )
        })}
      </div>
      {active ? (
        <div className="border-l-2 border-copper pl-3">
          <p className="text-[13px] font-medium tracking-[0.12em] text-copper uppercase">
            {active.name}
          </p>
          <p className="mt-1 font-editorial text-[18px] leading-snug text-ink">{active.thesis}</p>
          <p className="mt-2 text-[15px] text-ink/65">{active.signal}</p>
        </div>
      ) : null}
      <SpokenFacts
        items={[
          'Mission Bay is a campus decision — UCSF, Mission Rock, OpenAI along Third.',
          'South San Francisco still clears the largest lab requirements at Oyster Point.',
          'Peninsula office and science share a highway, not a product.',
          'Silicon Valley R&D is 139.3 msf. One vacancy rate is not one bid.',
        ]}
      />
    </BriefingRail>
  )
}
