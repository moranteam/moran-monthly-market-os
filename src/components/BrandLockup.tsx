import { CompanyMark } from '@/components/CompanyMark'
import { snapshot } from '@/data/load'

type BrandLockupProps = {
  size?: 'sm' | 'md'
  align?: 'left' | 'right'
  tone?: 'stage' | 'ink'
}

export function BrandLockup({ size = 'sm', align = 'left', tone = 'stage' }: BrandLockupProps) {
  const { brand } = snapshot.meta
  const compact = size === 'sm'
  const ink = tone === 'ink'
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <div className={`flex items-center gap-2 ${align === 'right' ? 'justify-end' : ''}`}>
        <CompanyMark name={brand.firm} size={compact ? 'md' : 'lg'} />
        <p
          className={`tracking-[0.22em] uppercase ${ink ? 'text-ink' : 'text-paper/80'} ${compact ? 'text-[11px]' : 'text-xs'}`}
        >
          {brand.team}
        </p>
      </div>
      <p className={`mt-0.5 ${ink ? 'text-ink/50' : 'text-paper/45'} ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
        {brand.firm} · {brand.practice}
      </p>
    </div>
  )
}
