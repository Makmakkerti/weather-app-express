console.log('Client side javascript file added');

fetch('http://localhost:3000/weather?address=odessa')
.then((response) => {
  response.json()
  .then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
    }
  })
});