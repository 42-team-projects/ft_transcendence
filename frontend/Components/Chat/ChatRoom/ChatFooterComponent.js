import { getCurrentUserData, getNotificationWebSocket } from "/Utils/GlobalVariables.js";

let ws;

export class ChatFooterComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="container">
                <input type="text" placeholder="write your message ..." />
                <img loading="lazy" src="/assets/images/profile/send-icon.svg"   width="32">
            </div>
            <div class="corner"></div>
        `;
    }

    async connectedCallback() {
        const sendButton = this.shadowRoot.querySelector("img");
        const inputArea = this.shadowRoot.querySelector("input");
        const currentUser = await getCurrentUserData();
        const websocket = await getNotificationWebSocket();
        sendButton.addEventListener("click", () => {
            const message = inputArea.value.trim();
            if (message.length)
            {
                this.chat(currentUser.id, this.targetId, message);

                // websocket.send(JSON.stringify({'message': `sent you a new message.`, 'receiver': this.targetId, 'is_signal': true, 'type': "message", "data": "/Chat/" + currentUser.username}));
            }
            inputArea.value = '';
        });
    }

    disconnectedCallback() {
        if (ws)
            ws.close();
    }

    set targetId(val) {this.setAttribute("target-id", val); }
    get targetId() { return this.getAttribute("target-id"); }

    // webSocket;
    set webSocket(val) { ws = val;}
    get webSocket() {return ws;}


    async chat(sender_id, receiver_id, message) {
        if(ws.readyState === WebSocket.OPEN) {
            // ws.onmessage = (data) => {
            //     console.log(data);
            // };
            ws.send(JSON.stringify({
                'message' : message,
                'sender' : sender_id,
                'receiver' : receiver_id
            }));
        } else {
            console.log('WebSocket connection is not open');
        }
    }
}

customElements.define("chat-footer", ChatFooterComponent);

const cssContent = /*css*/ `
    :host {
        display: flex;
        justify-content: space-between;
        font-family: 'Sansation bold';
        width: 100%;
        margin: 15px 0px;
    }
    
    .container {
        display: flex;
        background-color: #d9d9d920;
        align-items: center;
        color: white;
        font-size: 14px;
        width: 100%;
        margin-left: 40px;
        border-radius: 10px 0px 10px 10px;
    }
    
    .corner {
        border-bottom: 15px solid transparent;
        border-right: 15px solid transparent;
        border-top: 15px solid #d9d9d920;
        margin-right: 40px;
    }
    
    input {
        width: 100%;
        border-radius: 10px;
        border: none;
        background-color: transparent;
        flex: 8;
        min-height: 32px;
        font-family: 'Sansation';
        font-size: 16px;
        color: #ffffff;
        outline: none;
        padding: 10px 20px;
    }
    
    img {
        width: 24px;
        padding: 0 20px;
    }
`;