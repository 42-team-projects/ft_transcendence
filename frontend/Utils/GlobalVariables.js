export const HOST = "https://10.11.7.8:8000";
export const wsUrl = 'wss://10.11.7.8:8000/';

export const PROFILE_API_URL = HOST + "/api/v1/player/";


export const UPDATE_USER_API_URL = HOST + "/api/v1/auth/update-user/";

export const ENABLE_2FA_API_URL = HOST + "/api/v1/auth/2fa/enable/";
export const VIREFY_2FA_API_URL = HOST + "/api/v1/auth/2fa/verify/";
export const DISABLE_2FA_API_URL = HOST + "/api/v1/auth/2fa/disable/";

export const TOURNAMENT_API_URL = HOST + "/tournament/"



import { getApiData } from "./APIManager.js";
// set acsses token in local storage
// localStorage.setItem('accessToken', 'token');
// get acsses token in local storage
// export const accessToken = localStorage.getItem('accessToken');
// console.log(accessToken);
// remove acsses token in local storage
// localStorage.removeItem('accessToken');
// export const ip = '127.0.0.1';
// const config = {
//     serverIP: ip,
//     serverURL: 'https://127.0.0.1:8000',
// };

// export default config;


let currentPlayer;

export async function getCurrentPlayerData() {

    if (currentPlayer)
        return currentPlayer;
    currentPlayer = await getApiData(PROFILE_API_URL);
    return currentPlayer;
}

export async function getCurrentPlayerId() {

    if (currentPlayer)
        return currentPlayer.id;
    currentPlayer = await getApiData(PROFILE_API_URL);
    return currentPlayer.id;
}

export async function getCurrentUserData() {

    if (currentPlayer)
        return currentPlayer.user;
    currentPlayer = await getApiData(PROFILE_API_URL);
    return currentPlayer.user;
}

export async function getCurrentUserId() {

    if (currentPlayer)
        return currentPlayer.user.id;
    currentPlayer = await getApiData(PROFILE_API_URL);
    return currentPlayer.user.id;
}