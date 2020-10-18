const weatherForm = document.querySelector('#searchForm');
const search = document.querySelector('#search');
search.addEventListener('click', () => {
  search.setAttribute('placeholder', '');
  search.value = '';
});

const dataContainer = document.querySelector('#data-container');
const widget = document.querySelector('.widget');
const wIcon = document.querySelector('.weatherIcon');
const wDate = document.querySelector('.date');
const wTemperature = document.querySelector('.temperature');
const wCondition = document.querySelector('.weatherCondition');
const wPlace = document.querySelector('.place');

const wFeelslike = document.querySelector('#feelslike span');
const wPressure = document.querySelector('#pressure span');
const wHumidity = document.querySelector('#humidity span');
const wWindspeed = document.querySelector('#windspeed span');
const wUvindex = document.querySelector('#uvindex span');
const wCloudcover = document.querySelector('#cloudcover span');

const errorP = document.querySelector('#error');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  widget.classList.add('hidden');
  const loader = `<svg width="205" height="120">
    <g>
    <path class="path" d="M 100.16623,51.415329 C 106.74946,45.082085 113.08279,39.707091 119.16623,35.290329 C 125.24945,30.790433 130.37444,27.790436 134.54123,26.290329 C 138.70777,24.790439 143.24943,24.04044 148.16623,24.040329 C 158.49941,24.04044 166.83274,27.498769 173.16623,34.415329 C 179.58273,41.248756 182.79106,49.540414 182.79123,59.290329 C 182.79106,65.957064 181.37439,72.123725 178.54123,77.790329 C 175.70773,83.457047 171.66607,87.748709 166.41623,90.665329 C 161.24941,93.582037 155.29108,95.040369 148.54123,95.040329 C 139.7911,95.040369 132.12444,93.16537 125.54123,89.415329 C 119.04112,85.665378 110.58279,78.582052 100.16623,68.165329 C 89.332815,78.915385 80.707824,86.082044 74.291229,89.665329 C 67.874504,93.248704 60.416178,95.040369 51.916229,95.040329 C 41.082864,95.040369 32.624539,91.665372 26.541229,84.915329 C 20.541218,78.165385 17.541221,69.623727 17.541229,59.290329 C 17.541221,49.623747 20.707884,41.332089 27.041229,34.415329 C 33.457871,27.498769 41.832863,24.04044 52.166229,24.040329 C 57.166181,24.04044 61.74951,24.790439 65.916229,26.290329 C 70.082835,27.790436 75.166163,30.790433 81.166229,35.290329 C 87.249484,39.707091 93.582811,45.082085 100.16623,51.415329 M 108.29123,59.165329 C 117.12445,67.915396 124.37445,73.873723 130.04123,77.040329 C 135.7911,80.123717 141.49943,81.665382 147.16623,81.665329 C 154.24942,81.665382 159.79108,79.582051 163.79123,75.415329 C 167.79107,71.165392 169.79107,66.040398 169.79123,60.040329 C 169.79107,53.457077 167.79107,48.040416 163.79123,43.790329 C 159.87441,39.457091 154.66608,37.290426 148.16623,37.290329 C 144.49943,37.290426 140.95776,37.957092 137.54123,39.290329 C 134.12444,40.540423 130.04111,42.790421 125.29123,46.040329 C 120.54112,49.207081 114.87446,53.582077 108.29123,59.165329 M 92.041229,59.165329 C 86.041152,54.082076 80.666157,49.915414 75.916229,46.665329 C 71.166167,43.332087 66.999504,40.957089 63.416229,39.540329 C 59.832845,38.123759 55.916182,37.415426 51.666229,37.415329 C 45.582859,37.415426 40.541198,39.540424 36.541229,43.790329 C 32.541206,48.040416 30.541208,53.457077 30.541229,60.040329 C 30.541208,64.623732 31.582873,68.498728 33.666229,71.665329 C 35.749536,74.832055 38.2912,77.290386 41.291229,79.040329 C 44.374527,80.790383 48.207857,81.665382 52.791229,81.665329 C 58.791179,81.665382 64.624507,80.08205 70.291229,76.915329 C 75.957829,73.748723 83.207822,67.832062 92.041229,59.165329" />
  </svg>`

  dataContainer.innerHTML = loader;

  fetch(`/weather?address=${search.value})`)
    .then((response) => {
      response.json()
        .then((data) => {
          if (data.err) {
            dataContainer.textContent = data.err;
          } else {
            dataContainer.textContent = '';

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