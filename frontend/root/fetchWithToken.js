import { HOST } from '/Utils/GlobalVariables.js';

export const fetchWithToken = async (url, options) => {
    const response = await fetch(url, options);

    if (response.status === 401) {
        const refreshResponse = await fetch(
            `${HOST}/api/v1/auth/refresh/`,
            {
                method: "POST",
                credentials: "include",
            }
        );

        if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            const accessToken = data.access_token;
            localStorage.setItem("accessToken", accessToken);
            options.headers.Authorization = `Bearer ${accessToken}`;
            return fetch(url, options);
        }

        throw new Error("Unable to refresh token");
    }
    return response;
};

export const isTokenValid = async (access_token) => {
    return await fetchWithToken(`${HOST}/api/v1/auth/verify/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then(response => {
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    })
    .catch(error => {
        // console.error('Token verification failed:', error);
        return false;
    });
}