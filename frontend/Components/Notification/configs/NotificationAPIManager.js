

export function createWebSocket(userId) {
    let wsUrl = `ws://${window.location.hostname}:8000/ws/notification/${userId}/`;
    console.log("wsUrl: ", wsUrl);
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
    webSocket.onmessage = (e) => {
        let data = JSON.parse(e.data)
        if (data.Error) {
            console.log(data.Error)
        }
        else {
            console.log("data: ", data);
            // renderConversation(chatContainer, [data]);
        }
    };
    return (webSocket);
}