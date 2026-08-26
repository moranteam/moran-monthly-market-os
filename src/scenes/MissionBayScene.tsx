import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { NameWithMark } from '@/components/CompanyMark'
import { LeaseCompStrip } from '@/components/LeaseCompStrip'
import { PhotoPlate } from '@/components/PhotoPlate'
import { VColumnChart } from '@/components/charts/VColumnChart'
import { compsBySet, fact, missionBayPinProperties, propertyById, snapshot } from '@/data/load'
import { formatFact, formatFsg, formatPercent, formatPropertyAsking, formatSf } from '@/lib/format'
import { kpisFor } from '@/lib/kpis'
import { MISSION_BAY_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

const campusLists = [
  { id: 'ls', title: 'Life science', names: ['UCSF', 'Gladstone', 'BridgeBio'] },
  { id: 'tech', title: 'Big tech', names: ['Uber', 'Coinbase', 'Visa', 'NVIDIA'] },
  { id: 'ai', title: 'AI', names: ['OpenAI', 'Dropbox'] },
] as const

export function MissionBayScene() {
  const { selectedId, setSelectedId, setCamera, takeaway, lens, mode } = usePresenter()
  const comps = compsBySet('mb-office', mode === 'share')
  const pins = missionBayPinProperties()
  const property = propertyById(selectedId ?? undefined)
  const kpis = kpisFor('mission-bay', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))
  const mb = snapshot.missionBay

  useEffect(() => {
    if (property) {
      setCamera({
        longitude: property.lng,
        latitude: property.lat,
        zoom: 13.6,
        pitch: 36,
        bearing: -10,
      })
      return
    }
    setCamera({ ...MISSION_BAY_CAMERA })
  }, [property, setCamera])

  return (
    <BriefingRail
      kicker="Mission Bay"
      title="Highest asking. 17.0% vacant. Not 22.7%."
      thesis={
        takeaway ??
        'Mission Bay / China Basin office is 17.0% vacant on 4,801,531 SF. Asking $9.33/sf FSG. Q2 absorption −150,979 on a large tech sublease.'
      }
      kpis={kpis}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <VColumnChart
          caption="Asking · monthly FSG · Q2 2026"
          columns={[
            {
              id: 'mb',
              label: 'Mission Bay / China Basin',
              value: Number(fact('mbOfficeFsg').value),
              display: formatFact(fact('mbOfficeFsg')),
              tone: 'asking',
            },
            {
              id: 'city',
              label: 'San Francisco city',
              value: Number(fact('sfOfficeAsking').value) / 12,
              display: formatFact(fact('sfOfficeAsking')),
              tone: 'ink',
            },
          ]}
        />
        <VColumnChart
          caption="Vacancy · two products"
          columns={[
            {
              id: 'off',
              label: 'Office · Q2 2026',
              value: Number(fact('mbOfficeVacancyPct').value),
              display: formatPercent(Number(fact('mbOfficeVacancyPct').value)),
              tone: 'vacancy',
            },
            {
              id: 'ls',
              label: 'LS · Q4 2025 snapshot',
              value: Number(fact('mbLsVacancyPct').value),
              display: formatPercent(Number(fact('mbLsVacancyPct').value)),
              tone: 'vacancy',
            },
          ]}
        />
      </div>
      <SpokenFacts
        items={[
          `Office NRA ${formatFact(fact('mbOfficeNraSf'))}, ${formatFact(fact('mbOfficeVacancyPct'))} vacant, asking ${formatFact(fact('mbOfficeFsg'))} (${formatFact(fact('mbChinaBasinAsking'))} annual). Q2 absorption ${formatFact(fact('mbChinaBasinQtrAbsSf'))} — large tech sublease. Do not read the old 22.7% as current.`,
          `LS block is still the Q4 2025 Moran-Bennett print: ${formatFact(fact('mbLsNraSf'))}, ${formatFact(fact('mbLsVacancyPct'))} vacant, ${formatFact(fact('mbLsAskingNnn'))}.`,
          `${mb.overflow} Walk-shed: ${formatFact(fact('mbWalkShedPop'))} pop, med HH ${formatFact(fact('mbWalkShedMedHh'))}, ${formatFact(fact('mbWalkShedWhiteCollarPct'))} white collar.`,
          '550 Terry Francois — OpenAI 314,963 SF, 100% leased, rent confidential. Mission Rock B — Coinbase 150,671 SF at $9.92/sf FSG. 1450 Owens is the vacant tour.',
        ]}
      />
      <OwensAvailability />
      <div className="grid gap-2 md:grid-cols-3">
        {campusLists.map((list) => (
          <div key={list.id} className="border border-ink/10 bg-white/55 px-3 py-2">
            <p className="text-[11px] font-medium tracking-[0.14em] text-copper uppercase">{list.title}</p>
            <ul className="mt-2 space-y-1.5">
              {list.names.map((name) => (
                <li key={name} className="text-[14px] text-ink">
                  <NameWithMark name={name} size="sm" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div>
        <p className="mb-2 text-[13px] font-medium text-ink/55">Numbered aerial · named assets</p>
        <div className="grid gap-1.5">
          {pins.map((item, index) => {
            const on = selectedId === item.id
            const asking = formatPropertyAsking(item)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(on ? null : item.id)}
                className={`flex w-full items-center justify-between gap-3 border px-3 py-2 text-left ${
                  on ? 'border-copper bg-white' : 'border-ink/10 bg-white/50 hover:border-ink/25'
                }`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-[12px] text-paper">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] text-ink">{item.name}</span>
                  <span className="block text-[13px] text-ink/55">
                    {item.owner ? <NameWithMark name={item.owner} /> : item.city}
                  </span>
                </span>
                <span className="shrink-0 text-right tabular text-[13px] text-ink">
                  {item.propertySf ? formatSf(item.propertySf, true) : 'SF —'}
                  {asking ? ` · ${asking}` : ''}
                </span>
              </button>
            )
          })}
        </div>
      </div>
      <LeaseCompStrip caption="Signed Mission Bay office comps" comps={comps} />
      <p className="text-[13px] text-ink/50">
        Coinbase at Mission Rock B is $119 FSG annual — shown {formatFsg(119, 'annual')}. OpenAI at 550
        Terry stays confidential.
      </p>
    </BriefingRail>
  )
}

function OwensAvailability() {
  const { selectedId, setSelectedId } = usePresenter()
  const owens = propertyById('owens-1450')
  if (!owens) return null
  const on = selectedId === owens.id
  const asking = formatPropertyAsking(owens)

  return (
    <button
      type="button"
      onClick={() => setSelectedId(on ? null : owens.id)}
      className={`flex w-full gap-3 border p-3 text-left ${
        on ? 'border-copper bg-white' : 'border-ink/10 bg-white/50 hover:border-ink/25'
      }`}
    >
      <PhotoPlate
        name={owens.name}
        address={owens.address}
        city={owens.city}
        photoUrl={owens.photoUrl}
        className="h-16 w-16"
      />
      <span className="min-w-0">
        <span className="block text-[12px] font-medium tracking-[0.12em] text-copper uppercase">The tour</span>
        <span className="block text-[16px] text-ink">{owens.name}</span>
        <span className="block text-[13px] text-ink/55">
          {owens.owner ? <NameWithMark name={owens.owner} /> : null}
        </span>
        <span className="mt-1 block tabular text-[14px] text-ink">
          {owens.propertySf ? formatSf(owens.propertySf, true) : 'SF —'}
          {asking ? ` · ${asking}` : ''}
          {' · 100% vacant · 100 lbs/SF · all-electric'}
        </span>
      </span>
    </button>
  )
}
