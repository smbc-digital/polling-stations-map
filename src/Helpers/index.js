let target_url

const getTargetUrl = () => {
    if(!target_url){
        target_url = generateTargetUrl()
    }

    return target_url
}

const generateTargetUrl = () => {
    if (window.location.hostname.includes('localhost')) {
        return  'http://localhost:57726'
    }
    else if (window.location.hostname.includes('int'))
    {
        return  'int-dts.smbcdigital.net'
    }
    else if (window.location.hostname.includes('qa'))
    {
        return  'qa-dts.smbcdigital.net'
    }
    else if (window.location.hostname.includes('staging'))
    {
        return  'stage-dts.smbcdigital.net'
    }
    else if (window.location.hostname.includes('prod'))
    {
        return  'myaccount.stockport.gov.uk'
    }
}

const fetchWithTimeout = (url, options, timeout = 10000) => {
    return Promise.race([
        fetch(url,options),
        new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error('Timeout')), timeout)
        })
    ])
}

/**
 * @param {*} circleMarker required
 * @param {*} content required
 */
const createPopup = (circleMarker, content) => {
    /**
     * circleMarker may contain a _latlng property, otherwise we create our own latlng object
     * circleMarker.feature.geometry.coordinates lat lng are reversed, so lat is in position [0][1] and lng is in position [0][0]
     */
    const latlng = circleMarker._latlng || {lat: circleMarker.feature.geometry.coordinates[0][1], lng: circleMarker.feature.geometry.coordinates[0][0]}

    circleMarker.on('click', () => window.LeafletMap.fireEvent('openPopup', { content, latlng } ))
}

export {
    fetchWithTimeout,
    getTargetUrl,
    createPopup
}