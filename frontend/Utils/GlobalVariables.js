export const HOST = "https://127.0.0.1:8000";
export const wsUrl = 'wss://127.0.0.1:8000/';

export const PROFILE_API_URL = HOST + "/api/v1/players/";


export const UPDATE_USER_API_URL = HOST + "/api/v1/auth/update-user/";

export const ENABLE_2FA_API_URL = HOST + "/api/v1/auth/2fa/enable/";
export const VIREFY_2FA_API_URL = HOST + "/api/v1/auth/2fa/verify/";
export const DISABLE_2FA_API_URL = HOST + "/api/v1/auth/2fa/disable/";

export const TOURNAMENT_API_URL = HOST + "/tournament/";

export const NOTIFICATIONS_API_URL = HOST + "/notification/";



import { getApiData } from "/Utils/APIManager.js";


let currentPlayer;

export async function getCurrentPlayerData() {

    if (currentPlayer)
        return currentPlayer;
    currentPlayer = await getApiData(PROFILE_API_URL + "me/");
    return currentPlayer;
}

export async function getCurrentPlayerId() {

    if (currentPlayer)
        return currentPlayer.id;
    currentPlayer = await getApiData(PROFILE_API_URL + "me/");
    return currentPlayer.id;
}

export async function getCurrentUserData() {

    if (currentPlayer)
        return currentPlayer.user;
    currentPlayer = await getApiData(PROFILE_API_URL + "me/");
    return currentPlayer.user;
}

export async function getCurrentUserId() {

    if (currentPlayer)
        return currentPlayer.user.id;
    currentPlayer = await getApiData(PROFILE_API_URL + "me/");
    return currentPlayer.user.id;
}


import { displayNotification } from "/Components/Notification/NotificationUtils.js";
import { createNotification } from "/Components/Notification/configs/NotificationManager.js";

let notificationWebSocket;


export async function createNotificationWebSocket() {

    const userId = await getCurrentUserId();
    let websocket = `${wsUrl}ws/user/notification/${userId}/`;
    console.log("wsUrl: ", websocket);
    notificationWebSocket = new WebSocket(websocket)
    notificationWebSocket.onopen = () => {
        console.log('WebSocket connection of chat is opened');
    };
    notificationWebSocket.onerror = (error) => {
        console.log('WebSocket encountered an error: ', error);
    };
    notificationWebSocket.onclose = (event) => {
        console.log('WebSocket connection closed: ', event);
    };
    notificationWebSocket.onmessage = async (event) => {
        let data = await JSON.parse(event.data)
        console.log("data: ", data);
        if (data.Error) {
            console.log(data.Error)
            return ;
        }
        const messageNotification = createNotification(data.sender, data.content, data.type, data.infos);
        displayNotification(messageNotification);
    }
    return (notificationWebSocket);
}


export async function getNotificationWebSocket() {
    if (notificationWebSocket)
        return notificationWebSocket;
    return await createNotificationWebSocket();   
}
