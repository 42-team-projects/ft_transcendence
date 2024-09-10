import { fetchData } from "/Utils/Fetcher.js";
import { ChatHeaderComponent } from "/Components/Chat/ChatRoom/ChatHeaderComponent.js";
import { ChatFooterComponent } from "/Components/Chat/ChatRoom/ChatFooterComponent.js";
import { SenderComponent } from "/Components/Chat/ChatRoom/SenderComponent.js";
import { ReceiverComponent } from "/Components/Chat/ChatRoom/ReceiverComponent.js";
import { HOST } from "/Utils/GlobalVariables.js";
import { getApiData } from "/Utils/APIManager.js";

export class ChatRoomComponent extends HTMLElement {
    constructor () {
        super();
        this.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="container">
                <slot class="header" name="header"></slot>
                <div class="body"></div>
                <slot class="footer" name="footer"></slot>
            </div>
        `;
    }

    webSocket;

    static observedAttributes = [];

    async attributeChangedCallback(attrName, oldValue, newValue) {
        console.log("attrName: ", attrName);
    }

    async connectedCallback() {
        if (!this.targetUser)
            return ;
        console.log("this.dataset.userData: ", this.dataset.userData);
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
        chat-room {
            font-family: 'Sansation bold';
            height: 100%;
            display: flex;
            flex: 5;
            flex-direction: column;
        }

        chat-room .container {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
        }

        .body {
            flex: 10;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            width: 100%;
            overflow: hidden;
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