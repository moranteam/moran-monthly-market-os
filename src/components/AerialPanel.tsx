import { BrandLockup } from '@/components/BrandLockup'
import type { ReactNode } from 'react'

type AerialPanelProps = {
  kicker: string
  title: string
  dek: string
  asOf?: string
  children?: ReactNode
}

export function AerialPanel({ kicker, title, dek, asOf, children }: AerialPanelProps) {
  return (
    <div className="pointer-events-none relative flex h-full min-h-0 w-full justify-start">
      <div className="aerial-scrim pointer-events-auto flex h-full min-w-[50vw] w-[56%] flex-col overflow-y-auto px-6 pt-7 pb-12 md:px-8">
        <BrandLockup size="md" />
        <div className="mt-5 min-h-0 flex-1">
          <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">{kicker}</p>
          <h1 className="mt-2 font-display text-[30px] leading-[1.02] text-paper md:text-[38px]">{title}</h1>
          <p className="mt-3 font-editorial text-[16px] leading-snug text-paper/88 italic md:text-[18px]">{dek}</p>
          {children ? <div className="mt-4 flex flex-col gap-3 pb-2">{children}</div> : null}
        </div>
        {asOf ? <p className="mt-4 shrink-0 text-[12px] text-paper/55">{asOf}</p> : null}
      </div>
    </div>
  )
}
