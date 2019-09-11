const request = require('request')

const geoCode =(address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZWR1YXJkLXRyaWYiLCJhIjoiY2swZGttYnpkMDFlZDNnbGNqam85eHUwbSJ9.UXm_ECFVOZwG6kjKhBBBCw&limit=1"

    request({url, json:true}, (error, response)=> {
        if(error) {
            callback("unable to connect to location services", undefined)
        }else if (response.body.features.length === 0) {
            callback('unable to find location', undefined)
        }else {
            const {center, place_name} = response.body.features[0]

            callback(undefined, {
                lat : center[1],
                long : center[0],
                location : place_name
            })
        }
    })
}

module.exports = geoCode;