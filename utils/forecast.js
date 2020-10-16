const request = require('postman-request');

const forecast = (obj, cb) => {
  const { lat, long } = obj;
  const url = `http://api.weatherstack.com/current?access_key=e393bc61e5b38b564ff1af081b34071a&query=${long},${lat}`;

  request({ url, json: true }, function (error, { body } = {}) {
    if (error) {
      cb('Unable connect to server!', undefined);
    } else if (body.error) {
      cb(body.error.info, undefined)
    } else {
      cb(undefined, body)
    }
  });
};

module.exports = forecast;