export class ChatComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
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
    }
}

const cssContent = /*css*/`
:host {
    font-family: 'Sansation bold';
    width: 90%;
    height: 1000px;
    background-color: #d9d9d905;
}

.main-container {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    display: flex;
    justify-content: space-between;
}

`;