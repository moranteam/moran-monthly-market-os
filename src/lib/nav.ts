import { snapshot } from '@/data/load'

export type NavItem = {
  sceneId: string
  title: string
  thesis: string
}

const catalog: NavItem[] = [
  {
    sceneId: 'cover',
    title: 'Overview',
    thesis: 'Agenda: R&D, life science, office, exploding industries, funding, Mission Bay.',
  },
  {
    sceneId: 'markets',
    title: 'Markets map',
    thesis: 'Four overlays only — San Francisco, SF Peninsula, Silicon Valley, East Bay.',
  },
  {
    sceneId: 'rnd',
    title: 'SV R&D',
    thesis: '135.2 msf. 13.3% vacant. +519k in Q2. Asking $2.84/sf NNN.',
  },
  {
    sceneId: 'leasing',
    title: 'Life science',
    thesis: 'Science raced COVID demand. Demand died. 30.2% vacant. The leftover shells are the inventory.',
  },
  {
    sceneId: 'office',
    title: 'Office',
    thesis: 'Peninsula office is 24.9% vacant. SF is 29.2%. That is not the AI product.',
  },
  {
    sceneId: 'exploding',
    title: 'Exploding / AI',
    thesis: 'AI is 1.1 msf of 4.0 msf Peninsula TIMS. They want to be in the office.',
  },
  {
    sceneId: 'power',
    title: 'Power blueprint',
    thesis: '30 W/SF minimum, prefer 35–50+. That is the sell against vacant LS shells.',
  },
  {
    sceneId: 'funding',
    title: 'Funding',
    thesis: 'Q4 $47.42B. 2025 $187.68B. Tech 92.5%. 80% of AI VC lands here.',
  },
  {
    sceneId: 'mission-bay',
    title: 'Mission Bay',
    thesis: '17.0% vacant. $9.33/sf FSG. 1450 Owens is the tour. Overflow to Potrero / Dogpatch / Peninsula.',
  },
  {
    sceneId: 'inventory',
    title: 'Live inventory',
    thesis: 'Vacant new-construction LS shells plus 1450 Owens. 150 Industrial is closed. Mission Rock B is signed.',
  },
  {
    sceneId: 'decision',
    title: 'Decision',
    thesis: 'What do you tour, convert, or lend against — and does it already have the MEP?',
  },
]

export function navItemsFor(sceneIds: string[]): NavItem[] {
  return catalog.filter((item) => sceneIds.includes(item.sceneId))
}

export function navItem(sceneId: string): NavItem | undefined {
  const fromCatalog = catalog.find((item) => item.sceneId === sceneId)
  if (fromCatalog) return fromCatalog
  const scene = snapshot.scenes.find((entry) => entry.id === sceneId)
  if (!scene) return undefined
  return {
    sceneId,
    title: scene.navTitle ?? scene.title,
    thesis: scene.navThesis ?? scene.title,
  }
}
