const weatherForm = document.querySelector('#searchForm');
const search = document.querySelector('#search');
const errorP = document.querySelector('#error');
const locationP = document.querySelector('#location');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  locationP.textContent = 'Loading...';
  errorP.textContent = '';

  fetch(`http://localhost:3000/weather?address=${search.value})`)
    .then((response) => {
      response.json()
        .then((data) => {
          if (data.err) {
            locationP.textContent = '';
            errorP.textContent = data.err;
          } else {
            const { country, region, name } = data.location;
            const { temperature, weather_icons,
              weather_descriptions, wind_speed,
              pressure, humidity, feelslike } = data.current;

            locationP.textContent = `Location: ${country}, ${region}, ${name} | Temperature: ${temperature}`;
            // locationP.textContent = JSON.stringify(data);
          }
        })
    })
});