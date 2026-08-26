import { CorridorSpine } from '@/components/CorridorSpine'
import { snapshot } from '@/data/load'
import type { LensId, ModeId } from '@/data/types'
import { usePresenter } from '@/state/presenter'

const modes: { id: ModeId; label: string; hint: string }[] = [
  { id: 'present', label: 'Master', hint: 'P' },
  { id: 'twin', label: 'Twin', hint: 'T' },
  { id: 'share', label: 'Share', hint: 'S' },
]

const lenses: LensId[] = ['occupier', 'owner', 'lender']

export function Chrome() {
  const {
    mode,
    setMode,
    lens,
    setLens,
    chromeVisible,
    revealChrome,
    toggleFullscreen,
    fullscreen,
    requestPrint,
  } = usePresenter()

  return (
    <div className="pointer-events-none absolute inset-0 z-40 no-print" onMouseMove={revealChrome}>
      <div
        className={`pointer-events-auto absolute inset-x-0 top-0 flex items-start justify-end gap-3 px-4 pt-3 transition-opacity duration-300 ${
          chromeVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1 rounded-full border border-paper/15 bg-forest/70 p-1 backdrop-blur-md">
            {modes.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id)}
                className={`rounded-full px-3 py-1.5 text-[12px] ${
                  mode === item.id ? 'bg-paper text-forest' : 'text-paper/70 hover:text-paper'
                }`}
              >
                {item.label}
                <span className="ml-1.5 text-[11px] opacity-50">{item.hint}</span>
              </button>
            ))}
          </div>
          {mode !== 'twin' ? (
            <div className="flex items-center gap-1 rounded-full border border-paper/10 bg-forest/60 p-1">
              {lenses.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setLens(id)}
                  className={`rounded-full px-3 py-1 text-[12px] capitalize ${
                    lens === id ? 'bg-copper text-paper' : 'text-paper/60 hover:text-paper'
                  }`}
                >
                  {snapshot.lenses[id].label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {mode !== 'twin' ? (
        <div
          className={`pointer-events-auto absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-4 pb-3 transition-opacity duration-300 ${
            chromeVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <CorridorSpine />
          <div className="flex shrink-0 items-center gap-3 text-[13px] text-paper/70">
            {mode === 'share' ? (
              <button type="button" onClick={requestPrint} className="hover:text-paper">
                Print 16:9
              </button>
            ) : null}
            <button type="button" onClick={toggleFullscreen} className="hover:text-paper">
              {fullscreen ? 'Exit' : 'Fullscreen'} · F
            </button>
            <span className="hidden md:inline">← → Space</span>
            <span className="hidden font-mono text-[11px] text-paper/45 lg:inline">{__BUILD_SHA__}</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}
