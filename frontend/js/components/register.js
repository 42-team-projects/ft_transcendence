import { showToast } from "./toast.js";

document
    .getElementById("registerForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault();
        // event.stopImmediatePropagation();


        var email = document.getElementById("email").value;
        var username = document.getElementById("username").value;
        var password1 = document.getElementById("password1").value;
        var password2 = document.getElementById("password2").value;
        const tmp = document.getElementById('message');


        try {
            const response = await fetch(
                "http://0.0.0.0:8000/api/v1/auth/register/",
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
                tmp.textContent = data.message
                // showToast(data.message, false);
            }
        } catch (error) {
            console.error("Error:", error);
            showToast("An error occurred", true);
        }
    });
