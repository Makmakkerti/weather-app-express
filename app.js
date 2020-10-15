// http://api.weatherstack.com/current?access_key=e393bc61e5b38b564ff1af081b34071a&query=46.4598865,30.5717043
// pk.eyJ1IjoibWFrbWFra2VydGkiLCJhIjoiY2tnN3ZvZnQ3MDR0OTMybXlkMW02MmU1eCJ9.8GeFQHMsWm3K7tetLF_08g
const request = require('postman-request');
const fs = require('fs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/odesa.json?access_token=pk.eyJ1IjoibWFrbWFra2VydGkiLCJhIjoiY2tnN3ZvZnQ3MDR0OTMybXlkMW02MmU1eCJ9.8GeFQHMsWm3K7tetLF_08g&limit=1'

geocode('Odessa', (error, data) => {
  if (error) console.log('Error', error);
  forecast(data, (error, forecastData) => {
    if (error) console.log('Error', error);
    console.log('Location:', data.location);
    console.log('Data :', forecastData.current)
  })
});


