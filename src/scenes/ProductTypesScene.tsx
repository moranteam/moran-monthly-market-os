import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { HighPoweredSpec } from '@/components/HighPoweredSpec'
import { VennProduct } from '@/components/charts/VennProduct'
import { fact, snapshot } from '@/data/load'
import { kpisFor } from '@/lib/kpis'
import { PENINSULA_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function ProductTypesScene() {
  const { setCamera, takeaway, lens } = usePresenter()
  const spec = snapshot.productSpec
  const kpis = kpisFor('product', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))

  useEffect(() => {
    setCamera({ ...PENINSULA_CAMERA, zoom: 10.4, pitch: 46 })
  }, [setCamera])

  return (
    <BriefingRail
      kicker="Product types"
      emoji="⚡"
      title="How you sell a vacant LS shell to an AI user."
      thesis={takeaway ?? spec.thesis}
      kpis={kpis}
      asOf={spec.asOf}
    >
      <VennProduct shared={spec.shared} lsOnly={spec.lsOnly} />
      <HighPoweredSpec />
      <div className="grid gap-3 md:grid-cols-2">
        <SpecCard hed={spec.aiOffice.hed} lines={spec.aiOffice.lines} />
        <SpecCard hed={spec.aiRnd.hed} lines={spec.aiRnd.lines} />
      </div>
      <p className="border-l-2 border-copper pl-3 font-editorial text-[18px] leading-snug text-ink">
        {spec.blueprint}
      </p>
      <SpokenFacts
        items={[
          '150 Industrial worked because the utilities were already in the building. That closed deal is the proof — not vacant inventory.',
          spec.deepTech,
          `${fact('powerBuildings').value} buildings / ${fact('powerSfM').value} msf sit on the May 2026 power working layer — a different vintage than the February market snapshot.`,
        ]}
      />
    </BriefingRail>
  )
}

function SpecCard({ hed, lines }: { hed: string; lines: string[] }) {
  return (
    <div className="border border-ink/10 bg-white/50 p-3">
      <p className="text-[13px] font-medium tracking-[0.12em] text-copper uppercase">{hed}</p>
      <ul className="mt-2 space-y-1 text-[15px] text-ink/85">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  )
}
