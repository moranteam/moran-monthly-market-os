import { AerialPanel } from '@/components/AerialPanel'
import { PhotoPlate } from '@/components/PhotoPlate'
import { StackBar } from '@/components/charts/StackBar'
import { VColumnChart } from '@/components/charts/VColumnChart'
import { fact, missionBayPinProperties, snapshot } from '@/data/load'
import { formatFact, formatPropertyAsking, formatSf, monthlyFromFact } from '@/lib/format'
import { AERIAL_CAMERA } from '@/lib/mapStyle'
import { usePresenter } from '@/state/presenter'
import { useEffect } from 'react'

export function CompressionScene() {
  const { setCamera, takeaway, setSelectedId, selectedId } = usePresenter()
  const ai = Number(fact('sfOfficeAiPct').value ?? 0)
  const remainder = Math.max(0, 100 - ai)
  const pins = missionBayPinProperties()

  useEffect(() => {
    setCamera({ ...AERIAL_CAMERA })
  }, [setCamera])

  return (
    <AerialPanel
      kicker="Compression"
      title="Compression on the waterfront."
      dek={
        takeaway ??
        'Mission Bay is the tightest SF office print. Overflow is Potrero, Dogpatch, and the Peninsula — not more type on the city.'
      }
      asOf={snapshot.meta.asOfLabel}
    >
      <div className="rounded-sm bg-paper px-3 py-3 text-ink">
        <VColumnChart
          caption="Asking · monthly FSG"
          columns={[
            {
              id: 'mb',
              label: 'Mission Bay',
              value: monthlyFromFact(fact('mbChinaBasinAsking')),
              display: formatFact(fact('mbChinaBasinAsking')),
              tone: 'asking',
            },
            {
              id: 'city',
              label: 'SF city',
              value: monthlyFromFact(fact('sfOfficeAsking')),
              display: formatFact(fact('sfOfficeAsking')),
              tone: 'ink',
            },
          ]}
        />
        <div className="mt-3">
        <StackBar
          caption="8.1 msf SF office demand · industry mix"
          totalLabel={`${formatFact(fact('sfOfficeDemandMsf'))} · AI ${formatFact(fact('sfOfficeAiPct'))}`}
          segments={[
            {
              id: 'ai',
              label: 'AI / AI-related',
              sharePct: ai,
              display: formatFact(fact('sfOfficeAiPct')),
              tone: 'ai',
            },
            {
              id: 'other',
              label: 'All other industries',
              sharePct: remainder,
              display: `${remainder}%`,
              tone: 'ink',
            },
          ]}
        />
        </div>
      </div>
      <p className="text-[14px] leading-snug text-paper/90">
        Highest SF asking {formatFact(fact('mbChinaBasinAsking'))} vs city {formatFact(fact('sfOfficeAsking'))}.
        LS vacancy {formatFact(fact('mbLsVacancyPct'))}.
      </p>
      <ul className="space-y-1.5">
        <li className="border-l-2 border-gold/80 pl-3 text-[14px] leading-snug text-paper/88">
          {snapshot.missionBay.overflow}
        </li>
        <li className="border-l-2 border-gold/80 pl-3 text-[14px] leading-snug text-paper/88">
          Projected net absorption {formatFact(fact('sfProjectedAbsMsf'))}, of which AI{' '}
          {formatFact(fact('sfProjectedAiAbsMsf'))}.
        </li>
        <li className="border-l-2 border-gold/80 pl-3 text-[14px] leading-snug text-paper/88">
          1450 Owens is the vacant cold-shell tour. NVIDIA at Mission Rock is reported chatter, not a signed-comp row.
        </li>
      </ul>
      <div className="grid grid-cols-2 gap-2">
        {pins.map((item) => {
          const asking = formatPropertyAsking(item)
          const on = selectedId === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(on ? null : item.id)}
              className={`flex gap-2 border p-1.5 text-left ${
                on ? 'border-gold bg-paper/15' : 'border-paper/20 bg-forest/30'
              }`}
            >
              <PhotoPlate
                name={item.name}
                address={item.address}
                city={item.city}
                photoUrl={item.photoUrl}
                className="h-14 w-14"
              />
              <span className="min-w-0">
                <span className="block truncate text-[12px] font-medium text-paper">{item.name}</span>
                <span className="block truncate text-[11px] text-paper/65">
                  {item.propertySf ? formatSf(item.propertySf, true) : item.city}
                  {asking ? ` · ${asking}` : ''}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </AerialPanel>
  )
}
