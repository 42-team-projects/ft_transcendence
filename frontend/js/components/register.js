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

// Include the googleAuth.js script

// Google OAuth logic
const CLIENT_ID = '727204892262-1k88o4pf5cqg7qgb9aem8bt236apcaof.apps.googleusercontent.com';
const SCOPES = 'profile email'; // Scopes that your application is requesting access to
const BACKEND_URL = 'http://127.0.0.1:8000/api/v1/auth/google/';
const REDIRECT_URI = 'http://127.0.0.1:8000/api/v1/auth/google/redirect';

document.getElementById('googleSignUp').addEventListener('click', function() {
    // Step 1: Redirect the user to Google's OAuth 2.0 server
    let authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(CLIENT_ID)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPES)}&prompt=consent`;
    window.location.href = authUrl;
});

window.onload = function() {
    windowOnLoad(BACKEND_URL);
};