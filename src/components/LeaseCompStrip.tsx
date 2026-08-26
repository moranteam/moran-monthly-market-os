import { NameWithMark } from '@/components/CompanyMark'
import { PhotoPlate } from '@/components/PhotoPlate'
import { propertyById } from '@/data/load'
import type { Comp } from '@/data/types'
import { formatCompRent, formatSf } from '@/lib/format'
import { usePresenter } from '@/state/presenter'

type LeaseCompStripProps = {
  caption: string
  comps: Comp[]
}

export function LeaseCompStrip({ caption, comps }: LeaseCompStripProps) {
  const { selectedId, setSelectedId } = usePresenter()

  return (
    <section>
      <div className="mb-2 flex items-end justify-between gap-3">
        <p className="text-[13px] font-medium text-ink/55">{caption}</p>
        {comps.some((item) => item.cbreDeal) ? (
          <p className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] text-[#1b6b4a] uppercase">
            <span className="h-2.5 w-2.5 bg-[#1b6b4a]/25 ring-1 ring-[#1b6b4a]" />
            CBRE deals
          </p>
        ) : null}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {comps.map((item) => {
          const asset = item.propertyId ? propertyById(item.propertyId) : undefined
          const on = selectedId === item.id
          const rent = formatCompRent(item)
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(on ? null : item.id)}
              className={`flex w-[11.5rem] shrink-0 flex-col border text-left ${
                item.cbreDeal ? 'bg-[#e7f3ec]' : 'bg-white/70'
              } ${on ? 'border-copper' : 'border-ink/12'}`}
            >
              <div className="flex items-center gap-2 border-b border-ink/8 px-2 py-1.5">
                <NameWithMark name={item.tenant} size="sm" className="text-[12px] font-medium" />
              </div>
              {asset ? (
                <PhotoPlate
                  name={asset.name}
                  address={asset.address}
                  city={asset.city}
                  photoUrl={asset.photoUrl}
                  className="h-20 w-full"
                />
              ) : (
                <PhotoPlate
                  name={item.tenant}
                  address={item.address}
                  city={item.city}
                  className="h-20 w-full"
                />
              )}
              <div className="flex flex-col gap-0.5 px-2 py-2 text-[12px] leading-tight text-ink">
                <span className="font-medium">{asset?.address ?? item.address ?? 'Address not restated'}</span>
                <span className="text-ink/55">{item.leaseType}</span>
                <span className="tabular">{item.areaLeasedNote ?? formatSf(item.areaLeasedSf)}</span>
                <span className="tabular">{rent ?? 'Rent not restated'}</span>
                {item.term ? <span>{item.term}</span> : null}
                {item.owner ? <span className="text-ink/55">{item.owner}</span> : null}
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
