import React, { useRef, useEffect, useState, useCallback } from 'react'
import Leaflet from 'leaflet'
import fetchWithTimeout from './Helpers'
import Config from './Configuration.js'
import { streetLayer } from './Tiles'
import { AddLayerControlsLayers, AddLayerControlsOverlays } from './Controls'

function App() {
  const mapRef = useRef()
  const [ layers, setLayers ] = useState([])
  const StaticLayerGroup = {}
  const WMSLayerGroup = {}
  const DynamicLayerGroup = Config.DynamicData.reduce((accumulator, currentValue) => {
    accumulator[currentValue.key] = new Leaflet.FeatureGroup()
    return accumulator
  }, {})

  useEffect(() => {
    mapRef.current = Leaflet.map('map', {
      preferCanvas: true,
      minZoom: 12,
      fullscreenControl: Config.Map.FullscreenControl || false,
      layers: [
        streetLayer
      ]
    }).setView(Config.Map.StartingLatLng || [53.413519, -2.085143], Config.Map.StartingZoom || 12)

    AddStaticLayers()
    AddDynamicLayers()
    AddLayerControls()
    
  }, [])

  const AddLayerControls = () => {
    const controlLayers = AddLayerControlsLayers(Config.Map)
    const overlays = AddLayerControlsOverlays(Config, DynamicLayerGroup, WMSLayerGroup, mapRef.current)

    if(Config.Map.DisplayLayerControls){
      Leaflet.control
        .layers(controlLayers, overlays)
        .addTo(mapRef.current)
    }
  }

  const AddDynamicLayers = async () => {
     await Promise.all(Config.DynamicData.map(async (layer) => {
        if(layer.url.endsWith('wms?')){
          WMSLayerGroup[layer.key] = layer
        } else {
          const url = layer.url.replace('{0}', mapRef.current.getBounds().toBBoxString())
          await fetchDynamicData(layer.key,url, layer.layerOptions)
        }
      }))
      
      updateLayers()
  }

  const AddStaticLayers = async () => {
    await Promise.all(Config.StaticData.map(async (layer) => {
        await fetchStaticData(layer.key,layer.url, layer.layerOptions)
    }))
      Config.StaticData.map((layer) => {
        if(mapRef.current.getZoom() > layers[layer.key].options.maxZoom){
          StaticLayerGroup[layer.key] = new Leaflet.FeatureGroup()
          StaticLayerGroup[layer.key].addLayer(layers[layer.key]).addTo(mapRef.current)
        }
      })
  }

  const updateLayers = () => {
      Object.keys(DynamicLayerGroup).map((layer) => {
        DynamicLayerGroup[layer].clearLayers()
        if(layers[layer] !== undefined && layers[layer].displayMarkers){
          DynamicLayerGroup[layer].addLayer(layers[layer])
        }
      })

      Object.keys(StaticLayerGroup).map((layer) => {
        StaticLayerGroup[layer].clearLayers()
      })

      Config.StaticData.map((layer) => {
        if(mapRef.current.getZoom() > layers[layer.key].options.maxZoom){
          StaticLayerGroup[layer.key] = new Leaflet.FeatureGroup()
          StaticLayerGroup[layer.key].addLayer(layers[layer.key]).addTo(mapRef.current)
        }
      })
  }

  const handleMapMove = useCallback(async () => {
    await AddDynamicLayers()
  }, [])

  useEffect(() => {
      mapRef.current.addEventListener('moveend', handleMapMove)

      return () => {
        mapRef.current.removeEventListener('moveend', handleMapMove)
      }
    }, [handleMapMove])

  const fetchDynamicData = async (key, url, layerOptions) => {
    if(mapRef.current.getZoom() > layerOptions.maxZoom){
      const response = await fetchWithTimeout(url)
      const body = await response.json()
      const layer = Leaflet.geoJson(body, layerOptions)
      layer.displayMarkers = true
      setLayers([...layers, layers[key] = layer])
    } 
    else {
      const layer = {}
      layer.displayMarkers = false
      setLayers([...layers, layers[key] = layer])
    }
  }

  const fetchStaticData = async (key, url, layerOptions) => {
    const response = await fetchWithTimeout(url)
    const body = await response.json()
    const layer = Leaflet.geoJson(body, layerOptions)
    setLayers([...layers, layers[key] = layer])
  }

  return (
    <div id="map"/>
  )
}

export default App