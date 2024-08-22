const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.querySelector('.container');
const apiUrl = 'http://127.0.0.1:8001/';

signUpButton.addEventListener('click', async () => {
    container.classList.add('right-panel-active');   
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// document.getElementById('signUpForm').addEventListener('submit', (e) => {
//     e.preventDefault();
//     const name = document.getElementById('signupUsername').value;
//     const email = document.getElementById('signupEmail').value;
//     const password = document.getElementById('signupPassword').value;
//     console.log('Sign Up:', { name, email, password });
//     // Perform sign-up logic here
// });

// document.getElementById('loginForm').addEventListener('submit', (e) => {
//     e.preventDefault();
//     const email = document.getElementById('loginEmail').value;
//     const password = document.getElementById('loginPassword').value;
//     console.log('Sign In:', { email, password });
//     // Perform login logic here
// });


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
        const response = await fetch(`${apiUrl}game/${signup}`, {
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
        const response = await fetch(`${apiUrl}game/${login}`, {
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
            window.location.href = '../index.html';
        }
    } catch(error) {
        console.error('Error during tournament login: ', error);
    }
}
