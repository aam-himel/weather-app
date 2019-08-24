
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
const app = express();

console.log(path.join(__dirname,'../public'));
const publicDirectoryPath = path.join(__dirname,'..','/public');
const viewPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname,'../template/partials');

//setup handlebars engine and view directory
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));



app.get('', (req, res) => {
    res.render('index',{
        title: 'weather',
        name: 'Himel',
        description: 'This is a template engine'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Himel'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Himel',
        description: 'We hack to protect Bangladesh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide a name for your city'
        });
    }

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return  res.send({error});
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('error_404', {
        errorMessage:'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('error_404', {
        errorMessage: 'Page not found!'
    })
})

app.listen(3000, ()  => {
    console.log('node 3000 port is working!');
})

