import { fetchData } from "../../Utils/Fetcher.js";

// let APIUrl = "http://localhost:8080/api/v1/conversations/sender=2&receiver="
let APIUrl = "http://127.0.0.1:9000/chat/";
let fakeData = [];

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
    get targetId() { return this,this.getAttribute("val"); }

    static observedAttributes = ["target-id"];

    async attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "target-id")
        {
            this.shadowRoot.querySelector("chat-header").innerHTML = "";
            // await this.renderHeader("http://localhost:8080/api/v1/users/" + newValue);
            this.shadowRoot.querySelector(".body").innerHTML = "";
            await this.renderConversation(APIUrl + newValue);
        }
    }
    // <div class="timer">
    //     <p>12:05 PM</p>
    // </div>


    async renderHeader(url) {
        try {
            const targetUserData = await fetchData(url);
            if (!targetUserData)
            {
                // console.log("this.shadowRoot.innerHTML = '';");
                // this.shadowRoot.innerHTML = '';
                return ;
            }
            const header = this.shadowRoot.querySelector("chat-header");
            header.targetId = targetUserData.id;
            header.userName = targetUserData.userName;
            if (targetUserData.stats)
            {
                header.league = targetUserData.stats.league;
                league = targetUserData.stats.league;
            }
            header.active = targetUserData.active;
            header.profileImage = targetUserData.profileImage;
            profileImage = targetUserData.profileImage;
            return true;
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }

    async renderConversation(apiurl) {
        // try {
        //     const response = await fetch(apiurl);
        //     if (!response.ok) {
        //         throw new Error(`Response status: ${response.status}`);
        //     }
        //     const json = await response.json();
        //     fakeData = json;
        // } catch (error) {
        //     console.error(error.message);
        // }
        // const chatBdoy = this.shadowRoot.querySelector(".body");
        // let receiverComponent = document.createElement("receiver-component");
        // let senderComponent = document.createElement("sender-component");
        // for (let index = 0; index < fakeData.length; index++) {
        //     const element = fakeData[index];
        //     if (element.receiverId === 2)
        //     {
        //         const receiverMessageContainer = document.createElement("receiver-message-container");
        //         receiverMessageContainer.textContent = element.message;
        //         if (index === 0 || index > 0 && fakeData[index - 1].receiverId != element.receiverId)
        //         {
        //             receiverMessageContainer.setAttribute("corner", "");
        //             receiverComponent = document.createElement("receiver-component")
        //         }
        //         receiverMessageContainer.time = element.time.split(" ")[1];
        //         receiverComponent.league = league;
        //         receiverComponent.profileImage = profileImage;
        //         receiverComponent.appendChild(receiverMessageContainer);
        //         chatBdoy.appendChild(receiverComponent);
        //     }
        //     else
        //     {
        //         const senderMessageContainer = document.createElement("sender-message-container");
        //         senderMessageContainer.textContent = element.message;
        //         if (index === 0 || index > 0 && fakeData[index - 1].receiverId != element.receiverId)
        //         {
        //             senderMessageContainer.setAttribute("corner", "");
        //             senderComponent = document.createElement("sender-component");
        //         }
        //         senderMessageContainer.time = element.time.split(" ")[1];
        //         senderComponent.appendChild(senderMessageContainer);
        //         chatBdoy.appendChild(senderComponent);
        //     }
        // }
    }

    async connectedCallback() {
        // if (!this.targetId)
        //     return ;
        // await this.renderHeader("http://localhost:8080/api/v1/users/" + this.targetId);
        // await this.renderConversation(APIUrl);
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }
    
    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }
}

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
