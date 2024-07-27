import { setAccessToken } from './tokenStore.js';

export async function sendTokenToBackend(token, BACKEND_URL) {
    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'access_token': token })
        });
        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function windowOnLoad(BACKEND_URL) {
    const urlParams = new URL(window.location.href);
    const token = urlParams.searchParams.get('token');

    if (token) {
        try {
            const data = await sendTokenToBackend(token, BACKEND_URL);
            setAccessToken(data.access_token);
            window.location.href = '../html/home.html';
        } catch (error) {
            console.error('Error:', error);
        }
    }
}