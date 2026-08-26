import cases from './snapshot/cases.json'
import chatter from './snapshot/chatter.json'
import comps from './snapshot/comps.json'
import corridors from './snapshot/corridors.json'
import decisions from './snapshot/decisions.json'
import demand from './snapshot/demand.json'
import facts from './snapshot/facts.json'
import funding from './snapshot/funding.json'
import lenses from './snapshot/lenses.json'
import lifeScienceMarkets from './snapshot/lifeScienceMarkets.json'
import markets from './snapshot/markets.json'
import meta from './snapshot/meta.json'
import missionBay from './snapshot/missionBay.json'
import modes from './snapshot/modes.json'
import oaklandOfficeSubmarkets from './snapshot/oaklandOfficeSubmarkets.json'
import oaklandRndSubmarkets from './snapshot/oaklandRndSubmarkets.json'
import peninsulaOfficeSubmarkets from './snapshot/peninsulaOfficeSubmarkets.json'
import power from './snapshot/power.json'
import previous from './snapshot/previous.json'
import productSpec from './snapshot/productSpec.json'
import properties from './snapshot/properties.json'
import scenes from './snapshot/scenes.json'
import sfSubmarkets from './snapshot/sfSubmarkets.json'
import submarkets from './snapshot/submarkets.json'
import svOfficeSubmarkets from './snapshot/svOfficeSubmarkets.json'
import svRndPipeline from './snapshot/svRndPipeline.json'
import svRndSubmarkets from './snapshot/svRndSubmarkets.json'
import talent from './snapshot/talent.json'
import thesis from './snapshot/thesis.json'
import vacantShells from './snapshot/vacantShells.json'
import type { ChatterItem, Comp, CompSet, Snapshot } from './types'

export const snapshot = {
  meta,
  facts,
  corridors,
  submarkets,
  properties,
  comps,
  funding,
  demand,
  lifeScienceMarkets,
  missionBay,
  productSpec,
  vacantShells,
  thesis,
  talent,
  cases,
  chatter,
  power,
  decisions,
  scenes,
  previous,
  lenses,
  modes,
  markets,
  sfSubmarkets,
  svRndSubmarkets,
  svRndPipeline,
  peninsulaOfficeSubmarkets,
  svOfficeSubmarkets,
  oaklandOfficeSubmarkets,
  oaklandRndSubmarkets,
} as Snapshot

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

export function mayChatter() {
  return snapshot.chatter.filter((item) => item.date === '2026-05')
}

export function compsByIds(ids: string[], share = false) {
  return ids.flatMap((id) => {
    const entry = snapshot.comps.find((item) => item.id === id)
    if (!entry) return []
    if (share && entry.presentationOnly) return []
    return [entry]
  })
}

export function q2OfficeComps(share = false) {
  return compsByIds(
    ['sunday-robotics', 'solace-walnut', 'replit-parkside', 'cooley-broadway', 'orrick-elco', 'applovin-park'],
    share,
  )
}

export function peninsulaFigureComps(share = false) {
  return compsByIds(
    [
      'palantir-hamilton-pen',
      'replit-hillsdale',
      'sunday-walnut-figure',
      'freshfields-main',
      'matic-marsh',
    ],
    share,
  )
}

export function svOfficeFigureComps(share = false) {
  return compsByIds(
    ['panw-scott', 'confidential-augustine', 'mediatek-great-america', 'illumio-scott', 'palantir-hamilton-sv'],
    share,
  )
}

export function sfFigureComps(share = false) {
  return compsByIds(
    [
      'city-sf-1455',
      'anthropic-500-howard',
      'anthropic-405-howard',
      'pwc-405-howard',
      'ripple-battery',
      'planet-harrison',
      'langchain-303',
      'assort-one-market',
    ],
    share,
  )
}

export function oaklandOfficeFigureComps(share = false) {
  return compsBySet('oak-office', share)
}

export function oaklandRndFigureComps(share = false) {
  return compsBySet('oak-rnd', share)
}

export function svRndFigureComps(share = false) {
  return compsBySet('sv-rnd', share)
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
