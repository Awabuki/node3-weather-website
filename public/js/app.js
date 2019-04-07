console.log('Client side Javascript file is loaded');

// MAke http request to server from client. Use FETCH, browser based api
// async io operation, include callback function wiht .then (so a promise)
// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//   response.json().then( (data) => {
//     console.log(data);  
//   })
// });

 


// get a page element
// querySelector : to target a class, use ".className". For Id, use "#idname"
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');  // the single input box
const messageOne = document.querySelector('#Message-1');
const messageTwo = document.querySelector('#Message-2');

weatherForm.addEventListener('submit', ( e ) => {

    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then( (response) => {
         response.json().then( (data) => {
        if ( data.error) {
            messageOne.textContent  = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;  
        }
  })
});




});