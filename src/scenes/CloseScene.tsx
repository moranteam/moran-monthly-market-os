import { BrandLockup } from '@/components/BrandLockup'
import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { snapshot } from '@/data/load'
import { BAY_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function CloseScene() {
  const { setCamera, takeaway } = usePresenter()

  useEffect(() => {
    setCamera({ ...BAY_CAMERA, zoom: 8.4, pitch: 36, bearing: -8 })
  }, [setCamera])

  return (
    <BriefingRail
      kicker="Method"
      title="As-of dates, sources, limits."
      thesis={
        takeaway ??
        `${snapshot.meta.asOfLabel}. Market layer ${snapshot.meta.marketAsOf}. Power working layer ${snapshot.meta.powerAsOf}.`
      }
    >
      <SpokenFacts
        items={[
          `Market snapshot ${snapshot.meta.marketAsOfLabel}. Power working layer ${snapshot.meta.powerAsOfLabel} — older, do not mix.`,
          'Every print in this briefing is restated from the dated sources below. If research did not restate a figure, it is not on the rail.',
          'Restage next month by swapping snapshot.json.',
        ]}
      />
      <div className="grid gap-2">
        {snapshot.meta.sources.map((source) => (
          <div key={source.id} className="border-l-2 border-ink/20 pl-3">
            <p className="text-[16px] text-ink">{source.name}</p>
            <p className="text-[14px] text-ink/55">{source.note}</p>
          </div>
        ))}
      </div>
      <p className="text-[14px] leading-relaxed text-ink/60">{snapshot.meta.disclaimer}</p>
      <BrandLockup size="md" tone="ink" />
    </BriefingRail>
  )
}
