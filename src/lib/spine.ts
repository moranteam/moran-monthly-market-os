import { corridorById, sceneById, snapshot } from '@/data/load'
import type { CameraIntent, SpineId } from '@/data/types'
import {
  BAY_CAMERA,
  LEASING_CAMERA,
  MISSION_BAY_CAMERA,
  PENINSULA_CAMERA,
  VALLEY_CAMERA,
} from '@/lib/mapStyle'

export const spineStops: { id: SpineId; label: string; highway: string }[] = [
  { id: 'mission-bay', label: 'Mission Bay', highway: '101' },
  { id: 'south-sf', label: 'South SF', highway: '101' },
  { id: 'peninsula', label: 'Mid-Peninsula', highway: '101 / 280' },
  { id: 'silicon-valley', label: 'Silicon Valley', highway: '101 / 280' },
]

export function spineForScene(sceneId: string): SpineId {
  const scene = snapshot.scenes.find((entry) => entry.id === sceneId)
  return scene?.spine ?? 'bay'
}

export function cameraForSpine(spine: SpineId): CameraIntent {
  switch (spine) {
    case 'mission-bay':
      return MISSION_BAY_CAMERA
    case 'south-sf': {
      const node = corridorById('south-sf')
      if (!node) return LEASING_CAMERA
      return {
        longitude: node.lng,
        latitude: node.lat,
        zoom: node.zoom,
        pitch: node.pitch,
        bearing: node.bearing,
      }
    }
    case 'peninsula':
      return PENINSULA_CAMERA
    case 'silicon-valley':
      return VALLEY_CAMERA
    case 'bay':
      return BAY_CAMERA
    default: {
      const _exhaustive: never = spine
      return _exhaustive
    }
  }
}

export function firstSceneOnSpine(sceneIds: string[], spine: SpineId) {
  const match = sceneIds.find((id) => {
    try {
      return sceneById(id).spine === spine
    } catch {
      return false
    }
  })
  return match ? sceneIds.indexOf(match) : 0
}
