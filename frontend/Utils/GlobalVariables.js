export const HOST = "https://10.11.2.6:8000";
export const wsUrl = 'wss://10.11.2.6:8000/';

export const PROFILE_API_URL = HOST + "/api/v1/players/";


export const UPDATE_USER_API_URL = HOST + "/api/v1/auth/update-user/";

export const ENABLE_2FA_API_URL = HOST + "/api/v1/auth/2fa/enable/";
export const VIREFY_2FA_API_URL = HOST + "/api/v1/auth/2fa/verify/";
export const DISABLE_2FA_API_URL = HOST + "/api/v1/auth/2fa/disable/";

export const TOURNAMENT_API_URL = HOST + "/tournament/";

export const NOTIFICATIONS_API_URL = HOST + "/notification/";



import { getApiData } from "/Utils/APIManager.js";


// let profileImage;

let currentPlayer;

export async function updateCurrentPlayer() {
    currentPlayer = await getApiData(PROFILE_API_URL + "me/");
    // profileImage = window.document.querySelector("c-profile")
    // console.log("profileImage: ", profileImage);
    return currentPlayer;
}

export async function getCurrentPlayerData() {

    if (currentPlayer)
        return currentPlayer;
    return await updateCurrentPlayer();
}

export async function getCurrentPlayerId() {

    if (currentPlayer)
        return currentPlayer.id;
    currentPlayer = await getCurrentPlayerData();
    return currentPlayer.id;
}

export async function getCurrentUserData() {

    if (currentPlayer)
        return currentPlayer.user;
    currentPlayer = await getCurrentPlayerData();
    return currentPlayer.user;
}

export async function getCurrentUserId() {

    if (currentPlayer)
        return currentPlayer.user.id;
    currentPlayer = await getCurrentPlayerData();
    return currentPlayer.user.id;
}


import { displayNotification } from "/Components/Notification/NotificationUtils.js";
import { createNotification } from "/Components/Notification/configs/NotificationManager.js";
import { router } from "/root/Router.js";

let notificationWebSocket;


export async function createNotificationWebSocket() {

    const userId = await getCurrentUserId();
    let websocket = `${wsUrl}ws/user/notification/${userId}/`;
    console.log("wsUrl: ", websocket);
    notificationWebSocket = new WebSocket(websocket)
    notificationWebSocket.onopen = () => {
        console.log('WebSocket connection of notification is opened');
    };
    notificationWebSocket.onerror = (error) => {
        console.log('WebSocket encountered an error: ', error);
    };
    notificationWebSocket.onclose = (event) => {
        console.log('WebSocket connection of notification is closed: ', event);
    };
    notificationWebSocket.onmessage = async (event) => {
        let data = await JSON.parse(event.data)
        console.log("data: ", data);
        if (data.Error) {
            console.log(data.Error)
            return ;
        }
        if (!data.is_signal) {
            const messageNotification = createNotification(data.id, data.sender, data.content, data.type, data.data);
            displayNotification(messageNotification);
        }
        else
            handleSignals(data);
    }
    return (notificationWebSocket);
}


export function handleSignals(signalData) {

    let url;
    switch (signalData.type) {
        case "tournament":
            url = new URL(HOST + signalData.data);
            if (window.location.pathname === url.pathname)
                router.handleRoute(url.pathname);
            break;
    
        case "friend":
            url = new URL(HOST + signalData.data);
            if (url.pathname.includes(window.location.pathname))
                router.handleRoute(window.location.pathname);
    
        case "message":
            // url = new URL(HOST + signalData.sender);
            // if (window.location.pathname === url.pathname)
            //     return ;
            const messageNotification = createNotification(signalData.id, signalData.sender, signalData.content, "message", signalData.data);
            displayNotification(messageNotification);
        default:
            break;
    }


}


export async function getNotificationWebSocket() {
    if (notificationWebSocket)
        return notificationWebSocket;
    return await createNotificationWebSocket();   
}
