import { BriefingRail, SpokenFacts } from '@/components/BriefingRail'
import { NamedRoundChart } from '@/components/charts/NamedRoundChart'
import { fact, snapshot } from '@/data/load'
import { kpisFor } from '@/lib/kpis'
import { formatFact, formatUsd } from '@/lib/format'
import { PENINSULA_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function ExplodingScene() {
  const { selectedId, setSelectedId, setCamera, takeaway, lens } = usePresenter()
  const round = snapshot.funding.namedRounds.find((item) => item.id === selectedId)
  const study = snapshot.cases.find((item) => item.id === selectedId)
  const studyProperty = study
    ? snapshot.properties.find((item) => item.id === study.propertyId)
    : undefined
  const kpis = kpisFor('exploding', lens).map((item) => ({ fact: fact(item.factId), icon: item.icon }))

  useEffect(() => {
    setCamera({ ...PENINSULA_CAMERA, latitude: 37.48, zoom: 10.1 })
  }, [setCamera])

  useEffect(() => {
    if (round) {
      setCamera({
        longitude: round.lng,
        latitude: round.lat,
        zoom: 12.4,
        pitch: 48,
        bearing: -8,
      })
      return
    }
    if (!studyProperty) return
    setCamera({
      longitude: studyProperty.lng,
      latitude: studyProperty.lat,
      zoom: 13,
      pitch: 48,
      bearing: -8,
    })
  }, [round, setCamera, studyProperty])

  return (
    <BriefingRail
      kicker="AI / exploding industries"
      emoji="📊"
      title="Named checks, and a robotics box."
      thesis={takeaway ?? 'Named Peninsula rounds plus 230,961 SF at San Carlos Research Center.'}
      kpis={kpis}
    >
      <NamedRoundChart rounds={snapshot.funding.namedRounds} active tone="paper" />
      <div className="flex flex-wrap gap-2">
        {snapshot.funding.namedRounds.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
            className={`border px-3 py-1.5 text-[14px] ${
              selectedId === item.id ? 'border-copper bg-white text-ink' : 'border-ink/15 text-ink/70'
            }`}
          >
            {item.company} · {formatUsd(item.amountUsd)}
          </button>
        ))}
      </div>
      {snapshot.cases.map((entry) => (
        <button
          key={entry.id}
          type="button"
          onClick={() => setSelectedId(selectedId === entry.id ? null : entry.id)}
          className={`border p-3 text-left ${
            selectedId === entry.id ? 'border-copper bg-white' : 'border-ink/10 bg-white/40'
          }`}
        >
          <p className="text-[13px] font-medium tracking-[0.12em] text-copper uppercase">Robotics case</p>
          <p className="mt-1 font-display text-[24px] leading-tight text-ink">{entry.hed}</p>
          <p className="mt-2 text-[16px] text-ink/75">{entry.dek}</p>
          <p className="mt-2 tabular text-[15px] text-ink">{formatFact(fact(entry.factId))}</p>
        </button>
      ))}
      <SpokenFacts
        items={[
          'humans& — $480M seed, Redwood City. ClickHouse — $400M Series D, Mountain View. PaleBlueDot — $150M Series B, Palo Alto.',
          'The same names keep showing up: YC, a16z, Lightspeed, Sequoia.',
          '230,961 SF former Novartis / San Carlos Research Center to a humanoid-robotics user.',
          round ? round.note : 'Click a round. The map flies to the city.',
        ]}
      />
    </BriefingRail>
  )
}
