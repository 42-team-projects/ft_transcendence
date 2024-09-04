import { fetchData } from "../../../Utils/Fetcher.js";
import { ChatHeaderComponent } from "./ChatHeaderComponent.js";
import { ChatFooterComponent } from "./ChatFooterComponent.js";
import { SenderComponent } from "./SenderComponent.js";
import { ReceiverComponent } from "./ReceiverComponent.js";
import { HOST } from "../../../Utils/APIUrls.js";
import { getApiData } from "../../../Utils/APIManager.js";

// let APIUrl = "http://localhost:8080/api/v1/Messages/sender=2&receiver="
let APIUrl = "http://127.0.0.1:8000/chat/";

let league;
let profileImage;

export class ChatRoomComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <chat-header></chat-header>
            <div class="body"></div>
            <chat-footer></chat-footer>
        `;
    }


    set targetId(val) {this.setAttribute("target-id", val); }
    get targetId() { return this.getAttribute("target-id"); }

    webSocket;

    static observedAttributes = ["target-id"];

    async attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "target-id")
        {
            
            this.setUpWebSocket(1, 2);
            this.shadowRoot.querySelector("chat-header").innerHTML = "";
            await this.renderHeader(newValue);
            const Messages = await this.getMessages("chat_12");
            console.log("messages: ", Messages[0]);
            this.shadowRoot.querySelector(".body").innerHTML = "";
            await this.renderConversation(Messages);
            this.shadowRoot.querySelector("chat-footer").webSocket = this.webSocket;
            const body = this.shadowRoot.querySelector(".body");
            body.scrollTop = body.scrollHeight;
        }
    }
    // <div class="timer">
    //     <p>12:05 PM</p>
    // </div>


    async renderHeader(url) {
        console.log("url : ", url);
        // const targetUserData = await fetchData(url);
        // if (!targetUserData)
        // {
        //     // console.log("this.shadowRoot.innerHTML = '';");
        //     // this.shadowRoot.innerHTML = '';
        //     return ;
        // }
        const header = this.shadowRoot.querySelector("chat-header");
        console.log("this.targetId : ", url);
        header.targetId = url;
        // header.userName = targetUserData.userName;
        header.userName = url;
        // if (targetUserData.stats)
        // {
            header.league = "gold";
            league = "gold";
        // }
        header.active = false;
        profileImage = "../../assets/images/profile/tanjuro.jpg";
        header.profileImage = "../../assets/images/profile/tanjuro.jpg";
        return true;
    }

    async getMessages(cn) {
        const response = await getApiData(HOST + "/chat/messages?cn=" + cn);
        return response;
    }

    async setUpWebSocket(sender_id, receiver_id) {
        let room_name;
        if (sender_id < receiver_id)
                room_name = sender_id.toString() + receiver_id.toString()
            else
                room_name = receiver_id.toString() + sender_id.toString()
        
        if (!this.webSocket)
        {
            let url = `ws://${window.location.hostname}:8000/ws/chat/chat/${room_name}/`;
            console.log("url : ", url);
            this.webSocket = new WebSocket(url)
        }
        
        console.log("webSocket : ", this.webSocket);
        this.webSocket.onmessage = (e) => {
            let data = JSON.parse(e.data)
        
            if (data.Error) {
                console.log(data.Error)
            }
            else {
                this.renderConversation([data]);
                const body = this.shadowRoot.querySelector(".body");
                body.scrollTop = body.scrollHeight;
            }
        }
    }
    checker;
    async renderConversation(Messages) {
        const chatBody = this.shadowRoot.querySelector(".body");
        let receiverComponent = document.createElement("receiver-component");
        let senderComponent = document.createElement("sender-component");
        for (let index = 0; index < Messages.length; index++) {
            const element = Messages[index];
            if (element.user == 3)
            {
                const receiverMessageContainer = document.createElement("receiver-message-container");
                receiverMessageContainer.textContent = element.content;
                if (this.checker != element.sender)
                {
                    receiverMessageContainer.setAttribute("corner", "");
                    receiverComponent = document.createElement("receiver-component")
                }
                receiverMessageContainer.time = element.sent_at.split("-")[0];
                receiverComponent.league = "gold";
                receiverComponent.profileImage = "../../assets/images/profile/tanjuro.jpg";
                receiverComponent.appendChild(receiverMessageContainer);
                chatBody.appendChild(receiverComponent);
            }
            else
            {
                const senderMessageContainer = document.createElement("sender-message-container");
                senderMessageContainer.textContent = element.content;
                if (this.checker != element.sender)
                {
                    senderMessageContainer.setAttribute("corner", "");
                    senderComponent = document.createElement("sender-component");
                }
                senderMessageContainer.time = element.sent_at.split("-")[0];
                senderComponent.appendChild(senderMessageContainer);
                chatBody.appendChild(senderComponent);
            }
            this.checker = Messages[index].sender;
        }

    }

    async connectedCallback() {
        if (!this.targetId)
            return ;
        console.log("this.targetId: ", this.targetId);
        this.setUpWebSocket(1, 2);

        await this.renderHeader(this.targetId);
        const Messages = await this.getMessages("chat_12");
        this.renderConversation(Messages);
        this.shadowRoot.querySelector("chat-footer").webSocket = this.webSocket;
        const body = this.shadowRoot.querySelector(".body");
        body.scrollTop = body.scrollHeight;
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }
    
    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }
}

customElements.define("chat-room", ChatRoomComponent);


const cssContent = /*css*/`
        :host {
            font-family: 'Sansation bold';
            height: 100%;
            display: flex;
            flex: 2.5;
            flex-direction: column;
        }

        .body {
            flex: 10;
            display: flex;
            flex-direction: column;
            width: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
        }

        .body::-webkit-scrollbar {
            opacity: 0.7;
            background-color: transparent;
            width: 1px;
        }

        .body::-webkit-scrollbar-track {
            opacity: 0.7;
            border-radius: 100px;
        }

        .body::-webkit-scrollbar-thumb {
            opacity: 0.7;
            background-color: #d9d9d9;
            border-radius: 100px;
        }

        .timer p {
            margin: 0;
            font-size: 10px;
            color: #C5C4C490;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
        }
`;