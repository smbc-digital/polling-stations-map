import Leaflet from 'leaflet'
import { pollingPopup } from './Popups'

const Configuration = {
    Map: {
        StartingLatLng: [53.413519, -2.085143],
        StartingZoom: 12,
        FullscreenControl: true,
        DisplayLayerControls: true,
        DisplayGrayScale: true,
        DisplayOSOpen: true
    },
    DynamicData: [],
    StaticData: [
    {
        key: 'boundary',
        url: 'http://scnwebdev1.stockport.gov.uk/mapping/layers/boundary.geojson',
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
    },
    {
        key: 'polling',
        url: 'http://scnmapsrv.stockport.gov.uk:8080/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=political:polling_stations&outputFormat=application/json&EPSG:4326&srsName=EPSG:4326',
        layerOptions: {
            onEachFeature: pollingPopup,
            interactive: true,
            maxZoom: 14,
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
]}

export default Configuration