import { Chrome } from '@/components/Chrome'
import { MapInspect } from '@/components/MapInspect'
import { PersistentMap } from '@/components/PersistentMap'
import { SceneFrame } from '@/components/SceneFrame'
import { SectionNav } from '@/components/SectionNav'
import { isShareMode } from '@/data/load'
import { pinsForLayer } from '@/lib/pins'
import { renderScene } from '@/scenes/registry'
import { BriefingLayoutProvider, useBriefingLayout } from '@/state/briefing'
import { usePresenter } from '@/state/presenter'
import { AnimatePresence } from 'motion/react'

export function BriefingShell() {
  return (
    <BriefingLayoutProvider>
      <BriefingShellInner />
    </BriefingLayoutProvider>
  )
}

function BriefingShellInner() {
  const { sceneId, mapLayer, setSelectedId, revealChrome, mode } = usePresenter()
  const { cinematic } = useBriefingLayout()
  const pins = pinsForLayer(mapLayer, isShareMode(mode))
  const wideRail = ['cover', 'markets', 'office', 'leasing', 'rnd', 'mission-bay'].includes(sceneId)

  return (
    <div
      className={`flex h-full w-full ${cinematic ? 'bg-forest' : 'bg-paper'}`}
      onMouseMove={revealChrome}
    >
      <SectionNav />
      <div
        className={`relative h-full min-w-0 flex-1 ${
          cinematic ? '' : wideRail ? 'briefing-split-wide' : 'briefing-split'
        }`}
      >
        <div
          className={
            cinematic
              ? 'pointer-events-none absolute inset-0 z-20'
              : 'relative z-20 h-full min-w-0 overflow-hidden'
          }
        >
          <AnimatePresence mode="wait">
            <SceneFrame sceneId={sceneId}>{renderScene(sceneId)}</SceneFrame>
          </AnimatePresence>
        </div>
        <div className={cinematic ? 'absolute inset-0' : 'relative min-w-0 overflow-hidden bg-forest'}>
          <PersistentMap pins={pins} onPinClick={setSelectedId} />
          {cinematic ? null : <MapInspect />}
          <Chrome />
        </div>
      </div>
    </div>
  )
}
