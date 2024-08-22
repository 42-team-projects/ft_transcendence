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
                animation: slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
            }

            :host::-webkit-scrollbar {
                display: none;
            }
        
            @keyframes slide-right {
                0% {
                  transform: translateX(100%);
                }
                100% {
                  transform: translateX(0);
                }
            }
        </style>
        <slot ></slot>
    `;
    }

    connectedCallback() {

    }
}

customElements.define("sender-component", SenderComponent);
