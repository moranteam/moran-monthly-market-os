import type { Accent } from '@/data/types'

const accentFill: Record<Accent, string> = {
  cryo: '#5ad4d4',
  copper: '#d36f35',
  gold: '#e3ad3f',
  paper: '#f4f1e8',
}

type NumberedPinProps = {
  index?: number | string
  label?: string
  accent?: Accent
  active?: boolean
  onClick?: () => void
}

export function NumberedPin({
  index,
  label,
  accent = 'cryo',
  active = false,
  onClick,
}: NumberedPinProps) {
  const color = accentFill[accent]
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0"
      aria-label={label ?? String(index ?? 'pin')}
    >
      <span
        className="pin-pulse absolute top-1/2 left-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: color, opacity: active ? 0.35 : undefined }}
      />
      <span
        className={`relative flex h-7 w-7 items-center justify-center rounded-full border text-[12px] font-medium tabular ${
          active ? 'scale-110' : ''
        }`}
        style={{
          background: active ? color : '#f4f1e8',
          color: active ? '#0b1c18' : '#0b1c18',
          borderColor: color,
          boxShadow: `0 0 0 1px ${color}`,
        }}
      >
        {index ?? '•'}
      </span>
    </button>
  )
}
