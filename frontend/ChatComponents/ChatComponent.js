export class ChatComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./ChatComponents/ChatComponent.css">
            
            <div class="main-container">
                <page-name width="13%">
                    <div slot="text" class="pageNameText">
                        <h1>Chat</h1>
                    </div>
                </page-name>
                <chat-list></chat-list>
                <friends-list></friends-list>
            </div>
        `;
    }

    connectedCallback() {
        console.log(this.shadowRoot.querySelector("chat-list").textContent);
    }
}