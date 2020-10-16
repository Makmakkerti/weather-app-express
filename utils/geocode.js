const request = require('postman-request');

const geocode = (address, callback) => {
  const addr = encodeURIComponent(address.toLowerCase());
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addr}.json?access_token=pk.eyJ1IjoibWFrbWFra2VydGkiLCJhIjoiY2tnN3ZvZnQ3MDR0OTMybXlkMW02MmU1eCJ9.8GeFQHMsWm3K7tetLF_08g&limit=1`;
  
  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search!', undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[0],
        long: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  })
};

module.exports = geocode;