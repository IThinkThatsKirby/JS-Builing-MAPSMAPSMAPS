// map object
// business array
// marker object
// current location object? array?
async function getLocation(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    // return an coordinates in array
    var lat = pos.coords.latitude
    var lon = pos.coords.longitude
    return [lat, lon]
}

window.onload = async () =>{
    // this makes getLocation output just the coordinates in an array.
const coords =  await getLocation() // [0]lat,[1]lon
console.log(coords)
}