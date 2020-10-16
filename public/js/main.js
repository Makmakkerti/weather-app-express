const weatherForm = document.querySelector('form');
const search = document.querySelector('#search');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  fetch(`http://localhost:3000/weather?address=${search.value})`)
    .then((response) => {
      response.json()
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            console.log(data);
          }
        })
    })
});