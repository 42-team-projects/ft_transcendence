import { fetchData } from "/Utils/Fetcher.js";
import { ChatHeaderComponent } from "/Components/Chat/ChatRoom/ChatHeaderComponent.js";
import { ChatFooterComponent } from "/Components/Chat/ChatRoom/ChatFooterComponent.js";
import { SenderComponent } from "/Components/Chat/ChatRoom/SenderComponent.js";
import { ReceiverComponent } from "/Components/Chat/ChatRoom/ReceiverComponent.js";
import { getApiData } from "/Utils/APIManager.js";
import { getCurrentUserId, PROFILE_API_URL, HOST } from "/Utils/GlobalVariables.js";
import { setUpWebSocket } from "/Components/Chat/configs/ChatWebSocketManager.js";
import { renderChatHeader, renderChatBody, renderChatFooter } from "/Components/Chat/configs/ChatConfigs.js";
import { ChatItemComponent } from "/Components/Chat/ChatList/ChatItemComponent.js";

export class ChatRoomComponent extends HTMLElement {
    constructor () {
        super();
        this.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="container">
                <chat-header></chat-header>
                <div class="body"></div>
                <slot class="footer" name="footer"></slot>
            </div>
        `;
    }



    generateRoomName(currentUserId, receiver_id) {
        let room_name;
        if (currentUserId < receiver_id)
            room_name = currentUserId.toString() + receiver_id.toString();
        else
            room_name = receiver_id.toString() + currentUserId.toString();
        return room_name;
    }

    
    async renderChatRoom(item, is_blocked) {
        const currentUserId = await getCurrentUserId();
        const room_name = this.generateRoomName(currentUserId, item.user.id);
        const webSocket = setUpWebSocket(this.querySelector(".body"), room_name);
        renderChatHeader(this, item, is_blocked);
        await renderChatBody(this, ("chat_" + room_name));
        if (!is_blocked)
            renderChatFooter(this, webSocket, item.user.id);
    }

    static observedAttributes = [];

    async attributeChangedCallback(attrName, oldValue, newValue) {
        console.log("attrName: ", attrName);
    }

    async connectedCallback() {

        let playerName = window.location.pathname.substring(6);
        if (!playerName || playerName === undefined)
            return ;
        const player = await getApiData(PROFILE_API_URL + playerName);
        let is_blocked = await getApiData(HOST + "/friend/is_blocked/" + player.user.username);
        console.log("is_blocked: ", is_blocked);
        if (is_blocked)
            is_blocked = is_blocked.response;
        await this.renderChatRoom(player, is_blocked);
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