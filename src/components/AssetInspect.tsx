import { CompanyMark, NameWithMark } from '@/components/CompanyMark'
import { PhotoPlate } from '@/components/PhotoPlate'
import type { Comp, Occupancy, Property } from '@/data/types'
import { formatCompRent, formatPropertyAsking, formatSf } from '@/lib/format'

type AssetInspectProps = {
  property?: Property
  comp?: Comp
  onClose: () => void
}

export function AssetInspect({ property, comp, onClose }: AssetInspectProps) {
  const sf = comp
    ? (comp.areaLeasedNote ?? `${comp.approximateSf ? '~' : ''}${formatSf(comp.areaLeasedSf)}`)
    : property?.propertySf
      ? formatSf(property.propertySf)
      : 'SF not restated'
  const rent = comp ? formatCompRent(comp) : null
  const owner = comp?.owner ?? property?.owner
  const thesis = property?.thesis
  const tenant = comp?.tenant
  const occupancyLabel = occupancyCopy(property?.occupancy)
  const propertyAsking = !comp && property ? formatPropertyAsking(property) : null

  return (
    <aside className="density-column pointer-events-auto absolute top-10 right-3 bottom-10 z-30 flex w-[min(320px,32vw)] flex-col overflow-hidden">
      {property ? (
        <div className="relative h-36 shrink-0 overflow-hidden bg-forest-deep">
          <PhotoPlate
            name={property.name}
            address={property.address}
            city={property.city}
            photoUrl={property.photoUrl}
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c18] via-transparent to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 rounded-full border border-paper/25 bg-forest/60 px-2 py-1 text-[12px] text-paper"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between px-4 pt-4">
          <p className="text-[12px] uppercase tracking-[0.16em] text-paper/40">Address not restated</p>
          <button type="button" onClick={onClose} className="text-[12px] text-paper">
            Close
          </button>
        </div>
      )}
      <div className="flex flex-1 flex-col px-4 pt-3 pb-4">
        {comp?.presentationOnly ? (
          <p className="text-[12px] uppercase tracking-[0.18em] text-copper">Presentation only</p>
        ) : comp?.confidential ? (
          <p className="text-[12px] uppercase tracking-[0.18em] text-copper">Confidential</p>
        ) : (
          <p className="text-[12px] uppercase tracking-[0.18em] text-cryo">
            {property?.city ?? 'Peninsula'}
          </p>
        )}
        <p className="mt-2 flex items-center gap-2 font-display text-[34px] leading-[0.95] text-paper">
          {tenant ? <CompanyMark name={tenant} size="lg" /> : property?.owner ? <CompanyMark name={property.owner} size="lg" /> : null}
          <span>{tenant ?? property?.name}</span>
        </p>
        <p className="mt-2 text-[14px] text-paper/65">
          {property ? `${property.name} · ${property.address}` : 'Location not restated'}
        </p>
        <p className="mt-4 font-display text-[40px] leading-none text-gold">{sf}</p>
        {rent ? <p className="mt-2 text-[16px] text-paper">{rent}</p> : null}
        {propertyAsking ? <p className="mt-2 text-[16px] text-paper">{propertyAsking}</p> : null}
        {occupancyLabel ? <p className="mt-2 text-[13px] text-paper/55">{occupancyLabel}</p> : null}
        {owner ? (
          <p className="mt-3 flex items-center gap-2 text-[13px] text-paper/55">
            <span>Owner</span>
            <NameWithMark name={owner} />
          </p>
        ) : null}
        {property?.floorLoadLbs ? (
          <p className="mt-1 text-[13px] text-paper/55">{property.floorLoadLbs} lbs/SF</p>
        ) : null}
        {property?.allElectric ? <p className="mt-1 text-[13px] text-paper/55">All-electric</p> : null}
        {thesis ? (
          <p className="mt-auto pt-4 font-editorial text-[16px] leading-snug text-paper/80">{thesis}</p>
        ) : null}
      </div>
    </aside>
  )
}

function occupancyCopy(occupancy: Occupancy | undefined) {
  if (!occupancy) return null
  switch (occupancy) {
    case 'vacant':
      return 'Vacant'
    case 'leased':
      return 'Leased'
    case 'partial':
      return 'Partial'
    default: {
      const _exhaustive: never = occupancy
      return _exhaustive
    }
  }
}
