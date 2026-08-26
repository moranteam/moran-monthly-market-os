export type LngLat = [number, number]

export const highways: { id: string; name: string; shield: string; path: LngLat[] }[] = [
  {
    id: 'us-101',
    name: 'US 101',
    shield: '101',
    path: [
      [-122.387, 37.79],
      [-122.393, 37.76],
      [-122.405, 37.72],
      [-122.407, 37.655],
      [-122.4, 37.6],
      [-122.33, 37.54],
      [-122.25, 37.48],
      [-122.18, 37.44],
      [-122.1, 37.4],
      [-121.95, 37.36],
      [-121.9, 37.33],
    ],
  },
  {
    id: 'i-280',
    name: 'I-280',
    shield: '280',
    path: [
      [-122.447, 37.732],
      [-122.44, 37.68],
      [-122.42, 37.62],
      [-122.36, 37.54],
      [-122.28, 37.48],
      [-122.2, 37.42],
      [-122.14, 37.36],
      [-122.03, 37.32],
    ],
  },
  {
    id: 'ca-92',
    name: 'CA 92',
    shield: '92',
    path: [
      [-122.5, 37.503],
      [-122.4, 37.508],
      [-122.32, 37.52],
      [-122.26, 37.54],
    ],
  },
  {
    id: 'i-380',
    name: 'I-380',
    shield: '380',
    path: [
      [-122.44, 37.628],
      [-122.4, 37.622],
    ],
  },
  {
    id: 'i-880',
    name: 'I-880',
    shield: '880',
    path: [
      [-122.271, 37.83],
      [-122.268, 37.8],
      [-122.26, 37.76],
      [-122.24, 37.7],
      [-122.2, 37.64],
      [-122.1, 37.56],
      [-122.02, 37.5],
    ],
  },
]

export const highwayGeoJSON = {
  type: 'FeatureCollection' as const,
  features: highways.map((road) => ({
    type: 'Feature' as const,
    properties: { id: road.id, name: road.name, shield: road.shield },
    geometry: {
      type: 'LineString' as const,
      coordinates: road.path,
    },
  })),
}

export const cityLabels: { name: string; lng: number; lat: number }[] = [
  { name: 'San Francisco', lng: -122.4194, lat: 37.7749 },
  { name: 'Mission Bay', lng: -122.3894, lat: 37.7706 },
  { name: 'South San Francisco', lng: -122.407, lat: 37.6547 },
  { name: 'San Mateo', lng: -122.3255, lat: 37.563 },
  { name: 'Redwood City', lng: -122.2364, lat: 37.4852 },
  { name: 'Palo Alto', lng: -122.143, lat: 37.4419 },
  { name: 'Mountain View', lng: -122.0839, lat: 37.3861 },
  { name: 'San Jose', lng: -121.8863, lat: 37.3382 },
  { name: 'Fremont', lng: -121.9886, lat: 37.5485 },
]
