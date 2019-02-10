import { initMap } from './map.js'
import { fetchData } from './network.js'
import { createCountCollections } from './dataFactories.js'

const mapElement = document.querySelector('.map')
const introModal = document.querySelector('#introDialog')
mapElement.innerHTML = "loading map..."   
    
introModal.showModal()

document.querySelector('#introDialogClose').addEventListener('click', () => {
    introModal.close()
})

const showMap = (data) => {    
    const countCollections = createCountCollections(data)
    initMap(mapElement, countCollections)
}

// Initialise
fetchData().then(showMap)

// TODO:
// Error handling
// Browser support
// Testing