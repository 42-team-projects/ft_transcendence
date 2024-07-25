import { fetchData } from "../../Utils/Fetcher.js";

let APIUrl = "http://localhost:8080/api/v1/conversations/sender=2&receiver="
let fakeData = [];

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
    get targetId() { return this,this.getAttribute("val"); }

    static observedAttributes = ["target-id"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "target-id")
        {
            this.shadowRoot.querySelector("chat-header").innerHTML = "";
            this.renderHeader("http://localhost:8080/api/v1/users/" + newValue);
            this.shadowRoot.querySelector(".body").innerHTML = "";
            this.renderConversation(APIUrl + newValue);
        }
    }
    // <div class="timer">
    //     <p>12:05 PM</p>
    // </div>

    async renderHeader(url) {
        console.log(url);
        try {
            const targetUserData = await fetchData(url);
            if (!targetUserData)
                return;
            const header = this.shadowRoot.querySelector("chat-header");
            header.targetId = targetUserData.id;
            header.userName = targetUserData.userName;
            if (targetUserData.stats)
                header.league = targetUserData.stats.league;
            header.active = targetUserData.active;
            header.profileImage = targetUserData.profileImage;
        } catch (error) {
            console.error('Error fetching user info:', error);
        }

    }

    async renderConversation(apiurl) {
        try {
            const response = await fetch(apiurl);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            fakeData = json;
        } catch (error) {
            console.error(error.message);
        }
        const chatBdoy = this.shadowRoot.querySelector(".body");
        fakeData.forEach(element => {
            if (element.receiverId == 2)
            {
                const receiverComponent = document.createElement("receiver-component");
                const receiverMessageContainer = document.createElement("receiver-message-container");
                receiverMessageContainer.textContent = element.message;
                receiverMessageContainer.setAttribute("corner", "");
                receiverComponent.appendChild(receiverMessageContainer);
                chatBdoy.appendChild(receiverComponent);
            }
            else
            {
                const senderComponent = document.createElement("sender-component");
                const senderMessageContainer = document.createElement("sender-message-container");
                senderMessageContainer.textContent = element.message;
                senderMessageContainer.setAttribute("corner", "");
                senderComponent.appendChild(senderMessageContainer);
                chatBdoy.appendChild(senderComponent);
            }
        });
    }

    connectedCallback() {
        this.renderHeader("http://localhost:8080/api/v1/users/" + this.targetId);
        this.renderConversation(APIUrl);
    }
}

const cssContent = `
        :host {
            font-family: 'Sansation bold';
            height: 1000px;
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