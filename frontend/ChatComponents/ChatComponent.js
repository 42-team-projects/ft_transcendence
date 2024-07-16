export class ChatComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/frontend/ChatComponents/ChatComponent.css">
            <div class="main-container">
                <div class="chat-list"></div>
                <div class="chat-room"></div>
                <div class="friend-list"></div>
            </div>
        `;
    }
}