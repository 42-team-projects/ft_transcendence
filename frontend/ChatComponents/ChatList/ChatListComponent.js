export class ChatListComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="top-box"></div>
            <div class="list-item" id="list-items">
            </div>
        `;
        const list = this.shadowRoot.getElementById("list-items");
        const chatItem = document.createElement("chat-item");
        chatItem.setAttribute("background-color", "#051d31");
        list.appendChild(chatItem.cloneNode());
        chatItem.setAttribute("background-color", "transparent");
        chatItem.setAttribute("opacity", 0.6);
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode());
        list.appendChild(chatItem.cloneNode()); 
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
        opacity: 0.7;
        background-color: transparent;
        width: 1.5px;
    }
    
    .list-item::-webkit-scrollbar-track {
        opacity: 0.7;
        border-radius: 100px;
    }
    
    .list-item::-webkit-scrollbar-thumb {
        opacity: 0.7;
        background-color: aqua;
        border-radius: 100px;
    }
`;