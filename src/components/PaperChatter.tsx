import { MarkRow } from '@/components/MarkRow'
import { PhotoPlate } from '@/components/PhotoPlate'
import { chatterProperty, snapshot } from '@/data/load'
import { usePresenter } from '@/state/presenter'

type PaperChatterProps = {
  ids: string[]
  caption: string
}

export function PaperChatter({ ids, caption }: PaperChatterProps) {
  const { selectedId, setSelectedId, setCamera } = usePresenter()
  const items = ids.flatMap((id) => {
    const entry = snapshot.chatter.find((item) => item.id === id)
    return entry ? [entry] : []
  })

  if (items.length === 0) return null

  return (
    <div>
      <p className="mb-2 text-[13px] font-medium text-ink/55">{caption}</p>
      <div className="grid gap-2">
        {items.map((entry) => {
          const asset = chatterProperty(entry)
          const on = selectedId === entry.id
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => {
                const next = on ? null : entry.id
                setSelectedId(next)
                if (asset && next) {
                  setCamera({
                    longitude: asset.lng,
                    latitude: asset.lat,
                    zoom: 14,
                    pitch: 52,
                    bearing: -16,
                  })
                }
              }}
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
                  className="h-14 w-14"
                />
              ) : (
                <PhotoPlate name={entry.hed} className="h-14 w-14" />
              )}
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-[12px] font-medium tracking-[0.12em] text-copper uppercase">
                  <MarkRow names={entry.marks} />
                  {entry.dateLabel}
                </span>
                <span className="block text-[15px] text-ink">{entry.hed}</span>
                {on ? <span className="mt-1 block text-[14px] text-ink/70">{entry.dek}</span> : null}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
