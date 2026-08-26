import { AssetInspect } from '@/components/AssetInspect'
import { propertyById, snapshot } from '@/data/load'
import { usePresenter } from '@/state/presenter'

export function MapInspect() {
  const { selectedId, setSelectedId } = usePresenter()
  if (!selectedId) return null

  const comp = snapshot.comps.find((item) => item.id === selectedId)
  const chatter = snapshot.chatter.find((item) => item.id === selectedId)
  const study = snapshot.cases.find((item) => item.id === selectedId)
  const property = comp?.propertyId
    ? propertyById(comp.propertyId)
    : chatter?.propertyId
      ? propertyById(chatter.propertyId)
      : study
        ? propertyById(study.propertyId)
        : propertyById(selectedId)

  if (!property && !comp) return null

  return (
    <AssetInspect
      property={property}
      comp={comp}
      onClose={() => setSelectedId(null)}
    />
  )
}
