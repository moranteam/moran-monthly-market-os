type PlaceholderFactProps = {
  label: string
}

export function PlaceholderFact({ label }: PlaceholderFactProps) {
  return (
    <div className="placeholder-hatch rounded-sm border border-dashed border-paper/25 px-3 py-2 text-[13px] text-paper/55">
      Placeholder · {label}
    </div>
  )
}
