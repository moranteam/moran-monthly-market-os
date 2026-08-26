import { AerialPanel } from '@/components/AerialPanel'
import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { LogoStrip } from '@/components/LogoStrip'
import { StackBar } from '@/components/charts/StackBar'
import { VColumnChart } from '@/components/charts/VColumnChart'
import { fact, snapshot } from '@/data/load'
import { coverMarks } from '@/lib/marks'
import { kpisFor } from '@/lib/kpis'
import { formatFact, formatPercent } from '@/lib/format'
import { AERIAL_CAMERA, BAY_CAMERA } from '@/lib/mapStyle'
import { useBriefingLayout } from '@/state/briefing'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function CoverScene() {
  const { setCamera, takeaway, lens } = usePresenter()
  const { cinematic } = useBriefingLayout()

  useEffect(() => {
    setCamera(cinematic ? { ...AERIAL_CAMERA } : { ...BAY_CAMERA })
  }, [cinematic, setCamera])

  const thesis =
    takeaway ??
    'They have to be here for the talent. They want to be in the office. Vacant LS shells are the AI tour.'
  const kpis = kpisFor('cover', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))

  if (cinematic) {
    return (
      <AerialPanel
        kicker={snapshot.meta.kicker}
        title="Vacant science shells. The AI tour."
        dek={thesis}
        asOf={snapshot.meta.asOfLabel}
      />
    )
  }

  return (
    <BriefingRail
      kicker="Overview"
      emoji="📊"
      title="Vacant science shells. The AI tour."
      thesis={thesis}
      kpis={kpis}
    >
      <LogoStrip caption="Named occupiers, owners, and the firm" names={coverMarks} />
      <div className="grid gap-4 md:grid-cols-2">
        <VColumnChart
          caption="Vacancy · two leftover products"
          columns={[
            {
              id: 'ba-ls',
              label: 'Bay Area LS',
              value: Number(fact('baLsVacancyPct').value),
              display: formatPercent(Number(fact('baLsVacancyPct').value)),
              tone: 'vacancy',
            },
            {
              id: 'pen-off',
              label: 'Peninsula office',
              value: Number(fact('penOfficeVacancyPct').value),
              display: formatPercent(Number(fact('penOfficeVacancyPct').value)),
              tone: 'vacancy',
            },
          ]}
        />
        <StackBar
          caption="SF office activity since 2023"
          totalLabel={formatFact(fact('sfOfficeAiActivityPct'))}
          segments={[
            {
              id: 'ai',
              label: 'AI-related',
              sharePct: Number(fact('sfOfficeAiActivityPct').value),
              display: formatFact(fact('sfOfficeAiActivityPct')),
              tone: 'ai',
            },
            {
              id: 'rest',
              label: 'Rest of activity',
              sharePct: 100 - Number(fact('sfOfficeAiActivityPct').value),
              display: `${100 - Number(fact('sfOfficeAiActivityPct').value)}%`,
              tone: 'ink',
            },
          ]}
        />
      </div>
      <SpokenFacts
        items={[
          `Bay Area is #1 on the 50-market tech talent scorecard. Workforce ${formatFact(fact('talentWorkforce'))}. AI listings ${formatFact(fact('baAiListingPct'))} (June 2026). Remote ${formatFact(fact('baRemoteListingPct'))} (April 2026).`,
          `AI-related companies are ${formatFact(fact('sfOfficeAiActivityPct'))} of San Francisco office activity since 2023.`,
          `Life science raced COVID demand. Demand died. Developers are stuck with vacant high-infrastructure R&D — power, HVAC, floor load, docks, clean-room-capable MEP.`,
          `That is the product AI, robotics, and advanced manufacturing can occupy. Proof is 150 Industrial Road, San Carlos — ${formatFact(fact('roboticsSf'))}, former Novartis, Moran Team transaction.`,
        ]}
      />
    </BriefingRail>
  )
}
