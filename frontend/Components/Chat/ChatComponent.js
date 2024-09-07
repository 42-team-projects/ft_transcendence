import { getCurrentPlayerData } from "/Utils/GlobalVariables.js";
import { ChatListComponent } from "/Components/Chat/ChatList/ChatListComponent.js";
import { ChatRoomComponent } from "/Components/Chat/ChatRoom/ChatRoomComponent.js";
import { FriendsListComponent } from "/Components/Chat/Friends/FriendsListComponent.js";

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
                <chat-room></chat-room>
                <friends-list></friends-list>
            </div>
        `;
    }

    async connectedCallback() {
        await getCurrentPlayerData();
    }
}

customElements.define("chat-page", ChatComponent);

const cssContent = /*css*/`
:host {
    font-family: 'Sansation bold';
    width: 95%;
    height: 95%;
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