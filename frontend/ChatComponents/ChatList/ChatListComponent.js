import { fetchData } from "../../Utils/Fetcher.js";

// let fakeData = [
//     {
//         id: 1,
//         userId: 1,
//         userName: "ESALIM",
//         targetUserId: 2,
//         lastMessage: "last message ...",
//         time: "12:58 PM",
//         numberOfMessage: 1
//     },
//     {
//         id: 2,
//         userId: 1,
//         userName: "nouakhro",
//         targetUserId: 3,
//         lastMessage: "hello test ...",
//         time: "12:08 PM",
//         numberOfMessage: 12
//     }
// ];

export class ChatListComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="top-box"></div>
            <div class="list-item" id="list-items">
            </div>
        `;
    }

    selectItem;

    get selectItem() { return this.selectItem; }

    createChatItem(item) {
        const chatItem = document.createElement("chat-item");
        chatItem.id = item.id;
        chatItem.backgroundColor = "transparent";
        chatItem.opacity = 0.6;
        chatItem.userName = item.userName;
        chatItem.lastMessage = item.lastMessage;
        chatItem.time = item.time;
        chatItem.numberOfMessage = item.numberOfMessage;
        return chatItem;
    }

    connectedCallback() {
        const list = this.shadowRoot.getElementById("list-items");

        const promise = fetchData("http://localhost:8080/api/v1/chat/3");
        promise.then( data => {
            if (data)
            {
                data.forEach(item => list.appendChild(this.createChatItem(item)));
                this.eventListener();
            }
        });


        // chatItem.setAttribute("background-color", "#051d31");
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
                console.log("seletor id : ", item.id);
                this.selectItem = item.id;
                fetchData("http://localhost:8080/api/v1/users/" + item.id).then( data => console.log(data));
            });
        });
    }
}

const cssContent = /*css*/`

    :host {
        font-family: 'Sansation bold';
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;        
        background-color: #d9d9d920
    }
    :host .top-box {
        width: 100%;
        height: 100px;
    }
    
    :host .list-item {
        width: 100%;
        height: max-content;
        height: 920px;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;

    }

    .list-item::-webkit-scrollbar {
        display: none;
    }
`;