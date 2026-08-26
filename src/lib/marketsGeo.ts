type Ring = [number, number][]

function polygon(coords: Ring) {
  return {
    type: 'Polygon' as const,
    coordinates: [[...coords, coords[0]]],
  }
}

export const marketPolygons = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: { id: 'san-francisco', color: '#1a4a6e' },
      geometry: polygon([
        [-122.52, 37.81],
        [-122.36, 37.81],
        [-122.36, 37.71],
        [-122.52, 37.71],
      ]),
    },
    {
      type: 'Feature' as const,
      properties: { id: 'peninsula', color: '#1b6b4a' },
      geometry: polygon([
        [-122.48, 37.7],
        [-122.22, 37.7],
        [-122.12, 37.42],
        [-122.48, 37.45],
      ]),
    },
    {
      type: 'Feature' as const,
      properties: { id: 'silicon-valley', color: '#c9892e' },
      geometry: polygon([
        [-122.2, 37.48],
        [-121.72, 37.48],
        [-121.72, 37.22],
        [-122.2, 37.28],
      ]),
    },
    {
      type: 'Feature' as const,
      properties: { id: 'east-bay', color: '#8a4a32' },
      geometry: polygon([
        [-122.35, 37.9],
        [-122.05, 37.9],
        [-121.95, 37.62],
        [-122.32, 37.7],
      ]),
    },
  ],
}

export const ucsfCampus = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: {},
      geometry: polygon([
        [-122.396, 37.768],
        [-122.388, 37.768],
        [-122.388, 37.762],
        [-122.396, 37.762],
      ]),
    },
  ],
}

export const universities = [
  { id: 'stanford', name: 'Stanford', lng: -122.1697, lat: 37.4275 },
  { id: 'ucsf', name: 'UCSF', lng: -122.3905, lat: 37.763 },
  { id: 'berkeley', name: 'UC Berkeley', lng: -122.2585, lat: 37.8719 },
]

export const clusterLayers = new Set([
  'bay',
  'markets',
  'office',
  'leasing',
  'rnd',
  'exploding',
])
