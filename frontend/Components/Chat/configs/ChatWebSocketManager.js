import { wsUrl } from "/Utils/GlobalVariables.js";
import { renderConversation } from "/Components/Chat/configs/ChatConfigs.js";
import { displayToast } from "/Components/CustomElements/CustomToast.js";

export function setUpWebSocket(chatContainer, room_name) {
    const webSocket = createWebSocket(`${wsUrl}ws/chat/chat/${room_name}/`);
    onmessage(webSocket, chatContainer);
    return webSocket;
}


export function createWebSocket(wsUrl) {
    const webSocket = new WebSocket(wsUrl)
    webSocket.onopen = () => {
        console.log('WebSocket connection of chat is opened');
    };
    webSocket.onerror = (error) => {
        console.log('WebSocket encountered an error: ', error);
    };
    webSocket.onclose = (event) => {
        console.log('WebSocket connection closed: ', event);
    };
    return (webSocket);
}


export function onmessage(webSocket, chatContainer) {
    webSocket.onmessage = (e) => {
        let data = JSON.parse(e.data)
        console.log(data);
        if (data.error) {
            displayToast("error", data.error);
            // console.log(data.Error)
        }
        else {
            renderConversation(chatContainer, [data]);
        }
    };
}