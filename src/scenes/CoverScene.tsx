import { BrandLockup } from '@/components/BrandLockup'
import { BriefingRail } from '@/components/BriefingRail'
import { ClusterTable } from '@/components/ClusterTable'
import { fact, snapshot } from '@/data/load'
import { formatFact } from '@/lib/format'
import { kpisFor } from '@/lib/kpis'
import { BAY_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

const agenda = [
  {
    n: '01',
    title: 'Silicon Valley R&D',
    dek: '135.2 msf. 13.3% vacant. +519k in the quarter. $2.84/sf NNN.',
    sceneId: 'rnd',
  },
  {
    n: '02',
    title: 'Life Sciences',
    dek: '30.2% vacant. The leftover shells are the AI tour.',
    sceneId: 'leasing',
  },
  {
    n: '03',
    title: 'Office',
    dek: 'SF 29.2%. Peninsula 24.9%. Greater SV 15.2%. Oakland 25.7%.',
    sceneId: 'office',
  },
  {
    n: '04',
    title: 'Exploding Industries',
    dek: 'AI is 1.1 msf of 4.0 msf Peninsula TIMS.',
    sceneId: 'exploding',
  },
  {
    n: '05',
    title: 'Funding',
    dek: 'Q4 $47.42B. 2025 $187.68B. 80% of U.S. AI VC since 2020.',
    sceneId: 'funding',
  },
  {
    n: '06',
    title: 'Mission Bay',
    dek: '17.0% vacant. $9.33/sf FSG. 1450 Owens is the tour.',
    sceneId: 'mission-bay',
  },
] as const

export function CoverScene() {
  const { setCamera, takeaway, lens, jumpTo } = usePresenter()
  const kpis = kpisFor('cover', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))

  useEffect(() => {
    setCamera({ ...BAY_CAMERA })
  }, [setCamera])

  return (
    <BriefingRail
      kicker="Agenda"
      title={snapshot.meta.title}
      thesis={
        takeaway ??
        'They have to be here for the talent. They want to be in the office. Vacant LS shells are the AI tour.'
      }
      kpis={kpis}
    >
      <ol className="space-y-1.5">
        {agenda.map((item) => (
          <li key={item.n}>
            <button
              type="button"
              onClick={() => jumpTo(item.sceneId)}
              className="group flex w-full items-center gap-3 border border-ink/10 bg-white/55 px-3 py-2 text-left hover:border-copper/60 hover:bg-white"
            >
              <span className="w-8 shrink-0 font-display text-[22px] leading-none text-copper">{item.n}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[22px] leading-tight text-ink">{item.title}</span>
                <span className="block text-[14px] text-ink/60">{item.dek}</span>
              </span>
              <span className="hidden h-px flex-1 bg-ink/15 sm:block" />
              <span aria-hidden className="text-[18px] text-copper transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </li>
        ))}
      </ol>
      <ClusterTable product="overview" />
      <p className="text-[15px] text-ink/75">
        Four geos on the map. SF office {formatFact(fact('sfOfficeVacancyPct'))} vacant · Peninsula{' '}
        {formatFact(fact('penOfficeVacancyPct'))} · Greater SV office {formatFact(fact('gsvOfficeVacancyPct'))} · SV R&D{' '}
        {formatFact(fact('svVacancyPct'))}.
      </p>
      <div className="mt-auto flex items-end justify-between gap-3 pt-2">
        <BrandLockup size="md" tone="ink" />
        <p className="text-[12px] tracking-[0.16em] text-ink/45 uppercase">Moran Team | CBRE</p>
      </div>
    </BriefingRail>
  )
}
