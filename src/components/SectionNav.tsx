import { navItemsFor } from '@/lib/nav'
import { usePresenter } from '@/state/presenter'
import { useState } from 'react'

export function SectionNav() {
  const { sceneId, sceneIds, jumpTo } = usePresenter()
  const items = navItemsFor(sceneIds)
  const [hoverId, setHoverId] = useState<string | null>(null)
  const hovered = items.find((item) => item.sceneId === hoverId)

  return (
    <nav
      aria-label="Briefing sections"
      className="relative z-40 flex h-full w-[10.25rem] shrink-0 flex-col border-r border-paper/10 bg-forest-deep"
    >
      <p className="px-3 pt-4 pb-2 text-[11px] font-medium tracking-[0.2em] text-gold uppercase">
        Jump
      </p>
      <ul className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto px-2 pb-3">
        {items.map((item) => {
          const on = sceneId === item.sceneId
          return (
            <li key={item.sceneId}>
              <button
                type="button"
                onClick={() => jumpTo(item.sceneId)}
                onMouseEnter={() => setHoverId(item.sceneId)}
                onMouseLeave={() => setHoverId(null)}
                onFocus={() => setHoverId(item.sceneId)}
                onBlur={() => setHoverId(null)}
                className={`flex w-full items-start gap-2 rounded-sm px-1.5 py-1.5 text-left ${
                  on ? 'bg-paper/10' : 'hover:bg-paper/5'
                }`}
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${on ? 'bg-gold' : 'bg-paper/30'}`}
                />
                <span className={`text-[13px] leading-tight ${on ? 'text-paper' : 'text-paper/70'}`}>
                  {item.title}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      {hovered ? (
        <div className="pointer-events-none absolute top-1/2 left-full z-50 w-[16rem] -translate-y-1/2 px-3">
          <div className="rounded-sm border border-ink/10 bg-paper p-3 text-ink shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
            <p className="text-[12px] font-medium tracking-[0.14em] text-copper uppercase">
              {hovered.title}
            </p>
            <p className="mt-1.5 font-editorial text-[16px] leading-snug">{hovered.thesis}</p>
          </div>
        </div>
      ) : null}
    </nav>
  )
}
