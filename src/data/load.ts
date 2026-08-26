import raw from './snapshot.json'
import type { ChatterItem, Comp, CompSet, Snapshot } from './types'

export const snapshot = raw as Snapshot

export function isShareMode(mode: string) {
  return mode === 'share' || mode === 'leave'
}

export function fact(id: string) {
  const item = snapshot.facts[id]
  if (!item) {
    throw new Error(`Missing snapshot fact: ${id}`)
  }
  return item
}

export function sceneById(id: string) {
  const scene = snapshot.scenes.find((entry) => entry.id === id)
  if (!scene) {
    throw new Error(`Missing snapshot scene: ${id}`)
  }
  return scene
}

export function propertyById(id: string | undefined) {
  if (!id) return undefined
  return snapshot.properties.find((entry) => entry.id === id)
}

export function chatterProperty(entry: ChatterItem) {
  return propertyById(entry.propertyId)
}

export function vacantOverbuildShells() {
  return snapshot.vacantShells.filter((item) => item.role === 'overbuild')
}

export function leasingContrastShells() {
  return snapshot.vacantShells.filter((item) => item.role === 'contrast')
}

export function vacantTourProperties() {
  return snapshot.properties.filter((item) => item.occupancy === 'vacant')
}

export function missionBayPinProperties() {
  return snapshot.missionBay.pinPropertyIds.flatMap((id) => {
    const property = propertyById(id)
    return property ? [property] : []
  })
}

export function compsForProperty(propertyId: string) {
  return snapshot.comps.filter((entry) => entry.propertyId === propertyId)
}

export function compsBySet(set: CompSet, share = false) {
  return snapshot.comps.filter((entry) => {
    if (entry.set !== set) return false
    if (share && entry.presentationOnly) return false
    return true
  })
}

export function visibleComps(share = false): Comp[] {
  return snapshot.comps.filter((entry) => !(share && entry.presentationOnly))
}

export function factAsOf(item: Snapshot['facts'][string]) {
  if (item.asOf) return item.asOf
  if (item.vintage === 'power') return snapshot.meta.powerAsOfLabel
  if (item.vintage === 'talent') return 'Aug 2026 · Scoring Tech Talent'
  return snapshot.meta.marketAsOfLabel
}

export function previousValue(factId: string) {
  if (!Object.hasOwn(snapshot.previous, factId)) return null
  return snapshot.previous[factId]
}

export function corridorById(id: string) {
  return snapshot.corridors.find((entry) => entry.id === id)
}

export function powerNodes() {
  const buildings = Number(fact('powerBuildings').value ?? 0)
  const tier01 = Number(fact('powerTier01').value ?? 0)
  return Array.from({ length: buildings }, (_, index) => {
    const id = `power-${String(index + 1).padStart(2, '0')}`
    const isTier = index < tier01
    return {
      id,
      tier: isTier ? '0-1' : 'other',
      label: isTier ? 'Tier 0–1 · name withheld in working file' : 'Working-layer site · name withheld',
    }
  })
}
