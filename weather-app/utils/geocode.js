const request = require('request')

const geoCode =(address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZWR1YXJkLXRyaWYiLCJhIjoiY2swZGttYnpkMDFlZDNnbGNqam85eHUwbSJ9.UXm_ECFVOZwG6kjKhBBBCw&limit=1"

    request({url, json:true}, (error, response)=> {
        const {center,place_name} = response.body.features[0]
        if(error) {
            callback("unable to connect to location services", undefined)
        }else if (response.body.features.length === 0) {
            callback('unable to find location', undefined)
        }else {
            callback(undefined, {
                lat : center[0],
                long : center[1],
                location : place_name
            })
        }
    })
}

module.exports = geoCode;