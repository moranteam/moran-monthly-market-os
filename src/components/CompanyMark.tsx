import { logoSources, markDomain, markLetter } from '@/lib/marks'
import { useState } from 'react'

type CompanyMarkProps = {
  name?: string | null
  size?: 'sm' | 'md' | 'lg'
  unnamed?: boolean
}

const box: Record<NonNullable<CompanyMarkProps['size']>, string> = {
  sm: 'h-6 w-6 text-[11px]',
  md: 'h-7 w-7 text-[12px]',
  lg: 'h-8 w-8 text-[13px]',
}

export function CompanyMark({ name, size = 'md', unnamed = false }: CompanyMarkProps) {
  if (unnamed || !name) return null
  const domain = markDomain(name)
  return domain ? <RemoteMark name={name} domain={domain} size={size} /> : <LetterMark name={name} size={size} />
}

export function NameWithMark({
  name,
  size = 'md',
  unnamed = false,
  className = '',
}: CompanyMarkProps & { className?: string }) {
  if (unnamed || !name) return <span className={className}>{name}</span>
  return (
    <span className={`inline-flex min-w-0 items-center gap-2 ${className}`}>
      <CompanyMark name={name} size={size} />
      <span className="min-w-0 truncate">{name}</span>
    </span>
  )
}

function RemoteMark({
  name,
  domain,
  size,
}: {
  name: string
  domain: string
  size: NonNullable<CompanyMarkProps['size']>
}) {
  const [source, setSource] = useState(0)
  const urls = logoSources(domain)
  if (source >= urls.length) return <LetterMark name={name} size={size} />
  return (
    <img
      src={urls[source]}
      alt=""
      className={`${box[size]} shrink-0 rounded-sm border border-ink/15 bg-white object-contain p-0.5`}
      onError={() => setSource((current) => current + 1)}
    />
  )
}

function LetterMark({ name, size }: { name: string; size: NonNullable<CompanyMarkProps['size']> }) {
  return (
    <span
      aria-hidden
      className={`${box[size]} inline-flex shrink-0 items-center justify-center rounded-sm border border-ink/15 bg-white font-medium text-ink`}
    >
      {markLetter(name)}
    </span>
  )
}
