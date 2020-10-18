const path = require('path');
const express = require('express');

const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

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
      error: 'Address is not defined',
    });
  }

  geocode(req.query.address, (err, data) => {
    if (err) {
      return res.send({err});
    }

    forecast(data, (forecastErr, forecastData) => {
      if (forecastErr) {
        return res.send({forecastErr});
      }

      res.send(forecastData);
    });
  })
})

app.get('*', (req, res) => {
  res.render('404');
})

app.listen(port, () => {
  console.log(`Server was started on ${port} port`);
});


