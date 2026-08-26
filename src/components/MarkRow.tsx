import { NameWithMark } from '@/components/CompanyMark'

export function MarkRow({ names, size = 'md' }: { names?: string[]; size?: 'sm' | 'md' | 'lg' }) {
  if (!names || names.length === 0) return null
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      {names.map((name) => (
        <NameWithMark key={name} name={name} size={size} className="text-[13px] text-ink" />
      ))}
    </span>
  )
}
