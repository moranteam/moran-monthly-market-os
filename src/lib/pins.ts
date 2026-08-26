import { compsBySet, missionBayPinProperties, snapshot, vacantTourProperties } from '@/data/load'
import type { Accent, Comp, MapLayer, MapPin, Property } from '@/data/types'
import { formatCompRent, formatNnn, formatPercent, formatPropertyAsking, formatSf, formatUsd } from '@/lib/format'

const kindAccent: Record<string, Accent> = {
  'life-science': 'cryo',
  office: 'gold',
  institutional: 'copper',
}

export function pinsForLayer(layer: MapLayer, share = false): MapPin[] {
  switch (layer) {
    case 'bay':
    case 'corridor':
    case 'compression':
      return snapshot.corridors.map((corridor) => ({
        id: corridor.id,
        kind: 'corridor' as const,
        lng: corridor.lng,
        lat: corridor.lat,
        index: corridor.index,
        accent: corridor.accent,
        label: corridor.name,
        sublabel: corridor.city,
        fact: corridor.city,
      }))
    case 'silicon-valley':
      return snapshot.submarkets.map((item, index) => ({
        id: item.id,
        kind: 'submarket' as const,
        lng: item.lng,
        lat: item.lat,
        index: index + 1,
        accent: item.q4AbsorptionSf >= 0 ? ('cryo' as const) : ('copper' as const),
        label: item.name,
        sublabel: `${formatPercent(item.vacancyPct)} vacant`,
        fact: `${formatPercent(item.vacancyPct)} vacant · ${formatNnn(item.askingNnn)}`,
      }))
    case 'peninsula':
      return mappableComps(compsBySet('pen-office', share))
    case 'leasing':
      return mappableComps(compsBySet('ls-new', share))
    case 'funding':
      return [
        ...snapshot.funding.namedRounds.map((round, index) => ({
          id: round.id,
          kind: 'round' as const,
          lng: round.lng,
          lat: round.lat,
          index: index + 1,
          accent: 'gold' as const,
          label: round.company,
          sublabel: round.city,
          fact: `${formatUsd(round.amountUsd)} · ${round.city}`,
        })),
        ...mappableCasePins(),
      ]
    case 'mission-bay':
      return missionBayPinProperties().map((item, index) => propertyPin(item, index))
    case 'inventory':
      return vacantTourProperties().map((item, index) => propertyPin(item, index))
    case 'power':
      return snapshot.power.namedPropertyIds.flatMap((id, index) => {
        const property = snapshot.properties.find((item) => item.id === id)
        if (!property) return []
        return [propertyPin(property, index)]
      })
    case 'thesis': {
      const proof = snapshot.properties.find((item) => item.id === 'san-carlos-research')
      return proof ? [propertyPin(proof, 0)] : []
    }
    case 'office':
      return mappableComps(compsBySet('pen-office', share), 'gold')
    case 'product':
      return [...pinsForLayer('thesis', share), ...mappableComps(compsBySet('ls-new', share))]
    case 'talent':
      return pinsForLayer('mission-bay', share)
    default: {
      const _exhaustive: never = layer
      return _exhaustive
    }
  }
}

function occupancyWord(occupancy: Property['occupancy']) {
  if (!occupancy) return null
  switch (occupancy) {
    case 'vacant':
      return 'vacant'
    case 'leased':
      return 'leased'
    case 'partial':
      return 'partial'
    default: {
      const _exhaustive: never = occupancy
      return _exhaustive
    }
  }
}

function propertyFact(item: Property) {
  const parts = [
    item.propertySf ? formatSf(item.propertySf, true) : null,
    item.city,
    occupancyWord(item.occupancy),
    formatPropertyAsking(item),
  ].filter(Boolean)
  return parts.join(' · ')
}

function mappableComps(comps: Comp[], accent: Accent = 'cryo'): MapPin[] {
  return comps.flatMap((comp) => {
    if (!comp.propertyId) return []
    const property = snapshot.properties.find((item) => item.id === comp.propertyId)
    if (!property) return []
    const rent = formatCompRent(comp)
    return [
      {
        id: comp.id,
        kind: 'comp' as const,
        lng: property.lng,
        lat: property.lat,
        index: comp.index,
        accent,
        label: property.name,
        sublabel: comp.tenant,
        fact: [formatSf(comp.areaLeasedSf, true), rent, property.city, occupancyWord(property.occupancy)]
          .filter(Boolean)
          .join(' · '),
      },
    ]
  })
}

function mappableCasePins(): MapPin[] {
  return snapshot.cases.flatMap((entry, index) => {
    const property = snapshot.properties.find((item) => item.id === entry.propertyId)
    if (!property) return []
    return [
      {
        id: entry.id,
        kind: 'property' as const,
        lng: property.lng,
        lat: property.lat,
        index: snapshot.funding.namedRounds.length + index + 1,
        accent: 'copper' as const,
        label: property.name,
        sublabel: property.city,
        fact: propertyFact(property),
      },
    ]
  })
}

function propertyPin(item: Property, index: number): MapPin {
  return {
    id: item.id,
    kind: 'property',
    lng: item.lng,
    lat: item.lat,
    index: index + 1,
    accent: kindAccent[item.kind] ?? 'paper',
    label: item.name,
    sublabel: item.city,
    fact: propertyFact(item),
  }
}

export function twinPins(): MapPin[] {
  const corridors = pinsForLayer('corridor')
  const inventory = pinsForLayer('inventory')
  const rounds = pinsForLayer('funding')
  return [...corridors, ...inventory, ...rounds]
}
