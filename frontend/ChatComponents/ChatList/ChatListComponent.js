import { fetchData } from "../../Utils/Fetcher.js";

let fakeData = [];

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
        chatItem.id = item.id;
    
        try {
            // const userInfo = await fetchData("http://localhost:8080/api/v1/users/" + item.id);
            // if (userInfo)
            // {
                chatItem.userName = item.conversation_name;
                chatItem.profileImage = "/frontend/assets/profile-assets/tanjuro.jpg";
                chatItem.active = true;
                // if (userInfo.stats)
                    chatItem.league = "gold";
            // }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    
        chatItem.backgroundColor = "transparent";
        chatItem.opacity = 0.6;
        // chatItem.lastMessage = item.lastMessage;
        chatItem.time = item.created_at.split("-")[0];
        // chatItem.numberOfMessage = item.numberOfMessage;
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
                // this.eventListener();
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


function chat(sender_id, receiver_id) {
    sender = sender_id
    receiver = receiver_id
    if (sender < receiver)
        room_name = sender + '_' + receiver
    else
        room_name = receiver + '_' + sender

    url = 'ws://' + `${window.location.host}/ws/chat/${room_name}/`


    const webSocket = new WebSocket(url)


    webSocket.onmessage = function(e) {
        let data = JSON.parse(e.data)

        console.log(data)
        if (data.Error) {
            console.log(data.Error)
        }
        else {
            let messages = document.getElementById('messages')
            messages.insertAdjacentHTML('afterbegin', `<div>
                <p> ${data.content} </p>
            </div>`)
            console.log(data.content)
        }
    }

    let form = document.getElementById('form')
    form.addEventListener('submit', (e)=> {
        e.preventDefault()
        let message = e.target.message.value
        webSocket.send(JSON.stringify({
            'message' : message,
            'sender' : sender,
            'receiver' : receiver
        }))
        form.reset()
    })
}