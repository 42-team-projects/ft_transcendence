export class FriendRequestListComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode : 'open'})
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="icon">
                <img loading="lazy" draggable="false" src="/assets/icons/account-icon.svg" alt="friends">
            </div>
            <div class="mainContainer">

            </div>
        `;
    }

    connectedCallback() {

    }
}

customElements.define("friend-request-list", FriendRequestListComponent);

const cssContent = /*css*/`

    * {
        margin: 0;
        padding: 0;
    }


    :host {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .icon {
        height: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .mainContainer {
        position: absolute;
        bottom: 0;
        width: 100px;
        height: 100px;
    }


`;
