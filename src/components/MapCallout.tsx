import type { MapPin } from '@/data/types'

type MapCalloutProps = {
  pin: MapPin
  active?: boolean
  onClick?: () => void
}

export function MapCallout({ pin, active = false, onClick }: MapCalloutProps) {
  const lift = ((pin.index ?? 1) % 3) * 10
  const chipLeft = (pin.index ?? 1) % 2 === 0

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${pin.label}${pin.fact ? ` · ${pin.fact}` : ''}`}
      className="relative -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0"
    >
      <span
        className={`map-callout-chip absolute top-1/2 z-10 w-max max-w-[11.5rem] -translate-y-1/2 text-left ${
          chipLeft ? 'right-[2.65rem]' : 'left-[2.65rem]'
        }`}
        style={{ marginTop: lift - 10 }}
      >
        <span className="block truncate text-[12px] leading-tight font-medium text-paper">{pin.label}</span>
        {pin.fact ? (
          <span className="mt-0.5 block text-[11px] leading-tight text-paper/75">{pin.fact}</span>
        ) : pin.sublabel ? (
          <span className="mt-0.5 block text-[11px] leading-tight text-paper/75">{pin.sublabel}</span>
        ) : null}
      </span>
      <svg
        className="pointer-events-none absolute top-1/2 z-0 -translate-y-1/2"
        style={{
          width: 42,
          height: 16,
          left: chipLeft ? -42 : 8,
          marginTop: lift - 10,
        }}
        viewBox="0 0 42 16"
        aria-hidden
      >
        <line
          x1={chipLeft ? 42 : 0}
          y1="8"
          x2={chipLeft ? 0 : 42}
          y2="8"
          stroke={active ? '#d36f35' : '#f4f1e8'}
          strokeWidth="1.25"
        />
      </svg>
      <span
        className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-medium tabular ${
          active ? 'scale-110' : ''
        }`}
        style={{
          background: active ? '#d36f35' : '#f4f1e8',
          color: '#0b1c18',
          borderColor: active ? '#d36f35' : '#f4f1e8',
          boxShadow: '0 0 0 1px rgba(11,28,24,0.45)',
        }}
      >
        {pin.index ?? '•'}
      </span>
    </button>
  )
}
