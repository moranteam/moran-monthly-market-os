import { AssetInspect } from '@/components/AssetInspect'
import { ChatterRail } from '@/components/ChatterRail'
import { Chrome } from '@/components/Chrome'
import { PersistentMap } from '@/components/PersistentMap'
import { SectionNav } from '@/components/SectionNav'
import { propertyById, snapshot } from '@/data/load'
import { formatSf } from '@/lib/format'
import { BAY_CAMERA } from '@/lib/mapStyle'
import { twinPins } from '@/lib/pins'
import { usePresenter } from '@/state/presenter'
import { useEffect, useMemo, useState } from 'react'

const filters = ['all', 'corridor', 'property', 'round'] as const
type Filter = (typeof filters)[number]

export function TwinMode() {
  const { selectedId, setSelectedId, setCamera, revealChrome } = usePresenter()
  const [filter, setFilter] = useState<Filter>('all')
  const pins = useMemo(() => {
    const all = twinPins()
    if (filter === 'all') return all
    return all.filter((pin) => pin.kind === filter)
  }, [filter])

  useEffect(() => {
    setCamera({ ...BAY_CAMERA })
  }, [setCamera])

  const chatter = snapshot.chatter.find((item) => item.id === selectedId)
  const property = selectedId
    ? (propertyById(selectedId) ?? (chatter?.propertyId ? propertyById(chatter.propertyId) : undefined))
    : undefined
  const corridor = snapshot.corridors.find((item) => item.id === selectedId)
  const round = snapshot.funding.namedRounds.find((item) => item.id === selectedId)

  return (
    <div className="flex h-full w-full bg-paper" onMouseMove={revealChrome}>
      <SectionNav />
      <div className="grid h-full min-w-0 flex-1 grid-cols-[minmax(16.5rem,0.76fr)_minmax(22rem,1.28fr)]">
        <article className="briefing-rail flex h-full min-w-0 flex-col overflow-y-auto bg-paper px-5 pt-4 pb-10 text-ink">
          <p className="text-[12px] font-medium tracking-[0.16em] text-copper uppercase">Twin</p>
          <h1 className="mt-2 font-display text-[28px] leading-[1.05] text-ink">The corridor stays alive.</h1>
          <p className="mt-2 font-editorial text-[16px] leading-snug text-ink/80">
            Pins persist on the map. Lists stay on this paper rail. This is the monthly operating picture, not a slide.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full border px-3 py-1 text-[12px] capitalize ${
                  filter === item ? 'border-copper bg-white text-ink' : 'border-ink/15 text-ink/60'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-ink/45">{pins.length} pins on this layer</p>
          <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
            <p className="mb-2 text-[12px] font-medium tracking-[0.16em] text-copper uppercase">Chatterbox</p>
            <ChatterRail />
          </div>
          <p className="mt-4 text-[12px] text-ink/40">
            {snapshot.properties.length} named assets ·{' '}
            {formatSf(
              snapshot.properties.reduce((sum, item) => sum + (item.propertySf ?? 0), 0),
              true,
            )}{' '}
            stated
          </p>
        </article>
        <div className="relative min-w-0 overflow-hidden bg-forest">
          <PersistentMap pins={pins} onPinClick={setSelectedId} />
          {property ? (
            <AssetInspect property={property} onClose={() => setSelectedId(null)} />
          ) : corridor ? (
            <aside className="density-glass absolute top-16 right-5 z-30 w-[min(320px,34vw)] p-5">
              <p className="text-[11px] tracking-[0.18em] text-cryo uppercase">{corridor.name}</p>
              <p className="mt-2 font-editorial text-[18px] text-paper">{corridor.thesis}</p>
            </aside>
          ) : round ? (
            <aside className="density-glass absolute top-16 right-5 z-30 w-[min(320px,34vw)] p-5">
              <p className="text-[11px] tracking-[0.18em] text-gold uppercase">{round.round}</p>
              <p className="mt-2 font-display text-[28px] text-paper">{round.company}</p>
              <p className="mt-2 text-[14px] text-paper/70">{round.note}</p>
            </aside>
          ) : null}
          <Chrome />
        </div>
      </div>
    </div>
  )
}
