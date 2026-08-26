type VennProductProps = {
  shared: string[]
  lsOnly: string[]
}

export function VennProduct({ shared, lsOnly }: VennProductProps) {
  return (
    <figure>
      <figcaption className="mb-2 text-[13px] font-medium text-ink/55">
        Traditional office ∩ life science ∩ AI
      </figcaption>
      <svg viewBox="0 0 420 220" className="h-auto w-full" role="img" aria-label="Product Venn">
        <circle cx="155" cy="110" r="78" fill="#0b1c18" fillOpacity="0.08" stroke="#0b1c18" strokeWidth="1.5" />
        <circle cx="265" cy="110" r="78" fill="#d36f35" fillOpacity="0.12" stroke="#d36f35" strokeWidth="1.5" />
        <circle cx="210" cy="68" r="72" fill="#5ad4d4" fillOpacity="0.14" stroke="#5ad4d4" strokeWidth="1.5" />
        <text x="108" y="175" textAnchor="middle" fill="#0b1c18" fontSize="12">
          Office
        </text>
        <text x="312" y="175" textAnchor="middle" fill="#0b1c18" fontSize="12">
          Life science
        </text>
        <text x="210" y="28" textAnchor="middle" fill="#0b1c18" fontSize="12">
          AI
        </text>
        <text x="210" y="108" textAnchor="middle" fill="#0b1c18" fontSize="11" fontWeight="600">
          {shared.slice(0, 3).join(' · ')}
        </text>
        <text x="210" y="124" textAnchor="middle" fill="#0b1c18" fontSize="11">
          {shared.slice(3).join(' · ')}
        </text>
        <text x="318" y="118" textAnchor="middle" fill="#0b1c18" fontSize="10">
          {lsOnly[0]}
        </text>
        <text x="318" y="132" textAnchor="middle" fill="#0b1c18" fontSize="10">
          {lsOnly.slice(1, 3).join(' · ')}
        </text>
      </svg>
      <p className="text-[13px] text-ink/60">
        LS-only: {lsOnly.join(', ')}. Shared plate is how you sell a vacant science shell to an AI user.
      </p>
    </figure>
  )
}
