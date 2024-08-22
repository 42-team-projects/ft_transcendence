import { fetchData } from "../../Utils/Fetcher.js";

export class ChatListComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="chat-list">
                <div class="top-box"></div>
                <div class="list-item"></div>
            </div>
            <chat-room></chat-room>
        `;
    }

    selectItem;

    get selectItem() { return this.selectItem; }
    
    async createChatItem(item) {
        const chatItem = document.createElement("chat-item");
        chatItem.id = item.conversation_name;
    
        try {
            // const userInfo = await fetchData("http://localhost:8080/api/v1/users/" + item.id);
            // if (userInfo)
            // {
                chatItem.userName = item.conversation_name;
                chatItem.profileImage = "../assets/profile-assets/tanjuro.jpg";
                chatItem.active = true;
                // if (userInfo.stats)
                    chatItem.league = "gold";
            // }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    
        chatItem.backgroundColor = "transparent";
        chatItem.opacity = 0.6;
        const data = await fetchData("http://127.0.0.1:9000/chat/last_message/" + item.conversation_name);
        if (data)
        {
            if (data.content.length > 100)
                chatItem.lastMessage = data.content.slice(0, 99) + "...";
            else
                chatItem.lastMessage = data.content;
            chatItem.time = data.sent_at.split("-")[0];
        }
        chatItem.numberOfMessage = "2";
        return chatItem;
    }
    
    async connectedCallback() {
        const list = this.shadowRoot.querySelector(".list-item");
    
        try {
            const data = await fetchData("http://127.0.0.1:9000/chat/conversations/");
            if (data) {
                for (const item of data) {
                    const chatItem = await this.createChatItem(item);
                    list.appendChild(chatItem);
                }
                this.eventListener();
            }
        } catch (error) {
            console.error('Error fetching chat data:', error);
        }
    }
    eventListener() {
        const chatItems = this.shadowRoot.querySelectorAll("chat-item");
        chatItems.forEach(item => {
            item.addEventListener("click", (e) => {
                const selectItemcomponent = this.shadowRoot.getElementById(this.selectItem);
                if (selectItemcomponent)
                {
                    selectItemcomponent.backgroundColor = "transparent";
                    selectItemcomponent.opacity = 0.6;
                }
                item.backgroundColor = "#051d31";
                item.opacity = 1;
                this.selectItem = item.id;
                this.shadowRoot.querySelector("chat-room").targetId = item.id;
            });
        });
    }
}

customElements.define("chat-list", ChatListComponent);

const cssContent = /*css*/`

    :host {
        font-family: 'Sansation bold';
        width: 100%;
        height: 100%;
        flex: 10;
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

