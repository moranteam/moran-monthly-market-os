import { MarkRow } from '@/components/MarkRow'
import { propertyById, snapshot } from '@/data/load'
import { usePresenter } from '@/state/presenter'

type ChatterRailProps = {
  corridor?: string
}

export function ChatterRail({ corridor }: ChatterRailProps) {
  const { selectedId, setSelectedId, setCamera } = usePresenter()
  const items = corridor
    ? snapshot.chatter.filter((item) => item.corridor === corridor)
    : snapshot.chatter

  return (
    <div className="flex max-w-xl flex-col gap-1.5">
      {items.map((entry) => {
        const on = selectedId === entry.id
        return (
          <button
            key={entry.id}
            type="button"
            onClick={() => {
              const next = on ? null : entry.id
              setSelectedId(next)
              const property = entry.propertyId ? propertyById(entry.propertyId) : undefined
              if (property && next) {
                setCamera({
                  longitude: property.lng,
                  latitude: property.lat,
                  zoom: 14,
                  pitch: 52,
                  bearing: -16,
                })
              }
            }}
            className={`text-left ${on ? 'density-glass p-3' : 'border-l border-paper/20 py-1.5 pl-4 hover:border-gold'}`}
          >
            <p className="flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-gold">
              <MarkRow names={entry.marks} />
              {entry.dateLabel} · {entry.hed}
            </p>
            {on ? (
              <p className="mt-2 font-editorial text-[17px] leading-snug text-paper">{entry.dek}</p>
            ) : (
              <p className="mt-0.5 line-clamp-1 text-[13px] text-paper/55">{entry.dek}</p>
            )}
          </button>
        )
      })}
    </div>
  )
}
