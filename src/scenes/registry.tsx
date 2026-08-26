import { CoverScene } from '@/scenes/CoverScene'
import { DecisionScene } from '@/scenes/DecisionScene'
import { ExplodingScene } from '@/scenes/ExplodingScene'
import { FundingScene } from '@/scenes/FundingScene'
import { InventoryScene } from '@/scenes/InventoryScene'
import { LeasingScene } from '@/scenes/LeasingScene'
import { MarketsScene } from '@/scenes/MarketsScene'
import { MissionBayScene } from '@/scenes/MissionBayScene'
import { OfficeScene } from '@/scenes/OfficeScene'
import { PowerScene } from '@/scenes/PowerScene'
import { RndScene } from '@/scenes/RndScene'
import type { ReactNode } from 'react'

const sceneIds = [
  'cover',
  'markets',
  'rnd',
  'leasing',
  'office',
  'exploding',
  'power',
  'funding',
  'mission-bay',
  'inventory',
  'decision',
] as const

export type SceneId = (typeof sceneIds)[number]

function isSceneId(id: string): id is SceneId {
  return (sceneIds as readonly string[]).includes(id)
}

function sceneElement(id: SceneId): ReactNode {
  switch (id) {
    case 'cover':
      return <CoverScene />
    case 'markets':
      return <MarketsScene />
    case 'rnd':
      return <RndScene />
    case 'leasing':
      return <LeasingScene />
    case 'office':
      return <OfficeScene />
    case 'exploding':
      return <ExplodingScene />
    case 'power':
      return <PowerScene />
    case 'funding':
      return <FundingScene />
    case 'mission-bay':
      return <MissionBayScene />
    case 'inventory':
      return <InventoryScene />
    case 'decision':
      return <DecisionScene />
    default: {
      const _exhaustive: never = id
      return _exhaustive
    }
  }
}

export function renderScene(id: string) {
  if (!isSceneId(id)) {
    return <div className="p-10 text-paper">Unknown scene</div>
  }
  return sceneElement(id)
}
