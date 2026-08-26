import type { SVGProps } from 'react'

export type IconName =
  | 'building-2'
  | 'factory'
  | 'flask-conical'
  | 'zap'
  | 'trending-up'
  | 'map-pin'
  | 'banknote'
  | 'users'
  | 'briefcase'

type IconProps = {
  name: IconName
  className?: string
}

function Svg({ children, className }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  )
}

function IconBody({ name }: { name: IconName }) {
  switch (name) {
    case 'building-2':
      return (
        <>
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
          <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2" />
          <path d="M10 6h4" />
          <path d="M10 10h4" />
          <path d="M10 14h4" />
          <path d="M10 18h4" />
        </>
      )
    case 'factory':
      return (
        <>
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="M17 18h1" />
          <path d="M12 18h1" />
          <path d="M7 18h1" />
        </>
      )
    case 'flask-conical':
      return (
        <>
          <path d="M10 2v7.5L4.2 20.3A2 2 0 0 0 6 23h12a2 2 0 0 0 1.8-2.7L14 9.5V2" />
          <path d="M8.5 2h7" />
          <path d="M7 14h10" />
        </>
      )
    case 'zap':
      return <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    case 'trending-up':
      return (
        <>
          <path d="M16 7h6v6" />
          <path d="m22 7-8.5 8.5-5-5L2 17" />
        </>
      )
    case 'map-pin':
      return (
        <>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      )
    case 'banknote':
      return (
        <>
          <rect width="20" height="12" x="2" y="6" rx="2" />
          <circle cx="12" cy="12" r="2" />
          <path d="M6 12h.01" />
          <path d="M18 12h.01" />
        </>
      )
    case 'users':
      return (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      )
    case 'briefcase':
      return (
        <>
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </>
      )
    default: {
      const _exhaustive: never = name
      return _exhaustive
    }
  }
}

export function Icon({ name, className = 'h-4 w-4' }: IconProps) {
  return (
    <Svg className={className}>
      <IconBody name={name} />
    </Svg>
  )
}
