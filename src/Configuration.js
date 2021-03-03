import Leaflet from 'leaflet'
import { pollingPopup } from './Popups'

const Configuration = {
  Map: {
    StartingLatLng: [53.3915, -2.125143],
    StartingZoom: 12,
    FullscreenControl: true,
    DisplayLayerControls: true,
    DisplayGrayScale: true,
    DisplayOSOpen: true,
    Class: 'govuk-grid-column-full smbc-map__container'
  },
  DynamicData: [
    {
      key: 'polling',
      url:
        'https://spatial.stockport.gov.uk/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=political:polling_stations&outputFormat=application/json&EPSG:4326&srsName=EPSG:4326',
      layerOptions: {
        onEachFeature: pollingPopup,
        interactive: true,
        maxZoom: 13,
        pointToLayer: (feature, latlng) => {
          return Leaflet.circleMarker(latlng, {
            radius: 8,
            fillColor: '#48BB78',
            color: '#000',
            weight: 1,
            fillOpacity: 1
          })
        }
      }
    }
  ],
  StaticData: [
    {
      key: 'boundary',
      url:
        'https://spatialgeojson.s3-eu-west-1.amazonaws.com/webmapping/boundary.geojson',
      layerOptions: {
        interactive: false,
        maxZoom: 9,
        style: {
          color: '#000000',
          weight: 4,
          opacity: 1,
          fillColor: '#000000',
          fillOpacity: 0
        }
      }
    }
  ]
}

export default Configuration
