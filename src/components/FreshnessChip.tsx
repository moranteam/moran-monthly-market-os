type FreshnessChipProps = {
  label: string
  tone?: 'gold' | 'copper' | 'cryo' | 'ink'
}

export function FreshnessChip({ label, tone = 'gold' }: FreshnessChipProps) {
  const border =
    tone === 'copper'
      ? 'border-copper/50 text-copper'
      : tone === 'cryo'
        ? 'border-cryo/50 text-cryo'
        : tone === 'ink'
          ? 'border-ink/20 text-ink/55'
          : 'border-gold/50 text-gold'
  return (
    <span
      className={`inline-flex max-w-full items-center rounded-full border px-2.5 py-1 text-[11px] leading-snug tracking-wide ${border}`}
    >
      {label}
    </span>
  )
}
