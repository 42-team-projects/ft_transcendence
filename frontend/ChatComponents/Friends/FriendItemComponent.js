export class FriendItemComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                    align-items: center;
                }
                p {
                    flex: 3;
                }

            </style>

            <c-hexagon width="48px" height="48px" apply="true" Bcolor="aqua">
                <img slot="content" draggable="false" src="/frontend/assets/profile-assets/profile-image.svg">
            </c-hexagon>
            <p>esalim</p>
            <c-hexagon width="16px" height="16px" apply="true" Bcolor="green">
                <div style="width: 100%; height: 100%; background-color: green;" slot="content"></div>
            </c-hexagon>  
        `;
    }
}