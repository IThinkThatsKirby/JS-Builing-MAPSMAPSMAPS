// map object DONE w/Marker for current location
// business array
// marker object 
// current location object? array? DONE
let userCoords = []
let businesses = []
let business = []
let map = {} 

// business[]. geocodes main latitude/longitude
// add business markers
//makes the map where the user is reporting their location
function buildMap(){
map = L.map('map', {
center: userCoords,
zoom: 15,
})
// add tiles to map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '1',
}).addTo(map)
// add marker here
var greenIcon = L.icon({
    iconUrl: 'leaf-green.png',
    shadowUrl: 'leaf-shadow.png',
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})
var youAreHere = L.marker(userCoords,{icon: greenIcon}).addTo(map) // IT WORKED FIRST TIME :D
youAreHere.bindPopup('You Are Here !!').openPopup();
setTimeout(() => { // this closes the popup after 5 seconds
    youAreHere.bindPopup('You Are Here !!').closePopup();
}, 5000);
}
async function getLocation(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    // return an coordinates in array
    // this seems redundant add get rid of lat and lon variables and put them in the return value.
    return [pos.coords.latitude, pos.coords.longitude]
}
// four square buisness stuff goes here.
async function getBusiness(business){ // returns placeInfo for business array
    const options = {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        Authorization: 'fsq3A1UBCz3prWomNfth/EYCieMPJ9xsdOJYDiJVquYVd3E='
        }
    };
    
    let lat = userCoords[0]
    let lon = userCoords[1]
    let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=5&ll=${lat}%2C${lon}`, options) // not sure how I was supposed to find this information myself
    let placeInfo = await response.json()
    return placeInfo.results // returns just the data i want from the fetch response
}
async function markBusiness(){
 // gets type of buisness
businesses = await getBusiness(business)
// let b = L.marker([businesses[2].geocodes.main.latitude,businesses[2].geocodes.main.longitude]).addTo(map)
// b.bindPopup(`${businesses[2].name}`).openPopup();
// 
for (let i = 0; i < businesses.length; i++) {
    let b = L.marker([businesses[i].geocodes.main.latitude,businesses[i].geocodes.main.longitude]).addTo(map)
    b.bindPopup(`<b>${businesses[i].name}<b>`)
}
}
document.getElementById('submit').addEventListener('click',async () => {
    
    
business = document.getElementById('places').value
getBusiness(business)
markBusiness()
})

// this makes all functions run one at atime after the important function of get location runs. I think.
window.onload = async () =>{ // this acts as a wrapper function to order the flow events running on the page.
    // this makes getLocation output just the coordinates in an array.
userCoords = await getLocation()
 // [0]lat,[1]lon
buildMap() // builds the map and gives buildMap access to coords i think.
 //
}
// populate business from submit button
