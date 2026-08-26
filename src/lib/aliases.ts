const aliases: Record<string, string> = {
  corridor: 'markets',
  thesis: 'inventory',
  'silicon-valley': 'rnd',
  'peninsula-demand': 'office',
  talent: 'exploding',
  product: 'power',
  compression: 'mission-bay',
  'sf-demand': 'mission-bay',
  close: 'decision',
}

export function resolveSceneId(id: string | null) {
  if (!id) return null
  return aliases[id] ?? id
}
