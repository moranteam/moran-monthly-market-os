import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { NameWithMark } from '@/components/CompanyMark'
import { PaperChatter } from '@/components/PaperChatter'
import { PhotoPlate } from '@/components/PhotoPlate'
import { DivergeBar } from '@/components/charts/DivergeBar'
import { StackBar } from '@/components/charts/StackBar'
import { VColumnChart } from '@/components/charts/VColumnChart'
import { fact, propertyById, snapshot } from '@/data/load'
import { useVisibleComps } from '@/hooks/useVisibleComps'
import { kpisFor } from '@/lib/kpis'
import { formatCompRent, formatFact, formatPercent, formatSf, signedSf } from '@/lib/format'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function OfficeScene() {
  const { selectedId, setSelectedId, setCamera, takeaway, lens } = usePresenter()
  const comps = useVisibleComps('pen-office')
  const comp = comps.find((item) => item.id === selectedId)
  const property = comp?.propertyId ? propertyById(comp.propertyId) : undefined
  const kpis = kpisFor('office', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))

  useEffect(() => {
    if (!property) return
    setCamera({
      longitude: property.lng,
      latitude: property.lat,
      zoom: 12.8,
      pitch: 36,
      bearing: -6,
    })
  }, [property, setCamera])

  return (
    <BriefingRail
      kicker="Office"
      emoji="🏢"
      title="Space is available. The AI product is not this stack."
      thesis={
        takeaway ??
        'Peninsula office is 23.8% vacant. Silicon Valley R&D is 12.3%. Talent still comes in — remote listings are 7%.'
      }
      kpis={kpis}
      asOf={snapshot.demand.asOf}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <VColumnChart
          caption="Vacancy · two products"
          columns={[
            {
              id: 'pen-off',
              label: 'Peninsula office',
              value: Number(fact('penOfficeVacancyPct').value),
              display: formatPercent(Number(fact('penOfficeVacancyPct').value)),
              tone: 'vacancy',
            },
            {
              id: 'sv-rd',
              label: 'SV R&D',
              value: Number(fact('svVacancyPct').value),
              display: formatPercent(Number(fact('svVacancyPct').value)),
              tone: 'vacancy',
            },
          ]}
        />
        <StackBar
          caption="Peninsula top 25 mix"
          totalLabel={`Software ${formatFact(fact('penOfficeSoftwarePct'))}`}
          segments={[
            {
              id: 'software',
              label: 'Software',
              sharePct: Number(fact('penOfficeSoftwarePct').value),
              display: formatFact(fact('penOfficeSoftwarePct')),
              tone: 'ai',
            },
            {
              id: 'other',
              label: 'Rest of top 25',
              sharePct: 100 - Number(fact('penOfficeSoftwarePct').value),
              display: `${100 - Number(fact('penOfficeSoftwarePct').value)}%`,
              tone: 'ink',
            },
          ]}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <VColumnChart
          caption="Peninsula asking · monthly FSG"
          columns={[
            {
              id: 'exist',
              label: 'Existing',
              value: Number(fact('penOfficeFsg').value),
              display: formatFact(fact('penOfficeFsg')),
              tone: 'asking',
            },
            {
              id: 'a',
              label: 'Class A',
              value: Number(fact('penOfficeClassAFsg').value),
              display: formatFact(fact('penOfficeClassAFsg')),
              tone: 'asking',
            },
            {
              id: 'b',
              label: 'Class B',
              value: Number(fact('penOfficeClassBFsg').value),
              display: formatFact(fact('penOfficeClassBFsg')),
              tone: 'asking',
            },
          ]}
        />
        <DivergeBar
          caption="Q4 Peninsula absorption"
          label="Net absorption"
          value={Number(fact('penOfficeAbsSf').value)}
          display={signedSf(Number(fact('penOfficeAbsSf').value))}
        />
      </div>
      <StackBar
        caption="San Francisco demand already in"
        totalLabel={`${formatFact(fact('sfOfficeDemandMsf'))} · AI ${formatFact(fact('sfOfficeAiPct'))}`}
        segments={[
          {
            id: 'ai',
            label: 'AI / AI-related',
            sharePct: Number(fact('sfOfficeAiPct').value),
            display: formatFact(fact('sfOfficeAiPct')),
            tone: 'ai',
          },
          {
            id: 'rest',
            label: 'Rest of demand',
            sharePct: 100 - Number(fact('sfOfficeAiPct').value),
            display: `${100 - Number(fact('sfOfficeAiPct').value)}%`,
            tone: 'ink',
          },
        ]}
      />
      <SpokenFacts
        items={[
          `Q4 Peninsula absorption ${formatFact(fact('penOfficeAbsSf'))}. Under construction ${formatFact(fact('penOfficeUcSf'))}. ${formatFact(fact('penOfficeLeasesQ4'))} leases in the quarter.`,
          `Existing ${formatFact(fact('penOfficeFsg'))} · Class A ${formatFact(fact('penOfficeClassAFsg'))} · Class B ${formatFact(fact('penOfficeClassBFsg'))}.`,
          `Demand ±${fact('penOfficeDemandMsf').value} msf / ${formatFact(fact('penOfficeReqs'))} office requirements, ${formatFact(fact('penOfficeDemandSoftwarePct'))} software.`,
          `Remote share of Bay Area tech listings is ${formatFact(fact('baRemoteListingPct'))} (April 2026) versus ${formatFact(fact('baRemoteListingPct2022'))} mid-2022. AI companies largely require full-time in-person.`,
          `AI-related companies are ${formatFact(fact('sfOfficeAiActivityPct'))} of San Francisco office activity since 2023. That is not a bid for every empty Peninsula floor.`,
          `San Francisco demand already in: ${formatFact(fact('sfOfficeDemandMsf'))} active + pending, AI ${formatFact(fact('sfOfficeAiPct'))}, projected absorption ${formatFact(fact('sfProjectedAbsMsf'))}.`,
        ]}
      />
      <PaperChatter
        caption="Chatter · Feb 3"
        ids={['sierra-300k', 'google-pac-shores']}
      />
      <div>
        <p className="mb-2 text-[13px] font-medium text-ink/55">Office comps 30k+ · Q1 2026</p>
        <div className="flex flex-col gap-1.5">
          {comps.map((item) => {
            const asset = item.propertyId ? propertyById(item.propertyId) : undefined
            const on = selectedId === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(on ? null : item.id)}
                className={`flex items-center justify-between gap-3 border px-3 py-2 text-left ${
                  on ? 'border-copper bg-white' : 'border-ink/10 bg-white/50 hover:border-ink/25'
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
                  <span className="ml-2 text-[13px] text-ink/50">
                    {asset ? `${asset.name} · ${asset.city}` : 'Address not restated'}
                  </span>
                </span>
                <span className="shrink-0 text-right tabular text-[14px]">
                  {item.areaLeasedNote ?? formatSf(item.areaLeasedSf, true)}
                  {formatCompRent(item) ? ` · ${formatCompRent(item)}` : ''}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </BriefingRail>
  )
}
