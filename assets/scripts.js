const form1 = document.getElementById('login_form');
const form2 = document.getElementById('resister_form');

form1.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email1').value;
    const password = document.getElementById('password1').value;

    const body = JSON.stringify({
        email,
        password
    })

    fetch(
        'http://localhost:3000/api/login',
        {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json',
            }
        }
    ).then(data => data.json()).then(d => console.log(d))
})

form2.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email2').value;
    const password = document.getElementById('password2').value;

    const body = JSON.stringify({
        email,
        password
    })

    fetch(
        'http://localhost:3000/api/resister',
        {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json',
            }
        }
    ).then(data => data.json()).then(d => console.log(d))
})