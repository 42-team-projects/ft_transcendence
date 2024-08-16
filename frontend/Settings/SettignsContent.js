import { CustomInputField } from "./CustomInputField.js";

export class SettingsContent extends HTMLElement {
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
                <custom-input-field>
                    <h2 slot="label">USERNAME</h2>
                    <input slot="field" type="text" placeholder="esalim"/>
                </custom-input-field>
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
        flex: 4;
        height: 100%;
    }

`;

customElements.define("settings-content", SettingsContent);