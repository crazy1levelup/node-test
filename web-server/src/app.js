const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "Eduard"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: "About app",
        name: "Eduard"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        message: "some message",
        name:"Eduard"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page',{
        title: "404",
        name: "Eduard",
        message: "Help article not found"
    })
})

app.get("/weather", (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: "provide an adress"
        })
    }
    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(lat, long, (error, response) => {
            if(error) {
                return res.send({error})
            }
            return res.send({
                forecast: response,
                location,
                address: req.query.address
            })
           
        })       
    } )
    
})

app.get("/product", (req,res) => {
    if(!req.query.name) {
       return res.send({
            error: "you must provide a search term"
        })
    } 
        console.log(req.query)

        res.send({
            products: []
        })
    
    
})



app.get('*', (req, res) => {
    res.render('404page',{
        title: "404",
        name: "Eduard",
        message: "Page not found"
    })
})




app.listen(3000, ()=> {
    console.log("server is up on port 3000")
})

