const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/43e89eb098fa27c56f8ac682e171e148/${lat},${long}`

    request({url, json: true}, (error, response) => {
        if (error)
        {
            callback('Failed to connect to weather service.')
        }
        else if (response.body.error)
        {
            callback(`Location not found: lat=${lat}, long=${long}. Try another search.`)
        }
        else
        {
            const summary = response.body.daily.data[0].summary
            const data = response.body.currently
            const prob = data.precipProbability * 100
            callback(undefined, {
                temp: data.temperature,
                precipProb: prob,
                summary: summary,
                currentCond: data.summary
            })
 //           console.log(`It is currently ${data.temperature} degrees with a ${prob}% chance of rain.`)
        }
    })
}

module.exports = forecast
