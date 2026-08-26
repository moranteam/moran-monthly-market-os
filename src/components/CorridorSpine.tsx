import { firstSceneOnSpine, spineForScene, spineStops } from '@/lib/spine'
import { usePresenter } from '@/state/presenter'

export function CorridorSpine() {
  const { sceneId, sceneIds, goTo } = usePresenter()
  const active = spineForScene(sceneId)

  return (
    <div className="flex min-w-0 flex-1 items-center gap-1">
      {spineStops.map((stop, index) => {
        const on = active === stop.id
        return (
          <button
            key={stop.id}
            type="button"
            onClick={() => goTo(firstSceneOnSpine(sceneIds, stop.id))}
            className="flex min-w-0 items-center gap-1"
          >
            {index > 0 ? (
              <span className={`h-px w-6 md:w-10 ${on || spineForScene(sceneId) ? 'bg-paper/30' : 'bg-paper/15'}`} />
            ) : null}
            <span
              className={`flex h-2.5 w-2.5 shrink-0 rounded-full ${on ? 'bg-gold' : 'bg-paper/30'}`}
            />
            <span className={`hidden truncate text-[12px] md:inline ${on ? 'text-paper' : 'text-paper/45'}`}>
              {stop.label}
            </span>
          </button>
        )
      })}
      <span className="ml-2 hidden text-[11px] tracking-[0.16em] uppercase text-paper/35 lg:inline">
        101 / 280
      </span>
    </div>
  )
}
