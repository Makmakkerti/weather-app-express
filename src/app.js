// http://api.weatherstack.com/current?access_key=e393bc61e5b38b564ff1af081b34071a&query=46.4598865,30.5717043
// pk.eyJ1IjoibWFrbWFra2VydGkiLCJhIjoiY2tnN3ZvZnQ3MDR0OTMybXlkMW02MmU1eCJ9.8GeFQHMsWm3K7tetLF_08g
const fs = require('fs');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');


const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/odesa.json?access_token=pk.eyJ1IjoibWFrbWFra2VydGkiLCJhIjoiY2tnN3ZvZnQ3MDR0OTMybXlkMW02MmU1eCJ9.8GeFQHMsWm3K7tetLF_08g&limit=1'

const app = express();

// Define path for directories
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Handlebars engine and views setup
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Static directory
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('weather', {
    name: 'Makmakkerti',
    text: 'Hello to you: '
  });
});

app.get('/help', (req, res) => {
  res.render('help');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'Adress not defined',
    });
  }

  res.send({
    location: req.query.address
  })
})

app.get('*', (req, res) => {
  res.send('Sorry, no page was found by this address')
})

app.listen(3000, () => {
  console.log('Server was started on port 3000');
});

