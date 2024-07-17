export class ChatComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/frontend/ChatComponents/ChatComponent.css">
            
            <div class="main-container">
                <page-name width="13%">
                    <div slot="text" class="pageNameText">
                        <h1>Chat</h1>
                    </div>
                </page-name>
                <chat-list></chat-list>
                <div class="chat-room"></div>
                <div class="friend-list"></div>
            </div>
        `;
    }
}