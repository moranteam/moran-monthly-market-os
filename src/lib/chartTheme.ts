export type ChartTone = 'ink' | 'ai' | 'vacancy' | 'asking' | 'muted'

export type ChartLegendItem = {
  tone: ChartTone
  label: string
}

export const chartMeaning: Record<ChartTone, string> = {
  ink: 'Baseline / citywide',
  ai: 'AI / demand',
  vacancy: 'Vacancy / risk',
  asking: 'Asking / rent',
  muted: 'Owner / occupier',
}

export function chartHex(tone: ChartTone) {
  switch (tone) {
    case 'ink':
      return '#2c312f'
    case 'ai':
      return '#1b6b4a'
    case 'vacancy':
      return '#c9892e'
    case 'asking':
      return '#5c6d75'
    case 'muted':
      return '#8a7d6c'
    default: {
      const _exhaustive: never = tone
      return _exhaustive
    }
  }
}

export function uniqueLegend(items: ChartLegendItem[]) {
  const seen = new Set<ChartTone>()
  return items.filter((item) => {
    if (seen.has(item.tone)) return false
    seen.add(item.tone)
    return true
  })
}
