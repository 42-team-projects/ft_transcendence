import { showToast } from "./toast.js";
import { sendTokenToBackend, windowOnLoad } from './googleAuth.js';

document
    .getElementById("registerForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault();
        // event.stopImmediatePropagation();


        var email = document.getElementById("email").value;
        var username = document.getElementById("username").value;
        var password1 = document.getElementById("password1").value;
        var password2 = document.getElementById("password2").value;


        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/v1/auth/register/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        username: username,
                        password1: password1,
                        password2: password2,
                    }),
                }
            );

            const data = await response.json();
            console.log(data);

            if (response.status !== 201) {
                for (let field in data) {
                    showToast(`${field}: ${data[field][0]}`, true);
                }
            }
            else
            {
                showToast(data.message, false);
                window.location.href = "../html/confirm-message.html";
        }
        } catch (error) {
            console.error("Error:", error);
            showToast("An error occurred", true);
        }
    });

// OAuth logic
document.getElementById('googleSignUp').addEventListener('click', function() {
    window.location.href = 'http://127.0.0.1:8000/api/v1/auth/google/redirect/';
});

document.getElementById('intraSignUp').addEventListener('click', function() {
    window.location.href = 'http://127.0.0.1:8000/api/v1/auth/intra/redirect/';
});

window.addEventListener('load', function()
{
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    console.log('Access token:', token);
    if (token)
    {
        localStorage.setItem('access_token', token);
        window.location.href = "../html/home.html";

    } else {
        console.error('An error occurred during the OAuth process');
    }
});