import { os_open, greyscale, streetLayer } from '../Tiles'
import Leaflet from 'leaflet'

const AddLayerControlsLayers = MapConfig => {
  const controlLayers = {}

  if (MapConfig.DisplayLayerControls) {
    controlLayers['Streets'] = streetLayer

    if (MapConfig.DisplayGrayScale) {
      controlLayers['Grayscale'] = greyscale
    }

    if (MapConfig.DisplayOSOpen) {
      controlLayers['Ordnance survey'] = os_open
    }
  }

  if (Object.keys(controlLayers).length > 1) {
    return controlLayers
  }

  return {}
}

const AddWMSLayers = (Config, overlays, WMSLayerGroup, mapRef) => {
  if (Config.Map.DisplayLayerControls) {
    Object.keys(WMSLayerGroup).map((layer) => {
      const layerDetails = WMSLayerGroup[layer]
      var wmsLayer = new Leaflet.tileLayer.wms(layerDetails.url, layerDetails.layerOptions)
      if(layerDetails.DisplayOverlay){
        overlays[layer] = wmsLayer
      } else {
        wmsLayer.addTo(mapRef)
      }
    })
  } else {
    Object.keys(WMSLayerGroup).map((layer) => {
      const layerDetails = WMSLayerGroup[layer]
      var wmsLayer = new Leaflet.tileLayer.wms(layerDetails.url, layerDetails.layerOptions)
        wmsLayer.addTo(mapRef)
    })
  }
  return overlays
}

const AddLayerControlsOverlays = (Config, DynamicLayerGroup, WMSLayerGroup, mapRef) => {
  let overlays = {}
  if (Config.DynamicData.some(layer => layer.DisplayOverlay) && Config.Map.DisplayLayerControls) {
    Config.DynamicData.map(layer => {
      if (layer.DisplayOverlay) {
        overlays[layer.key] = DynamicLayerGroup[layer.key]
      } else {
        DynamicLayerGroup[layer.key].addTo(mapRef)
      }
    })
  } else {
    Config.DynamicData.map(layer => {
      DynamicLayerGroup[layer.key].addTo(mapRef)
    })
  }

  return AddWMSLayers(Config, overlays, WMSLayerGroup, mapRef)
}

export { AddLayerControlsLayers, AddLayerControlsOverlays }
