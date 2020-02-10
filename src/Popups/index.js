const pollingPopup = (feature, circleMarker) => {
  circleMarker.bindPopup(
    `<div class="item">
      <i class="tag fa fa-info"></i><p class="title">Name</p>
      <p class="info">${feature.properties.name}</p>
      <i class="tag fa fa-map-marker"></i><p class="title">Location</p>
      <p class="info">${feature.properties.address}</p>
    </div>`
  )
}

export {
    pollingPopup
}