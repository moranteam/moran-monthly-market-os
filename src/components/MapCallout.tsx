import type { MapPin } from '@/data/types'

type MapCalloutProps = {
  pin: MapPin
  active?: boolean
  onClick?: () => void
  cameraLng?: number
  cameraLat?: number
}

export function MapCallout({ pin, active = false, onClick, cameraLng, cameraLat }: MapCalloutProps) {
  const east = cameraLng != null ? pin.lng > cameraLng : (pin.index ?? 1) % 2 === 0
  const north = cameraLat != null ? pin.lat > cameraLat : (pin.index ?? 1) % 2 === 1
  const fan = ((Math.max(pin.index ?? 1, 1) - 1) % 4) * 8
  const slot = {
    dx: (east ? -58 : 58) + (east ? -fan : fan),
    dy: (north ? 34 : -34) + (north ? fan : -fan),
  }
  const fact = pin.fact || pin.sublabel
  const color = active ? '#d36f35' : '#f4f1e8'
  const svgLeft = Math.min(0, slot.dx)
  const svgTop = Math.min(0, slot.dy)
  const svgW = Math.max(24, Math.abs(slot.dx))
  const svgH = Math.max(8, Math.abs(slot.dy))
  const x1 = slot.dx < 0 ? svgW : 0
  const y1 = slot.dy < 0 ? svgH : 0
  const x2 = slot.dx < 0 ? 0 : svgW
  const y2 = slot.dy < 0 ? 0 : svgH

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${pin.label}${fact ? ` · ${fact}` : ''}`}
      className="relative -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0"
    >
      <svg
        className="pointer-events-none absolute z-0"
        style={{ left: svgLeft, top: svgTop, width: svgW, height: svgH }}
        viewBox={`0 0 ${svgW} ${svgH}`}
        aria-hidden
      >
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" />
      </svg>
      <span
        className="map-callout-chip absolute z-10 w-max max-w-[10.75rem] text-left"
        style={{
          left: slot.dx > 0 ? slot.dx : undefined,
          right: slot.dx < 0 ? -slot.dx : undefined,
          top: slot.dy,
          transform: 'translateY(-50%)',
        }}
      >
        <span className="block truncate text-[12px] leading-tight font-medium text-paper">{pin.label}</span>
        {fact ? <span className="mt-0.5 block text-[11px] leading-tight text-paper/80">{fact}</span> : null}
      </span>
      <span
        className={`relative z-20 flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-medium tabular ${
          active ? 'scale-110' : ''
        }`}
        style={{
          background: active ? '#d36f35' : '#f4f1e8',
          color: '#0b1c18',
          borderColor: color,
          boxShadow: '0 0 0 1px rgba(11,28,24,0.55)',
        }}
      >
        {pin.index ?? '•'}
      </span>
    </button>
  )
}
