const nodes = [
  { id: 'connectivity', letter: 'A', title: 'Connectivity', line: 'Dark fiber. Redundant carriers. Campus-ready.', x: 8, y: 18 },
  { id: 'power', letter: 'B', title: 'Power', line: '30 W/SF minimum. Prefer 35–50+.', x: 8, y: 46 },
  { id: 'security', letter: 'C', title: 'Security', line: 'Multi-layer. Single-tenant preferred.', x: 8, y: 74 },
  { id: 'mechanical', letter: 'D', title: 'Mechanical', line: 'Robust cooling. 2× CFM. 40% backup.', x: 62, y: 22 },
  { id: 'flex', letter: 'E', title: 'Flexible design', line: 'Scalable plates. Flexible MEP. 24/7 ops.', x: 62, y: 62 },
] as const

export function PowerBlueprint() {
  return (
    <section className="border border-ink/12 bg-[#101814] text-paper">
      <div className="flex items-end justify-between gap-3 border-b border-paper/10 px-3 py-2">
        <p className="text-[12px] font-medium tracking-[0.16em] text-gold uppercase">
          Blueprint of the high-powered AI tenant
        </p>
        <p className="text-[11px] text-paper/45">Schematic · no building photograph</p>
      </div>
      <div className="relative min-h-[22rem] overflow-hidden">
        <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full" aria-hidden>
          <rect width="640" height="360" fill="#0c1613" />
          <path d="M210 320 L210 86 L320 36 L430 86 L430 320 Z" fill="#1a2c26" stroke="#e3ad3f" strokeWidth="1.4" />
          <path d="M210 86 L320 36 L430 86 L320 128 Z" fill="#243832" stroke="#e3ad3f" strokeWidth="1.2" />
          {[0, 1, 2, 3, 4].map((row) => (
            <g key={row}>
              <rect x="236" y={108 + row * 38} width="72" height="26" fill="#0b1c18" stroke="rgba(244,241,232,0.22)" />
              <rect x="332" y={108 + row * 38} width="72" height="26" fill="#0b1c18" stroke="rgba(244,241,232,0.22)" />
            </g>
          ))}
          <rect x="292" y="292" width="56" height="28" fill="#0b1c18" stroke="#d36f35" />
          <text x="320" y="310" textAnchor="middle" fill="#f4f1e8" fontSize="9" fontFamily="Geist, sans-serif">
            PLATE
          </text>
          <text x="320" y="28" textAnchor="middle" fill="rgba(244,241,232,0.45)" fontSize="10" fontFamily="Geist, sans-serif">
            ADDRESS + LETTER PLATE · NOT A PHOTO
          </text>
        </svg>
        {nodes.map((node) => (
          <article
            key={node.id}
            className="absolute w-[13.5rem] border border-paper/15 bg-[#06110e]/92 px-2.5 py-2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <p className="flex items-center gap-2 text-[11px] tracking-[0.14em] text-gold uppercase">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-medium text-ink">
                {node.letter}
              </span>
              {node.title}
            </p>
            <p className="mt-1 text-[13px] leading-tight text-paper/88">{node.line}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
