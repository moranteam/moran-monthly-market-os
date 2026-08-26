import { fact, missionBayPinProperties, snapshot, vacantTourProperties } from '@/data/load'
import type { Accent, MapLayer, MapPin, Property } from '@/data/types'
import { formatFact, formatPropertyAsking, formatSf, formatUsd } from '@/lib/format'

const kindAccent: Record<string, Accent> = {
  'life-science': 'cryo',
  office: 'gold',
  institutional: 'copper',
}

export function pinsForLayer(layer: MapLayer, _share = false): MapPin[] {
  switch (layer) {
    case 'bay':
    case 'markets':
    case 'office':
    case 'rnd':
    case 'exploding':
    case 'corridor':
    case 'silicon-valley':
    case 'peninsula':
    case 'product':
    case 'talent':
    case 'compression':
      return marketPins()
    case 'leasing':
      return marketPins()
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
    default: {
      const _exhaustive: never = layer
      return _exhaustive
    }
  }
}

function marketPins(): MapPin[] {
  return snapshot.markets.map((market, index) => {
    const vacancy = safeFact(market.officeVacFact)
    const asking = safeFact(market.officeAskFact)
    return {
      id: market.id,
      kind: 'market' as const,
      lng: market.lng,
      lat: market.lat,
      index: index + 1,
      accent: market.role === 'core' ? ('cryo' as const) : ('gold' as const),
      label: market.name,
      sublabel: [vacancy ? formatFact(vacancy) : null, asking ? formatFact(asking) : null]
        .filter(Boolean)
        .join(' · '),
      fact: market.line,
      calloutDx: market.calloutDx,
      calloutDy: market.calloutDy,
    }
  })
}

function safeFact(id: string | null) {
  if (!id) return null
  try {
    return fact(id)
  } catch {
    return null
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
  return [...marketPins(), ...pinsForLayer('inventory'), ...pinsForLayer('funding')]
}
