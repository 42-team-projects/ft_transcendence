
let webSocketStorage = []

export function setUpWebSocket(chatContainer, sender_id, receiver_id) {
    let room_name;
    if (sender_id < receiver_id)
        room_name = sender_id.toString() + receiver_id.toString()
    else
        room_name = receiver_id.toString() + sender_id.toString()
    let wsUrl = `ws://${window.location.hostname}:8000/ws/chat/chat/chat_${room_name}/`;
    console.log("url : ", wsUrl);
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
    console.log("webSocket : ", webSocket);
    webSocket.onmessage = (e) => {
        let data = JSON.parse(e.data)
        if (data.Error) {
            console.log(data.Error)
        }
        else {
            console.log("data: ", data);
            renderConversation(chatContainer, [data]);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };
}