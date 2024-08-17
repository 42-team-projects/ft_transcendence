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
                <custom-input-field width="30%" label="USERNAME" placeholder="esalim" type="text"></custom-input-field>
                <custom-input-field width="30%" label="EMAIL" placeholder="elmehdi.salim@gmail.com" type="email"></custom-input-field>
                <custom-input-field width="30%" label="PASSWORD" placeholder="elmehdi.salim@gmail.com" type="password"></custom-input-field>
            </div>
            <div class="actions">
                <settings-item background-color="#c8000080" color="#c8000090" border-size="2px" width="200px" height="40px"><h3>DELETE ACCOUNT</h3></settings-item>
                <settings-item color="aqua" border-size="2px" width="64px" height="40px"><h4>SAVE</h4></settings-item>
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
        height: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .actions {
        display: flex;
        width: 90%;
        align-items: center;
        justify-content: space-between;
    }

    h3 {
        color: white;
    }
`;

customElements.define("settings-content", SettingsContent);