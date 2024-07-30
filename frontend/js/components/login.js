import { showToast } from './toast.js';
import { setAccessToken } from './tokenStore.js';

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