import Leaflet from 'leaflet'
import mabpoxGL from 'mapbox-gl-leaflet' // eslint-disable-line no-unused-vars
const token = 'pk.eyJ1IjoiZWxlbmFzZWNhcmEiLCJhIjoiY2s1Y2lzZjEwMDI2ZjNmczAzcjk2dDcycCJ9.zDwGfFIaIaG6pKT8FGPnLw'

const greyscale = Leaflet.mapboxGL({
    style: 'mapbox://styles/elenasecara/ck5cijptu06ku1cqsnhncjxzr',
    accessToken: token,
    id: 'mapbox.light',
    maxZoom:20
})

const os_open = Leaflet.mapboxGL({
    style: 'mapbox://styles/elenasecara/ck5cij7yv4nf01dpsvyfvy5vt',
    accessToken: token,
    id: 'mapbox.open',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20
})

const streetLayer = Leaflet.mapboxGL({
    style: 'mapbox://styles/elenasecara/ck5cij7yv4nf01dpsvyfvy5vt',
    accessToken: token,
    id: 'mapbox.street',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20
})

export {
    greyscale,
    os_open,
    streetLayer
}