import { showToast } from './toast.js';
import { setAccessToken } from './tokenStore.js';
import { windowOnLoad } from './googleAuth.js';

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/auth/login/', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });

        const data = await response.json();
        console.log(data)
        if (response.status === 200) {
            setAccessToken(data.access_token);
            window.location.href = '../html/home.html';
        } else if (data.detail) {
            showToast(data.detail, true);
        } else {
            for (let field in data.errors) {
                showToast(`${field}: ${data.errors[field][0]}`, true);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

const CLIENT_ID = '727204892262-1k88o4pf5cqg7qgb9aem8bt236apcaof.apps.googleusercontent.com';
const SCOPES = 'profile email'; // Scopes that your application is requesting access to
const BACKEND_URL = 'http://127.0.0.1:8000/api/v1/auth/google/';
const REDIRECT_URI = 'http://127.0.0.1:8000/api/v1/auth/google/redirect';

document.getElementById('googleLogin').addEventListener('click', function() {
    // Redirect the user to Google's OAuth server
    let authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(CLIENT_ID)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPES)}&prompt=consent`;
    window.location.href = authUrl;
});

window.onload = function() {
    windowOnLoad(BACKEND_URL);
};