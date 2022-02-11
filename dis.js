// map object DONE
// business array
// marker object
// current location object? array? DONE
const myMap = {
coordinates: [],
// this gives map access to coordinates and makes the map where the user is reporting their location
    buildMap(){
    var map = L.map('map', {
center: myMap.coordinates,
zoom: 15,
})
// add tiles to map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '1',
}).addTo(map)
}
}

async function getLocation(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    // return an coordinates in array
    // this seems redundant add get rid of lat and lon variables and put them in the return value.
    return [pos.coords.latitude, pos.coords.longitude]
}




window.onload = async () =>{
    // this makes getLocation output just the coordinates in an array.
coords = await getLocation()
myMap.coordinates = coords
 // [0]lat,[1]lon
myMap.buildMap()

}


