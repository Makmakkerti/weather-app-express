const weatherForm = document.querySelector('#searchForm');
const search = document.querySelector('#search');
search.addEventListener('click', () => {
  search.setAttribute('placeholder', '');
  search.value = '';
});

const textMessage = document.querySelector('#location');
const widget = document.querySelector('.widget');
const wIcon = document.querySelector('.weatherIcon');
const wDate = document.querySelector('.date');
const wTemperature = document.querySelector('.temperature');
const wCondition = document.querySelector('.weatherCondition');
const wPlace = document.querySelector('.place');

const wFeelslike = document.querySelector('#feelslike span');
const wPressure  = document.querySelector('#pressure span');
const wHumidity  = document.querySelector('#humidity span');
const wWindspeed = document.querySelector('#windspeed span');
const wUvindex   = document.querySelector('#uvindex span');
const wCloudcover = document.querySelector('#cloudcover span');

const errorP = document.querySelector('#error');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  widget.classList.add('hidden');
  textMessage.textContent = 'Loading...';

  fetch(`/weather?address=${search.value})`)
    .then((response) => {
      response.json()
        .then((data) => {
          if (data.err) {
            textMessage.textContent = data.err;
          } else {
            textMessage.textContent = '';

            const { country, name } = data.location;
            const { temperature, weather_icons,
              weather_descriptions, wind_speed,
              pressure, humidity, feelslike, uv_index, cloudcover } = data.current;

            wIcon.innerHTML = `<img src="${weather_icons[0]}" />`;
            wTemperature.innerHTML = `<span>${temperature}°</span>`;
            wCondition.textContent = weather_descriptions[0];
            wPlace.textContent = `${country}, ${name}`;

            wFeelslike.textContent = feelslike
            wPressure.textContent = pressure;
            wHumidity.textContent = humidity;
            wWindspeed.textContent = wind_speed;
            wUvindex.textContent = uv_index;
            wCloudcover.textContent = cloudcover;
            
            widget.classList.remove('hidden');
          }
        })
    })
});