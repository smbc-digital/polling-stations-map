const pollingPopup = (feature, circleMarker) => {
  circleMarker.bindPopup(
    `<div class="item location"><h3>Polling Stations</h3></div>
    <div class="item location"><p class="title">Name: ${feature.properties.name}</p></div>
    <div class="item location"><p class="title">Location: ${feature.properties.address}</p></div>`
     )
}

export {
    pollingPopup
}