export class CustomInputField extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="container">
                <slot name="label"></slot>
                <slot name="field"></slot>
            </div>
        `;
    }

    disconnectedCallback() {

    }
}

const cssContent = /*css*/`
    * {
        margin: 0;
        padding: 0;
    }

    :host {
        width: 100%;
        height: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .container {
        width: 90%;
        min-width: 300px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    ::slotted(input) {
        height: 48px;
        width: 50%;
        background: transparent;
        border: 1px solid aqua;
        border-radius: 5px;
    }
`;

customElements.define("custom-input-field", CustomInputField);