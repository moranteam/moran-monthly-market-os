const aliases: Record<string, string> = {
  corridor: 'thesis',
  'silicon-valley': 'office',
  'peninsula-demand': 'office',
  exploding: 'talent',
  'sf-demand': 'compression',
  close: 'decision',
}

export function resolveSceneId(id: string | null) {
  if (!id) return null
  return aliases[id] ?? id
}
