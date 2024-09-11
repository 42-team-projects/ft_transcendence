import { wsUrl } from "/Utils/GlobalVariables.js";
import { renderConversation } from "/Components/Chat/configs/ChatConfigs.js";

export function setUpWebSocket(chatContainer, room_name) {
    let wsUrl = `${wsUrl}ws/chat/chat/${room_name}/`;
    const webSocket = createWebSocket(wsUrl);
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
        if (data.Error) {
            console.log(data.Error)
        }
        else {
            console.log("data: ", data);
            renderConversation(chatContainer, [data]);
        }
    };
}