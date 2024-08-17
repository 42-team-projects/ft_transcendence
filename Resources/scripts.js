const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.querySelector('.container');
// const apiUrl = 'http://10.11.1.2:8000/game/';
// const apiUrl = 'http://10.11.4.8:8000/game/';
const apiUrl = 'http://10.11.7.2:8000/game/';



signUpButton.addEventListener('click', async () => {
    container.classList.add('right-panel-active');   
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});


async function signup()
{
    try {
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        const player = {
            username: username,
            email: email,
            password: password
        }
        const signup = "signup/"
        const response = await fetch(`${apiUrl}${signup}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player),
        });
        if (!response.ok) {
            throw new Error(`${response.status}  ${response.statusText}`);
        }
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch(error) {
        console.error('Error during tournament signup: ', error);
    }
}


async function login()
{
    try {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const player = {
            username: username,
            password: password
        }
        const login = "login/"
        const response = await fetch(`${apiUrl}${login}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player),
        });
        if (!response.ok) {
            const data = await response.json();
            console.error('Login failed:', data.message);
            alert('Invalid username or password');
            throw new Error(`${response.status}  ${response.statusText}`);
        }
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
        if (data.status === 'success') {
            // Store user data in local storage
            localStorage.setItem('loggedInUser', JSON.stringify(data.player));
            window.location.href = 'org.html';
        }
    } catch(error) {
        console.error('Error during tournament login: ', error);
    }
}