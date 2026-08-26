import { NameWithMark } from '@/components/CompanyMark'

export function LogoStrip({ names, caption }: { names: string[]; caption?: string }) {
  return (
    <div>
      {caption ? <p className="mb-2 text-[13px] font-medium text-ink/55">{caption}</p> : null}
      <ul className="flex flex-wrap gap-2">
        {names.map((name) => (
          <li key={name} className="border border-ink/10 bg-white px-2 py-1.5">
            <NameWithMark name={name} size="lg" className="text-[13px] font-medium text-ink" />
          </li>
        ))}
      </ul>
    </div>
  )
}
