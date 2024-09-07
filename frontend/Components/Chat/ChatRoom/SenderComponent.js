import { SenderMessageContainerComponent } from "/Components/Chat/ChatRoom/MessageComponents/SenderMessageContainerComponent.js";

export class SenderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: flex;
                flex-direction: column;
                align-items: end;
                justify-content: end;
                padding: 5px;
            }

            :host::-webkit-scrollbar {
                display: none;
            }
        
        </style>
        <slot ></slot>
    `;
    }

    connectedCallback() {

    }
}

customElements.define("sender-component", SenderComponent);
