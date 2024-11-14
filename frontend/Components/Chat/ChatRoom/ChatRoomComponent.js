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
                <div class="body">
                    <div id="pingpong-logo">
                        <svg width="400" height="143.71" viewBox="0 0 151 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M113.116 0H121.572V36.4249H113.116V0ZM10.4217 9.08904H37.0899V18.1953H10.4217V9.08904ZM0 19.5264H8.45579V54H0V19.5264ZM37.0899 27.3298H10.4217V36.4361H37.0899V27.3298ZM27.9242 18.2094H37.0304V27.3157H27.9242V18.2094ZM39.7255 9.08904H39.0528V36.4246V45.514V45.5308H74.8273V36.4246H74.7777V18.2094H65.6714V36.4246H47.5086V18.1953H74.8496V9.08904H47.5086H39.7255ZM59.8329 24.0617H53.3285V30.5661H59.8329V24.0617ZM84.7238 9.08904H85.1822V9.65267L102.78 31.2872V9.08904H111.236V45.514H102.783H102.78V45.5103L85.1822 24.2138V45.514H76.076V9.08904H84.7238ZM150.292 9.08904H123.624V18.1953H150.292V9.08904ZM132.095 22.7547H150.308V31.8609H150.266V36.4246H150.292V45.5308H123.624V36.4246H141.16V31.8609H132.095V22.7547Z" fill="#d9d9d950"/>
                        </svg>           
                        <h1>No messages yet</h1>
                        <p>Start a conversation with a friend to see it here</p>
                    </div>
                </div>
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
        renderChatHeader(this, item, is_blocked);
        await renderChatBody(this, ("chat_" + room_name));
        if (!is_blocked) {
            const webSocket = setUpWebSocket(this.querySelector(".body"), room_name);
            renderChatFooter(this, webSocket, item.user.id);
        }
    }

    static observedAttributes = [];

    async attributeChangedCallback(attrName, oldValue, newValue) {
        // console.log("attrName: ", attrName);
    }

    async connectedCallback() {

        let playerName = window.location.pathname.substring(6);
        if (!playerName || playerName === undefined)
            return ;
        const player = await getApiData(PROFILE_API_URL + playerName);
        let is_blocked = await getApiData(HOST + "/friend/is_blocked/" + player.user.username);
        if (is_blocked)
            is_blocked = is_blocked.response;
        this.querySelector(".body").innerHTML = '';
        await this.renderChatRoom(player, is_blocked);
    }

    disconnectedCallback() {
    }
    
    adoptedCallback() {
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

        #pingpong-logo {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: #d9d9d980;
        }
`;