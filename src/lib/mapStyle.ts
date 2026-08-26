import type { StyleSpecification } from 'maplibre-gl'

export const darkSatelliteStyle: StyleSpecification = {
  version: 8,
  name: 'Moran forest satellite',
  glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
  sources: {
    esri: {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      attribution: 'Tiles © Esri',
      maxzoom: 19,
    },
    labels: {
      type: 'raster',
      tiles: ['https://a.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}@2x.png'],
      tileSize: 256,
      attribution: '© CARTO © OSM',
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: 'satellite',
      type: 'raster',
      source: 'esri',
      paint: {
        'raster-saturation': -0.22,
        'raster-contrast': 0.16,
        'raster-brightness-min': 0.04,
        'raster-brightness-max': 0.86,
        'raster-opacity': 1,
      },
    },
    {
      id: 'labels',
      type: 'raster',
      source: 'labels',
      paint: {
        'raster-opacity': 0.12,
      },
    },
  ],
}

/** Map-right briefing: peninsula + SF + East Bay cities fill the pane, not Pacific water. */
export const BAY_CAMERA = {
  longitude: -122.14,
  latitude: 37.54,
  zoom: 9.05,
  bearing: -3,
  pitch: 28,
}

/** Full-bleed aerial: cities sit left; bay / empty land sit right under the scrim. */
export const AERIAL_CAMERA = {
  longitude: -122.08,
  latitude: 37.6,
  zoom: 9.05,
  bearing: 14,
  pitch: 38,
}

export const VALLEY_CAMERA = {
  longitude: -121.98,
  latitude: 37.4,
  zoom: 9.95,
  bearing: 4,
  pitch: 30,
}

export const PENINSULA_CAMERA = {
  longitude: -122.22,
  latitude: 37.5,
  zoom: 10.45,
  bearing: -4,
  pitch: 32,
}

export const MISSION_BAY_CAMERA = {
  longitude: -122.394,
  latitude: 37.768,
  zoom: 13.05,
  bearing: -8,
  pitch: 34,
}

export const LEASING_CAMERA = {
  longitude: -122.3,
  latitude: 37.6,
  zoom: 10.55,
  bearing: -4,
  pitch: 32,
}
