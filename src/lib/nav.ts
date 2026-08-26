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
    thesis: 'They have to be here for the talent. They want to be in the office. Vacant LS shells are the AI tour.',
  },
  {
    sceneId: 'thesis',
    title: 'The thesis (LS shells → AI)',
    thesis: '150 Industrial, San Carlos: 230,961 SF former Novartis to a robotics user. Infrastructure was the sale.',
  },
  {
    sceneId: 'leasing',
    title: 'Life science',
    thesis: 'Science raced COVID demand. Demand died. 30.2% vacant. The leftover shells are the inventory.',
  },
  {
    sceneId: 'office',
    title: 'Office',
    thesis: 'Peninsula office is 23.8% vacant. That is not the AI product. Talent still comes in.',
  },
  {
    sceneId: 'product',
    title: 'Product types',
    thesis: 'High-powered AI tenant: 30 W/SF min, prefer 35–50+. That is the sell against vacant LS shells.',
  },
  {
    sceneId: 'talent',
    title: 'AI & talent',
    thesis: 'Bay Area is #1. 57% of listings are AI. Remote is 7%. 80% of U.S. AI VC since 2020.',
  },
  {
    sceneId: 'funding',
    title: 'Funding',
    thesis: 'Q4 $47.42B. 2025 $187.68B. Tech 92.5%. LS is the residual. 80% of AI VC lands here.',
  },
  {
    sceneId: 'mission-bay',
    title: 'Mission Bay',
    thesis: 'Highest SF asking $7.37/sf FSG vs city $5.73/sf FSG. Overflow to Potrero / Dogpatch / Peninsula.',
  },
  {
    sceneId: 'compression',
    title: 'Compression',
    thesis: 'Type sits over the bay. Mission Bay is compressed — overflow is Potrero / Dogpatch / Peninsula.',
  },
  {
    sceneId: 'power',
    title: 'Power',
    thesis: '30 W/SF minimum, prefer 35–50+. Avia/Spur lab is 8 W/USF. 999 Baker is 27 / 40.',
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
