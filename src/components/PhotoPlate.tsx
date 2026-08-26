import { markLetter } from '@/lib/marks'

type PhotoPlateProps = {
  name: string
  address?: string | null
  city?: string | null
  photoUrl?: string | null
  photoAlt?: string | null
  className?: string
}

export function isRealPhoto(url?: string | null) {
  if (!url) return false
  return !url.includes('unsplash.com') && !url.includes('placeholder')
}

export function PhotoPlate({ name, address, city, photoUrl, photoAlt, className = '' }: PhotoPlateProps) {
  if (isRealPhoto(photoUrl)) {
    return (
      <img
        src={photoUrl ?? ''}
        alt={photoAlt || name}
        className={`shrink-0 object-cover ${className || 'h-16 w-16'}`}
      />
    )
  }

  return (
    <span
      className={`flex shrink-0 flex-col justify-between border border-ink/15 bg-white p-1.5 ${className || 'h-16 w-16'}`}
      aria-label={`${name} address plate`}
    >
      <span className="flex h-6 w-6 items-center justify-center bg-ink text-[12px] font-medium text-paper">
        {markLetter(name)}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[9px] leading-tight font-medium tracking-[0.04em] text-ink uppercase">
          {name}
        </span>
        <span className="block truncate text-[9px] leading-tight text-ink/55">
          {address ?? city ?? 'Address not restated'}
        </span>
      </span>
    </span>
  )
}
