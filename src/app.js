const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const port = process.env.PORT || 3000
const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Guy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the Author',
        name: 'Guy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is some sample help text.',
        title: 'Help',
        name: 'Guy'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address)
    {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (err, geodata) => {
        if (err)
        {
            return res.send({
                error: err
            })
        }
        const {latitude, longitude, location} = geodata
    
        forecast(latitude, longitude, (err, forecastData) => {
            if (err)
            {
                return res.send({
                    error: err
                })
            }
            const {temp, precipProb, summary, currentCond} = forecastData
            const msg = `Forecast: ${summary} ${currentCond} and ${temp} degrees with a ${precipProb}% chance of precipitation.`
    
            res.send({
                forecast: msg,
                location: location,
                address: req.query.address
            })
        })
    })
    
    // res.send({
    //     address: req.query.address,
    //     location: 'Atlanta GA', 
    //     forecast: 'Partly cloudy, high 52F.'})
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Guy',
        errmsg: 'Help article not found.'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Guy',
        errmsg: 'Page not found!'
    })
})
app.listen(port, () => console.log(`Server is running on port ${port}...`))
