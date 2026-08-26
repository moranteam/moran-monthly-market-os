import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { NameWithMark } from '@/components/CompanyMark'
import { MarkRow } from '@/components/MarkRow'
import { PhotoPlate } from '@/components/PhotoPlate'
import { GroupedBars } from '@/components/charts/GroupedBars'
import { StackBar } from '@/components/charts/StackBar'
import { VColumnChart } from '@/components/charts/VColumnChart'
import {
  chatterProperty,
  fact,
  missionBayPinProperties,
  propertyById,
  snapshot,
} from '@/data/load'
import { useVisibleComps } from '@/hooks/useVisibleComps'
import { kpisFor } from '@/lib/kpis'
import { formatCompRent, formatFact, formatPercent, formatPropertyAsking, formatSf, monthlyFromFact, signedSf } from '@/lib/format'
import { MISSION_BAY_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function MissionBayScene() {
  const { selectedId, setSelectedId, setCamera, takeaway, lens } = usePresenter()
  const comps = useVisibleComps('mb-office')
  const chatter = snapshot.chatter.filter((entry) => entry.corridor === 'mission-bay')
  const selectedChatter = chatter.find((entry) => entry.id === selectedId)
  const comp = comps.find((item) => item.id === selectedId)
  const pins = missionBayPinProperties()
  const property = comp?.propertyId
    ? propertyById(comp.propertyId)
    : selectedChatter
      ? chatterProperty(selectedChatter)
      : propertyById(selectedId ?? undefined)
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
      emoji="📍"
      title={mb.thesis}
      thesis={takeaway ?? mb.dek}
      kpis={kpis}
      asOf="Q4 2025 · Moran-Bennett"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <VColumnChart
          caption="Asking · highest SF office submarket · Q2 2025"
          columns={[
            {
              id: 'mb',
              label: 'Mission Bay / China Basin',
              value: monthlyFromFact(fact('mbChinaBasinAsking')),
              display: formatFact(fact('mbChinaBasinAsking')),
              tone: 'asking',
            },
            {
              id: 'city',
              label: 'San Francisco city',
              value: monthlyFromFact(fact('sfOfficeAsking')),
              display: formatFact(fact('sfOfficeAsking')),
              tone: 'ink',
            },
          ]}
        />
        <VColumnChart
          caption="Vacancy · two products on one waterfront"
          columns={[
            {
              id: 'off',
              label: `Office · ${formatFact(fact('mbOfficeCount'))} bldgs`,
              value: Number(fact('mbOfficeVacancyPct').value),
              display: formatPercent(Number(fact('mbOfficeVacancyPct').value)),
              tone: 'vacancy',
            },
            {
              id: 'ls',
              label: `LS · ${formatFact(fact('mbLsCount'))} bldgs`,
              value: Number(fact('mbLsVacancyPct').value),
              display: formatPercent(Number(fact('mbLsVacancyPct').value)),
              tone: 'vacancy',
            },
          ]}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <GroupedBars
          caption="Absorption · quarter vs YTD"
          series={[
            { key: 'q', label: 'Quarter', tone: 'ai' },
            { key: 'ytd', label: 'YTD', tone: 'ink' },
          ]}
          categories={[
            {
              id: 'mb',
              label: 'Mission Bay / China Basin',
              values: {
                q: {
                  value: Number(fact('mbChinaBasinQtrAbsSf').value),
                  display: signedSf(Number(fact('mbChinaBasinQtrAbsSf').value)),
                },
                ytd: {
                  value: Number(fact('mbChinaBasinYtdAbsSf').value),
                  display: signedSf(Number(fact('mbChinaBasinYtdAbsSf').value)),
                },
              },
            },
          ]}
        />
        <StackBar
          caption="Inventory mix · office vs life science"
          totalLabel={`${formatFact(fact('mbOfficeNraSf'))} + ${formatFact(fact('mbLsNraSf'))}`}
          segments={[
            {
              id: 'off',
              label: 'Office',
              sharePct:
                (Number(fact('mbOfficeNraSf').value) /
                  (Number(fact('mbOfficeNraSf').value) + Number(fact('mbLsNraSf').value))) *
                100,
              display: formatFact(fact('mbOfficeNraSf')),
              tone: 'ink',
            },
            {
              id: 'ls',
              label: 'Life science',
              sharePct:
                (Number(fact('mbLsNraSf').value) /
                  (Number(fact('mbOfficeNraSf').value) + Number(fact('mbLsNraSf').value))) *
                100,
              display: formatFact(fact('mbLsNraSf')),
              tone: 'vacancy',
            },
          ]}
        />
      </div>
      <SpokenFacts
        items={[
          `Office ${formatFact(fact('mbOfficeNraSf'))}, ${formatFact(fact('mbOfficeVacancyPct'))} vacant, ${formatFact(fact('mbOfficeFsg'))}. LS ${formatFact(fact('mbLsNraSf'))}, ${formatFact(fact('mbLsVacancyPct'))} vacant, ${formatFact(fact('mbLsAskingNnn'))}. ${formatFact(fact('mbOfficeCount'))} office / ${formatFact(fact('mbLsCount'))} LS / ${formatFact(fact('mbHybridCount'))} hybrid — ${fact('mbHybridCount').note}.`,
          `Mission Bay/China Basin is the highest asking office submarket in San Francisco: ${formatFact(fact('mbChinaBasinAsking'))} vs city ${formatFact(fact('sfOfficeAsking'))} (Q2 2025). ${formatFact(fact('mbChinaBasinNraSf'))}, ${formatFact(fact('mbChinaBasinVacancyPct'))} vacant, quarter +${formatFact(fact('mbChinaBasinQtrAbsSf'))} / YTD +${formatFact(fact('mbChinaBasinYtdAbsSf'))}.`,
          `${mb.overflow} Walk-shed: ${formatFact(fact('mbWalkShedPop'))} pop, med HH ${formatFact(fact('mbWalkShedMedHh'))}, ${formatFact(fact('mbWalkShedWhiteCollarPct'))} white collar.`,
          `AI footprint: ${formatFact(fact('sfAiLeaseCompanies'))} companies / ${formatFact(fact('sfAiLeaseMsf'))} citywide. Mission Bay ${formatFact(fact('mbAiLeaseCompanies'))} leases / ${formatFact(fact('mbAiLeaseSf'))} — largest average.`,
        ]}
      />
      <OwensAvailability />
      <div>
        <p className="mb-2 text-[13px] font-medium text-ink/55">Named assets</p>
        <div className="grid gap-1.5">
          {pins.map((item) => {
            const on = selectedId === item.id
            const asking = formatPropertyAsking(item)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(on ? null : item.id)}
                className={`flex w-full items-baseline justify-between gap-3 border px-3 py-2 text-left ${
                  on ? 'border-copper bg-white' : 'border-ink/10 bg-white/50 hover:border-ink/25'
                }`}
              >
                <span className="min-w-0">
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
      <div>
        <p className="mb-2 text-[13px] font-medium text-ink/55">Campus timeline</p>
        <ol className="space-y-1.5">
          {mb.timeline.map((item) => (
            <li key={item.id} className="flex gap-3 text-[15px] text-ink">
              <span className="w-24 shrink-0 tabular text-ink/50">{item.year}</span>
              <span>{item.line}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="grid gap-2">
        {chatter.map((entry) => {
          const asset = chatterProperty(entry)
          const on = selectedId === entry.id
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => setSelectedId(on ? null : entry.id)}
              className={`flex gap-3 border p-2 text-left ${
                on ? 'border-copper bg-white' : 'border-ink/10 bg-white/50 hover:border-ink/25'
              }`}
            >
              {asset ? (
                <PhotoPlate
                  name={asset.name}
                  address={asset.address}
                  city={asset.city}
                  photoUrl={asset.photoUrl}
                  className="h-14 w-14"
                />
              ) : (
                <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-ink/8 text-[12px] text-ink/40">
                  {entry.dateLabel}
                </span>
              )}
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-[12px] font-medium tracking-[0.12em] text-copper uppercase">
                  <MarkRow names={entry.marks} />
                  {entry.dateLabel}
                </span>
                <span className="block text-[15px] text-ink">{entry.hed}</span>
                {on ? <span className="mt-1 block text-[14px] text-ink/70">{entry.dek}</span> : null}
              </span>
            </button>
          )
        })}
      </div>
      <div>
        <p className="mb-2 text-[13px] font-medium text-ink/55">Signed comps</p>
        {comps.map((item) => {
          const asset = item.propertyId ? propertyById(item.propertyId) : undefined
          const on = selectedId === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(on ? null : item.id)}
              className={`mb-1.5 flex w-full items-center justify-between gap-3 border px-3 py-2 text-left ${
                on ? 'border-copper bg-white' : 'border-ink/10 bg-white/40'
              }`}
            >
              {asset ? (
                <PhotoPlate
                  name={asset.name}
                  address={asset.address}
                  city={asset.city}
                  photoUrl={asset.photoUrl}
                  className="h-12 w-12"
                />
              ) : (
                <PhotoPlate name={item.tenant} className="h-12 w-12" />
              )}
              <span className="min-w-0 flex-1 text-[15px] text-ink">
                <NameWithMark name={item.tenant} size="lg" />
                <span className="ml-2 text-[13px] text-ink/50">{asset?.name}</span>
              </span>
              <span className="shrink-0 tabular text-[14px]">
                {formatSf(item.areaLeasedSf, true)}
                {formatCompRent(item) ? ` · ${formatCompRent(item)}` : ''}
              </span>
            </button>
          )
        })}
      </div>
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
        <span className="block text-[12px] font-medium tracking-[0.12em] text-copper uppercase">
          The tour
        </span>
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
