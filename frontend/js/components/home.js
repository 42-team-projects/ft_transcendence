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
