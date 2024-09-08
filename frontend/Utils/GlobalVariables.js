
// export const apiUrl = 'http://127.0.0.1:8000/tournament/';
export const apiUrl = 'http://127.0.0.1:8000/tournament/'
export const wsUrl = 'ws://127.0.0.1:8000/';

import { getApiData } from "/Utils/APIManager.js";
import { PROFILE_API_URL } from "/Utils/APIUrls.js";
// set acsses token in local storage
// localStorage.setItem('accessToken', 'token');
// get acsses token in local storage
// export const accessToken = localStorage.getItem('accessToken');
// console.log(accessToken);
// remove acsses token in local storage
// localStorage.removeItem('accessToken');
export const ip = '127.0.0.1';
const config = {
    serverIP: ip,
};

export default config;


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
    let wsUrl = `ws://${window.location.hostname}:8000/ws/notification/${userId}/`;
    console.log("wsUrl: ", wsUrl);
    notificationWebSocket = new WebSocket(wsUrl)
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
        }
        else {
            // const messageNotification = new MessageNotification();
            const messageNotification = createNotification(data.sender, data.content, "message");
            console.log("messageNotification: ", messageNotification);
            displayNotification(messageNotification);
        }
    }
    return (notificationWebSocket);
}


export async function getNotificationWebSocket() {
    if (notificationWebSocket)
        return notificationWebSocket;
    return await createNotificationWebSocket();   
}

// webSocket.onmessage = async (e) => {
//     let data = await JSON.parse(e.data)
//     if (data.Error) {
//         console.log(data.Error)
//     }
//     else {
//         displayNotification("<message-notification></message-notification>");
//     }
// };