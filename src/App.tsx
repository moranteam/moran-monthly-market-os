import { PreloadAssets } from '@/components/PreloadAssets'
import { snapshot } from '@/data/load'
import { PresentMode } from '@/modes/PresentMode'
import { TwinMode } from '@/modes/TwinMode'
import { renderScene } from '@/scenes/registry'
import { PresenterProvider, usePresenter } from '@/state/presenter'

function Stage() {
  const { mode, printing } = usePresenter()

  if (printing) {
    return (
      <div className="print-stack bg-forest-deep">
        {snapshot.modes.share.map((id) => (
          <section key={id} className="print-page relative overflow-hidden bg-paper text-ink">
            {renderScene(id)}
          </section>
        ))}
      </div>
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-forest-deep">
      <div className="relative aspect-video h-auto max-h-full w-full max-w-[100vw] overflow-hidden bg-forest shadow-[0_0_80px_rgba(0,0,0,0.55)] md:h-full md:w-auto md:max-w-none">
        {mode === 'twin' ? <TwinMode /> : <PresentMode />}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <PresenterProvider>
      <PreloadAssets />
      <Stage />
    </PresenterProvider>
  )
}
