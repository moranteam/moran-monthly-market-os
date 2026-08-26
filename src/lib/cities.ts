export type CityLabel = {
  id: string
  name: string
  lng: number
  lat: number
  minZoom?: number
}

export const cityLabels: CityLabel[] = [
  { id: 'sf', name: 'San Francisco', lng: -122.4194, lat: 37.7749 },
  { id: 'mission-bay', name: 'Mission Bay', lng: -122.389, lat: 37.7705, minZoom: 11 },
  { id: 'south-sf', name: 'South SF', lng: -122.407, lat: 37.6547 },
  { id: 'san-mateo', name: 'San Mateo', lng: -122.3255, lat: 37.563 },
  { id: 'redwood-city', name: 'Redwood City', lng: -122.2364, lat: 37.4852 },
  { id: 'palo-alto', name: 'Palo Alto', lng: -122.143, lat: 37.4419 },
  { id: 'mountain-view', name: 'Mountain View', lng: -122.0839, lat: 37.3861 },
  { id: 'sunnyvale', name: 'Sunnyvale', lng: -122.0363, lat: 37.3688 },
  { id: 'san-jose', name: 'San Jose', lng: -121.8863, lat: 37.3382 },
  { id: 'fremont', name: 'Fremont', lng: -121.9886, lat: 37.5485 },
  { id: 'oakland', name: 'Oakland', lng: -122.2711, lat: 37.8044 },
  { id: 'berkeley', name: 'Berkeley', lng: -122.273, lat: 37.8715 },
]
