export class SenderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: end;
                    justify-content: end;
                    padding: 5px;
                }
            </style>
            <slot ></slot>
        `;
    }
}