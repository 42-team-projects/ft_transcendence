import { getAccessToken, setAccessToken } from "./tokenStore.js";

const fetchWithToken = async (url, options) => {
    const response = await fetch(url, options);

    if (response.status === 401) {
        const refreshResponse = await fetch(
            "http://127.0.0.1:8000/api/v1/auth/refresh/",
            {
                method: "POST",
                credentials: "include",
            }
        );

        if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            const accessToken = data.access_token;
            setAccessToken(accessToken);

            options.headers.Authorization = `Bearer ${accessToken}`;
            return fetch(url, options);
        }

        throw new Error("Unable to refresh token");
    }
    return response;
};

async function fetchWhoAmI() {
    const accessToken = getAccessToken();

    try {
        const response = await fetchWithToken(
            "http://127.0.0.1:8000/api/v1/auth/whoami/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            document.getElementById("api-response").textContent = data.username;
            console.log(document.cookie);
        }
    } catch (error) {
        console.log('====>', error);
        if (error.message === "Unable to refresh token") {
            window.location.href = '../html/login.html';
        } else {
            console.error("Error:", error);
        }
    }
}

document.getElementById("whoami-button").addEventListener("click", fetchWhoAmI);


// QR part
async function fetchQRCode() {
    const accessToken = getAccessToken();

    try {
        const response = await fetchWithToken(
            "http://127.0.0.1:8000/api/v1/auth/2fa/enable/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            const qrCodeImg = document.getElementById("qr-code");
            qrCodeImg.src = "data:image/png;base64," + data.qr_code;
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
fetchQRCode();
// document.getElementById("qr-code-button").addEventListener("click", fetchQRCode);

// Enable 2FA part
async function enable2FA() {
    const otp = document.getElementById("2fa-code").value;
    const messageElement = document.getElementById("2fa-message");

    if (!otp || !/^\d{6}$/.test(otp)) {
        messageElement.textContent = "Please enter a valid six-digit OTP.";
        messageElement.style.color = "red";
        return;
    }

    const accessToken = getAccessToken();

    try {
        const response = await fetchWithToken(
            `http://127.0.0.1:8000/api/v1/auth/2fa/verify/?otp=${otp}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const data = await response.json();

        if (response.ok) {
            messageElement.textContent = "2FA enabled successfully!";
            messageElement.style.color = "green";
        } else {
            messageElement.textContent = data.error;
            messageElement.style.color = "red";
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

document.getElementById("enable-2fa-button").addEventListener("click", enable2FA);

async function disable2FA() {
    const messageElement = document.getElementById("2fa-message");
    const accessToken = getAccessToken();

    try {
        const response = await fetchWithToken(
            `http://127.0.0.1:8000/api/v1/auth/2fa/disable/`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const data = await response.json();

        // if (response.ok) {
            messageElement.textContent = data.message;
            messageElement.style.color = "green";
        // } else {
        //     messageElement.textContent = data.error;
        //     messageElement.style.color = "red";
        // }
    } catch (error) {
        console.error("Error:", error);
    }
}

document.getElementById("disable-2fa-button").addEventListener("click", disable2FA);