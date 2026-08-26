import { BrandLockup } from '@/components/BrandLockup'
import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { Icon, type IconName } from '@/components/icons'
import { snapshot } from '@/data/load'
import { usePresenter } from '@/state/presenter'

const roleIcon: Record<string, IconName> = {
  occupier: 'users',
  owner: 'building-2',
  lender: 'briefcase',
}

export function DecisionScene() {
  const { selectedId, setSelectedId, lens, takeaway, setLens } = usePresenter()
  const active =
    snapshot.decisions.find((item) => item.id === selectedId) ??
    snapshot.decisions.find((item) => item.id === lens) ??
    snapshot.decisions[0]

  return (
    <BriefingRail
      kicker="Decision"
      title="What do you tour this quarter?"
      thesis={takeaway ?? 'Tour the vacant LS shell that already has power. Commodity office is residual.'}
    >
      <div className="grid gap-3">
        {snapshot.decisions.map((frame) => {
          const on = active?.id === frame.id
          return (
            <button
              key={frame.id}
              type="button"
              onClick={() => {
                setSelectedId(frame.id)
                if (frame.id === 'occupier' || frame.id === 'owner' || frame.id === 'lender') {
                  setLens(frame.id)
                }
              }}
              className={`border p-4 text-left ${on ? 'border-copper bg-white' : 'border-ink/10 bg-white/45'}`}
            >
              <p className="flex items-center gap-2 text-[13px] font-medium tracking-[0.14em] text-copper uppercase">
                <Icon name={roleIcon[frame.id] ?? 'briefcase'} className="h-4 w-4" />
                {frame.role}
              </p>
              <h2 className="mt-2 font-display text-[22px] leading-[1.1] text-ink">{frame.question}</h2>
              <p className="mt-3 text-[16px] leading-snug text-ink/85">{frame.line}</p>
            </button>
          )
        })}
      </div>
      <SpokenFacts
        items={[
          `${snapshot.meta.asOfLabel}. Office and R&D prints are Q2 2026. Life-science vacancy is still the Q4 2025 / Q1 2026 cluster. Power working layer ${snapshot.meta.powerAsOf} — older, do not mix.`,
          'Talent prints are August 2026 Scoring Tech Talent. Mission Bay LS is Moran-Bennett Q4 2025. Mission Bay office vacancy is the Q2 2026 pack — 17.0%, not 22.7%.',
        ]}
      />
      <div className="grid gap-1.5">
        {snapshot.meta.sources.map((source) => (
          <p key={source.id} className="text-[13px] text-ink/55">
            <span className="text-ink">{source.name}.</span> {source.note}
          </p>
        ))}
      </div>
      <p className="text-[13px] leading-relaxed text-ink/50">{snapshot.meta.disclaimer}</p>
      <BrandLockup size="md" tone="ink" />
    </BriefingRail>
  )
}
