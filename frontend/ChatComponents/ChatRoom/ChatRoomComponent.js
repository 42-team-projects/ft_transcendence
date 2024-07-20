export class ChatRoomComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <chat-header></chat-header>
            <div class="body"></div>
            <chat-footer></chat-footer>
        `;
    }
}

const cssContent = /*css*/ `
    :host {
        font-family: 'Sansation bold';
        height: 1000px;
        display: flex;
        flex: 2.5;
        flex-direction: column;
    }


    .body {
        flex: 10;
    }

    .footer {
        flex: 1;
        background-color: green;
    }
`;