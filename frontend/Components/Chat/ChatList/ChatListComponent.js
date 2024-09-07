import { fetchData } from "/Utils/Fetcher.js";
import { ChatItemComponent } from "/Components/Chat/ChatList/ChatItemComponent.js";
import { ChatRoomComponent } from "/Components/Chat/ChatRoom/ChatRoomComponent.js";
import { getApiData } from "/Utils/APIManager.js";
import { HOST } from "/Utils/APIUrls.js";
import { renderChatBody, renderChatFooter, renderChatHeader } from "/Components/Chat/configs/ChatConfigs.js";
import { getCurrentUserId } from "/Utils/GlobalVariables.js";
import { setUpWebSocket } from "/Components/Chat/configs/ChatWebSocketManager.js";

export class ChatListComponent extends HTMLElement {
    constructor () {
        super();
        this.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="chat-list">
                <div class="top-box"></div>
                <div class="list-item"></div>
            </div>
        `;
    }

    selectItem;

    get selectItem() { return this.selectItem; }
    
    async createChatItem(item) {
        const chatItem = document.createElement("chat-item");
        chatItem.id = "item_" + item.reciever.id;
        chatItem.userName = item.reciever.username;
        chatItem.profileImage = HOST + item.reciever.avatar;
        chatItem.active = item.reciever.is_active;
        // if (userInfo.stats)
            chatItem.league = "gold";
        // }
        
        chatItem.backgroundColor = "transparent";
        chatItem.opacity = 0.6;
        if (item.last_message) {
            if (item.last_message.content.length > 60)
                chatItem.lastMessage = item.last_message.content.slice(0, 60) + "...";
            else
                chatItem.lastMessage = item.last_message.content;
            chatItem.time = item.last_message.sent_at.split("-")[0];
        }
        chatItem.numberOfMessage = "2";
        chatItem.addEventListener("click", async (e) => {
            const selectItemcomponent = this.querySelectorAll(".list-item #" + this.selectItem);
            Array.from(selectItemcomponent).forEach(elem => {
                elem.backgroundColor = "transparent";
                elem.opacity = 0.6;
            })
            chatItem.backgroundColor = "#051d31";
            chatItem.opacity = 1;
            this.selectItem = chatItem.id;
            this.renderChatRoom(item);
        });
        return chatItem;
    }

    async renderChatRoom(item) {
        const chatRoom = this.parentElement.querySelector("chat-room .container");
        chatRoom.innerHTML = `
            <slot class="header" name="header"></slot>
            <div class="body"></div>
            <slot class="footer" name="footer"></slot>
        `;
        const currentUserId = await getCurrentUserId();
        const room_name = this.generateRoomName(currentUserId, item.reciever.id);
        const webSocket = setUpWebSocket(chatRoom.querySelector(".body"), room_name);
        renderChatHeader(chatRoom, item);
        await renderChatBody(chatRoom, ("chat_" + room_name));
        renderChatFooter(chatRoom, webSocket, item.reciever.id);
    }

    generateRoomName(currentUserId, receiver_id) {
        let room_name;
        if (currentUserId < receiver_id)
            room_name = currentUserId.toString() + receiver_id.toString();
        else
            room_name = receiver_id.toString() + currentUserId.toString();
        return room_name;
    }

    async connectedCallback() {
        const list = this.querySelector(".list-item");
    
        try {
            const data = await getApiData("http://127.0.0.1:8000/chat/conversation_list/");
            if (data) {
                for (const item of data) {
                    const chatItem = await this.createChatItem(item);
                    list.appendChild(chatItem);
                }
            }
        } catch (error) {
            console.error('Error fetching chat data:', error);
        }
    }
}

customElements.define("chat-list", ChatListComponent);

const cssContent = /*css*/`

    chat-list {
        font-family: 'Sansation bold';
        width: 100%;
        height: 100%;
        flex: 1.6;
        display: flex;
    }
    
    .chat-list {
        background-color: #d9d9d920;
        height: 100%;
        flex: 1;
    }
    
    .top-box {
        height: 100px;
    }
    
    .list-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        height: calc(100% - 100px);
        overflow-y: scroll;
    }

    .list-item::-webkit-scrollbar {
        display: none;
    }
`;