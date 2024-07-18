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
            <div class="box"></div>
            <div class="list-item">
                <chat-item></chat-item>
                <chat-item></chat-item>
                <chat-item></chat-item>
                <chat-item></chat-item>
                <chat-item></chat-item>
                <chat-item></chat-item>
                <chat-item></chat-item>
                <chat-item></chat-item>
            </div>
        `;
    }
}

const cssContent = /*css*/`

    :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
        background-color: #d9d9d920;
        
    }
    :host .box {
        width: 100%;
        height: 80px;
    }
    
    :host .list-item {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;