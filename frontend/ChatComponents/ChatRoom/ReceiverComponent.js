export class ReceiverComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        const hasCorner = this.hasAttribute("corner");
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    padding: 5px;
                }
                * {
                    margin: 0;
                }
                .content {
                    margin-top: 20px;
                }

            </style>
            <c-hexagon class="profile" width="48px" height="47px" apply="true" bcolor="aqua">
                <img slot="content" draggable="false" src="/frontend/images/svg-header/profile.jpeg" width="48px">
            </c-hexagon>
            <div class="content">
                <slot ></slot>
            </div>
        `;
    }

}