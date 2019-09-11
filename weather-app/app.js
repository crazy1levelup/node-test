const request = require('request');
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const address = process.argv[2]

const weather = (loc, callback) => {
    geoCode(loc, (error, {lat,long,location} = data) => {
     // deconstructive obj : same as calling each one particulary ex: data.lat, data.long, data.location
        if(error) {
            return console.log(error)
        }
    
        forecast(long, lat, (error,data) => {
            if(error) {
                return console.log(error)
            }
         console.log(location +  " it is currently " + data.weather + " degrees out. There is a " + data.chance + " change of rain.")
     
    })
    })
    
}
if(address) {
    weather(address)
}else {
    console.log("please provide a address")
}

module.exports = weather