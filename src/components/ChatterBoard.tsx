import { CompanyMark } from '@/components/CompanyMark'
import { PhotoPlate } from '@/components/PhotoPlate'
import { chatterProperty, mayChatter } from '@/data/load'
import { usePresenter } from '@/state/presenter'

export function ChatterBoard() {
  const { selectedId, setSelectedId, setCamera } = usePresenter()
  const items = mayChatter()

  return (
    <section className="border border-[#0b1c2c] bg-[#0b1c2c] px-3 py-3 text-[#f4f1e8]">
      <div className="mb-2 flex items-end justify-between gap-3">
        <p className="text-[12px] font-medium tracking-[0.18em] text-[#e3ad3f] uppercase">
          Chatter / rumours
        </p>
        <p className="text-[11px] text-white/45">May 2026 slide</p>
      </div>
      <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-3">
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
                    zoom: 13.4,
                    pitch: 36,
                    bearing: -8,
                  })
                }
              }}
              className={`flex gap-2 p-1.5 text-left ${on ? 'bg-white/12' : 'bg-white/5 hover:bg-white/8'}`}
            >
              {asset ? (
                <PhotoPlate
                  name={asset.name}
                  address={asset.address}
                  city={asset.city}
                  photoUrl={asset.photoUrl}
                  className="h-11 w-11 rounded-full"
                />
              ) : (
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <CompanyMark name={entry.marks?.[0] ?? entry.hed} size="sm" />
                </span>
              )}
              <span className="min-w-0">
                <span className="block truncate text-[11px] tracking-[0.08em] text-[#e3ad3f] uppercase">
                  {entry.marks?.[0] ?? 'Rumour'}
                </span>
                <span className="block text-[13px] leading-tight font-medium uppercase">{entry.hed}</span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
