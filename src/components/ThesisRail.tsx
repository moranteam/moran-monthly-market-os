import type { ReactNode } from 'react'

type ThesisRailProps = {
  kicker?: string
  title: string
  children: ReactNode
  side?: 'left' | 'right'
}

export function ThesisRail({ kicker, title, children, side = 'right' }: ThesisRailProps) {
  return (
    <aside
      className={`density-glass absolute top-16 bottom-16 w-[min(380px,34vw)] overflow-y-auto p-5 ${
        side === 'right' ? 'right-5' : 'left-5'
      }`}
    >
      {kicker ? (
        <p className="text-[11px] uppercase tracking-[0.2em] text-cryo">{kicker}</p>
      ) : null}
      <h2 className="mt-2 font-display text-[28px] leading-tight text-paper">{title}</h2>
      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-paper/75">{children}</div>
    </aside>
  )
}
