import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { NameWithMark } from '@/components/CompanyMark'
import { PhotoPlate } from '@/components/PhotoPlate'
import { VacantShellList } from '@/components/VacantShellList'
import { fact, propertyById, snapshot } from '@/data/load'
import { kpisFor } from '@/lib/kpis'
import { formatFact } from '@/lib/format'
import { PENINSULA_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function ThesisScene() {
  const { setCamera, setSelectedId, selectedId, takeaway, lens } = usePresenter()
  const proof = propertyById('san-carlos-research')
  const kpis = kpisFor('thesis', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))

  useEffect(() => {
    if (!proof) {
      setCamera({ ...PENINSULA_CAMERA, zoom: 12.2, pitch: 50 })
      return
    }
    setCamera({
      longitude: proof.lng,
      latitude: proof.lat,
      zoom: 13.4,
      pitch: 38,
      bearing: -8,
    })
  }, [proof, setCamera])

  return (
    <BriefingRail
      kicker="The thesis · LS shells → AI"
      emoji="📍"
      title={snapshot.thesis.thesis}
      thesis={takeaway ?? snapshot.thesis.dek}
      kpis={kpis}
    >
      <button
        type="button"
        onClick={() => setSelectedId(selectedId === 'san-carlos-research' ? null : 'san-carlos-research')}
        className={`flex gap-3 border p-3 text-left ${
          selectedId === 'san-carlos-research' ? 'border-copper bg-white' : 'border-ink/10 bg-white/50'
        }`}
      >
        {proof ? (
          <PhotoPlate
            name={proof.name}
            address={proof.address}
            city={proof.city}
            photoUrl={proof.photoUrl}
            className="h-20 w-20"
          />
        ) : null}
        <span>
          <span className="flex items-center gap-2 text-[13px] font-medium tracking-[0.12em] text-copper uppercase">
            <NameWithMark name="CBRE" size="lg" />
            Moran Team transaction
          </span>
          <span className="mt-1 block font-display text-[26px] leading-tight text-ink">
            {snapshot.thesis.proofHed}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-2 text-[15px] text-ink/70">
            {formatFact(fact('roboticsSf'))} · San Carlos Research Center · former
            <NameWithMark name="Novartis" size="lg" />
          </span>
          <span className="mt-1 block text-[13px] text-ink/50">Tenant unnamed — humanoid robotics user</span>
        </span>
      </button>
      <SpokenFacts items={snapshot.thesis.proofLines} />
      <VacantShellList caption="Vacant new-construction LS shells · overbuild proof" />
      <SpokenFacts
        items={[
          'AI, advanced R&D, robotics, and advanced manufacturing can use that same high-infrastructure product.',
          'Power is why those companies are signing. Talent is why they have to be in the Bay Area — and in the office.',
        ]}
      />
    </BriefingRail>
  )
}
