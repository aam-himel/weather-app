console.log('JavaScript is working!');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const textFirst =  document.querySelector('#text-first');
const textSecond = document.querySelector('#text-second');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    
    textFirst.textContent = 'loading...';
    textSecond.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                textFirst.textContent = data.error;

            } else {
                console.log(data.forecast);
                console.log(data.location);

                textFirst.textContent = data.forecast;
                textSecond.textContent = data.location;
            }

        })
    })
})