import { CompressionScene } from '@/scenes/CompressionScene'
import { CoverScene } from '@/scenes/CoverScene'
import { DecisionScene } from '@/scenes/DecisionScene'
import { FundingScene } from '@/scenes/FundingScene'
import { InventoryScene } from '@/scenes/InventoryScene'
import { LeasingScene } from '@/scenes/LeasingScene'
import { MissionBayScene } from '@/scenes/MissionBayScene'
import { OfficeScene } from '@/scenes/OfficeScene'
import { PowerScene } from '@/scenes/PowerScene'
import { ProductTypesScene } from '@/scenes/ProductTypesScene'
import { TalentScene } from '@/scenes/TalentScene'
import { ThesisScene } from '@/scenes/ThesisScene'
import type { ReactNode } from 'react'

const sceneIds = [
  'cover',
  'thesis',
  'leasing',
  'office',
  'product',
  'talent',
  'funding',
  'mission-bay',
  'compression',
  'power',
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
    case 'thesis':
      return <ThesisScene />
    case 'leasing':
      return <LeasingScene />
    case 'office':
      return <OfficeScene />
    case 'product':
      return <ProductTypesScene />
    case 'talent':
      return <TalentScene />
    case 'funding':
      return <FundingScene />
    case 'mission-bay':
      return <MissionBayScene />
    case 'compression':
      return <CompressionScene />
    case 'inventory':
      return <InventoryScene />
    case 'power':
      return <PowerScene />
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
