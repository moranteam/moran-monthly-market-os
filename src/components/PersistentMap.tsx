import { CityLabels } from '@/components/CityLabels'
import { MapCallout } from '@/components/MapCallout'
import type { MapPin } from '@/data/types'
import { highwayGeoJSON } from '@/lib/geo'
import { darkSatelliteStyle } from '@/lib/mapStyle'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePresenter } from '@/state/presenter'
import { Layer, Map, Marker, Source } from 'react-map-gl/maplibre'
import { useEffect, useRef } from 'react'
import type { MapRef } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

type PersistentMapProps = {
  pins: MapPin[]
  onPinClick?: (id: string) => void
}

export function PersistentMap({ pins, onPinClick }: PersistentMapProps) {
  const { camera, veil, selectedId } = usePresenter()
  const reduced = useReducedMotion()
  const mapRef = useRef<MapRef>(null)

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    map.flyTo({
      center: [camera.longitude, camera.latitude],
      zoom: camera.zoom,
      bearing: camera.bearing,
      pitch: camera.pitch,
      duration: reduced ? 0 : 1600,
      essential: true,
    })
  }, [camera, reduced])

  return (
    <div className="absolute inset-0 h-full w-full">
      <Map
        ref={mapRef}
        mapStyle={darkSatelliteStyle}
        initialViewState={camera}
        attributionControl={{ compact: true }}
        dragRotate
        keyboard={false}
        reuseMaps
        style={{ width: '100%', height: '100%' }}
      >
        <Source id="highways" type="geojson" data={highwayGeoJSON}>
          <Layer
            id="highway-glow"
            type="line"
            paint={{
              'line-color': '#f4f1e8',
              'line-width': 4,
              'line-opacity': 0.18,
              'line-blur': 2,
            }}
          />
          <Layer
            id="highway-core"
            type="line"
            paint={{
              'line-color': '#f4f1e8',
              'line-width': 1.15,
              'line-opacity': 0.72,
            }}
          />
        </Source>
        <CityLabels />
        {pins.map((pin) => (
          <Marker key={pin.id} longitude={pin.lng} latitude={pin.lat} anchor="center">
            <MapCallout
              pin={pin}
              active={selectedId === pin.id}
              onClick={() => onPinClick?.(pin.id)}
            />
          </Marker>
        ))}
      </Map>
      <div className="vignette absolute inset-0" />
      <div className="absolute inset-0 bg-forest" style={{ opacity: veil * 0.38 }} />
    </div>
  )
}
