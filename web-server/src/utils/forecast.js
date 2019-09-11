const request = require('request');

const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/200241a601fca0e750c946d39dd8e21b/" +encodeURIComponent(lat)  + "," + encodeURIComponent(long) +"?units=si";

    request({url, json:true}, (error, response) => {
        const {temperature,precipProbability, summary } = response.body.currently
        if(error) {
            callback("unable to connect to location server", undefined)
        }else if (response.body.error) {
            callback(response.body.error,undefined)
        }else {
            callback(undefined, {
                weather: temperature,
                chance: precipProbability,
                summary: summary
            })
        }
    })
}

module.exports = forecast; 