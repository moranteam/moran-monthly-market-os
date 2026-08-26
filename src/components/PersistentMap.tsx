import { CityLabels } from '@/components/CityLabels'
import { CompanyMark } from '@/components/CompanyMark'
import { MapCallout } from '@/components/MapCallout'
import type { MapPin } from '@/data/types'
import { highways, highwayGeoJSON } from '@/lib/geo'
import { clusterLayers, marketPolygons, ucsfCampus, universities } from '@/lib/marketsGeo'
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
  const { camera, veil, selectedId, mapLayer } = usePresenter()
  const reduced = useReducedMotion()
  const mapRef = useRef<MapRef>(null)
  const showClusters = clusterLayers.has(mapLayer)
  const showCampus = mapLayer === 'mission-bay'

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
        {showClusters ? (
          <Source id="markets" type="geojson" data={marketPolygons}>
            <Layer
              id="market-fill"
              type="fill"
              paint={{
                'fill-color': ['get', 'color'],
                'fill-opacity': 0.26,
              }}
            />
            <Layer
              id="market-line"
              type="line"
              paint={{
                'line-color': ['get', 'color'],
                'line-width': 2.2,
                'line-opacity': 0.88,
              }}
            />
          </Source>
        ) : null}
        {showCampus ? (
          <Source id="ucsf-campus" type="geojson" data={ucsfCampus}>
            <Layer
              id="ucsf-fill"
              type="fill"
              paint={{
                'fill-color': '#5ad4d4',
                'fill-opacity': 0.22,
              }}
            />
            <Layer
              id="ucsf-line"
              type="line"
              paint={{
                'line-color': '#5ad4d4',
                'line-width': 2,
                'line-opacity': 0.9,
              }}
            />
          </Source>
        ) : null}
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
        {highways.map((road) => {
          const mid = road.path[Math.floor(road.path.length / 2)]
          return (
            <Marker key={road.id} longitude={mid[0]} latitude={mid[1]} anchor="center">
              <span className="pointer-events-none flex h-6 min-w-6 items-center justify-center rounded-sm border-2 border-paper bg-[#16306c] px-1 text-[11px] font-bold text-paper shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                {road.shield}
              </span>
            </Marker>
          )
        })}
        {showClusters || showCampus
          ? universities
              .filter((item) => (showCampus ? item.id === 'ucsf' : true))
              .map((item) => (
                <Marker key={item.id} longitude={item.lng} latitude={item.lat} anchor="center">
                  <span className="pointer-events-none flex items-center gap-1 rounded-sm border border-paper/45 bg-[#06110e]/90 px-1.5 py-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
                    <CompanyMark name={item.name} size="sm" />
                    <span className="text-[11px] font-medium text-paper">{item.name}</span>
                  </span>
                </Marker>
              ))
          : null}
        {pins.map((pin) => (
          <Marker key={pin.id} longitude={pin.lng} latitude={pin.lat} anchor="center">
            <MapCallout
              pin={pin}
              active={selectedId === pin.id}
              onClick={() => onPinClick?.(pin.id)}
              cameraLng={camera.longitude}
              cameraLat={camera.latitude}
            />
          </Marker>
        ))}
      </Map>
      <div className="vignette absolute inset-0" />
      <div className="absolute inset-0 bg-forest" style={{ opacity: veil * 0.38 }} />
    </div>
  )
}
