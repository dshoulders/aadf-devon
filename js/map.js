import { NEtoLL, radToDeg } from './coords.js'
import { createChart, createSeries, addSeries } from './chart.js'
import { showDialog } from './dialog.js'

const mapStyles = [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ]

const onMarkerClick = (countCollection) => {

    const dialogElement = showDialog(countCollection)
    const chartElement = dialogElement.querySelector('#chart')

    // create a chart series from the data 
    const newChartSeries = createSeries(countCollection)

    // add to any existing series
    addSeries(newChartSeries)
    
    // bind a new chart to the element inside the dialog
    createChart(chartElement)
}

const createMarker = (countCollection, map) => {

    // convert easting/northing to lat/lon
    const geo = NEtoLL(countCollection.easting, countCollection.northing)
    const lat = radToDeg(geo.latitude)
    const lon = radToDeg(geo.longitude)

    const latLng = new google.maps.LatLng(lat,lon)

    return new google.maps.Marker({
        position: latLng,
        map: map
    })
}

const clusterMarkers = (map, markers) => new MarkerClusterer(map, markers, {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
})

export const initMap = (element, countCollections) => {

    const map = new google.maps.Map(element, {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        styles: mapStyles,
    })

    const bounds = new google.maps.LatLngBounds()

    const markers = countCollections.map(countCollection => {

        const marker = createMarker(countCollection, map)

        marker.addListener('click', () => onMarkerClick(countCollection))

        bounds.extend(marker.position)

        return marker
    })

    clusterMarkers(map, markers)

    map.fitBounds(bounds)
}
