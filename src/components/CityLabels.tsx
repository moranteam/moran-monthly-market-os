import { cityLabels } from '@/lib/cities'
import { usePresenter } from '@/state/presenter'
import { Marker } from 'react-map-gl/maplibre'

export function CityLabels() {
  const { camera } = usePresenter()

  return (
    <>
      {cityLabels.map((city) => {
        if (city.minZoom && camera.zoom < city.minZoom) return null
        if (camera.zoom > 13.2 && !city.minZoom) return null
        return (
          <Marker key={city.id} longitude={city.lng} latitude={city.lat} anchor="center">
            <span className="city-label pointer-events-none">{city.name}</span>
          </Marker>
        )
      })}
    </>
  )
}
