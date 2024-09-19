import { fetchData } from "/Utils/Fetcher.js";

import { getApiData } from "/Utils/APIManager.js";
import { HOST } from "/Utils/GlobalVariables.js";
import { getCurrentUserId } from "/Utils/GlobalVariables.js";
import { setUpWebSocket } from "/Components/Chat/configs/ChatWebSocketManager.js";
import { router } from "/root/Router.js";
import { PROFILE_API_URL } from "/Utils/GlobalVariables.js";


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
    
    async createChatItem(item, user) {
        const player = await getApiData(PROFILE_API_URL + user.username);
        const chatItem = document.createElement("chat-item");
        chatItem.id = "item_" + user.id;
        chatItem.userName = user.username;
        chatItem.profileImage = HOST + user.avatar;
        chatItem.active = player.active;
        chatItem.league = player.stats.league;
        
        if (user.username === this.playerName) {
            chatItem.backgroundColor = "#051d31";
            chatItem.opacity = 1;
        }
        else {
            chatItem.backgroundColor = "transparent";
            chatItem.opacity = 0.6;
        }
        if (item && item.last_message) {
            if (item.last_message.content.length > 60)
                chatItem.lastMessage = item.last_message.content.slice(0, 60) + "...";
            else
                chatItem.lastMessage = item.last_message.content;
            chatItem.time = item.last_message.sent_at.split("-")[0];
        }
        chatItem.numberOfMessage = "2";
        chatItem.addEventListener("click", async (e) => {
            e.preventDefault();
            if (user.username === this.playerName)
                return ;
            const url = new URL(HOST + "/Chat/" + user.username);
            router.handleRoute(url.pathname);
        });
        return chatItem;
    }

    playerName;
    async connectedCallback() {
        const list = this.querySelector(".list-item");
        this.playerName = window.location.pathname.substring(6);
        let isPlayerExest = false;
        try {
            const data = await getApiData(HOST + "/chat/conversation_list/");
            if (data) {
                for (const item of data) {
                    const chatItem = await this.createChatItem(item, item.reciever);
                    if (item.reciever.username === this.playerName)
                    {
                        list.prepend(chatItem);
                        isPlayerExest = true;
                    }
                    else
                        list.appendChild(chatItem);
                }
            }
            if (!isPlayerExest && this.playerName && this.playerName !== undefined) {
                const player = await getApiData(PROFILE_API_URL + this.playerName);
                const chatItem = await this.createChatItem(null, player.user);
                list.prepend(chatItem);
            }
        } catch (error) {
            const errorContainer = document.body.querySelector(".display-errors");
            if (errorContainer) {
                errorContainer.innerHTML = 'Error fetching chat data';
            }
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