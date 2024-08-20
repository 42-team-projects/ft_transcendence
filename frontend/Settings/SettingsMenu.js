import { SettingsItem } from "./SettingsItem.js";

export class SettingsMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <settings-item color="#00fffc" border-size="2px"> ACCOUNT </settings-item>
            <settings-item> PROFILE </settings-item>
            <settings-item> GAME </settings-item>
            <settings-item> SOUND </settings-item>
            <settings-item> SOUND </settings-item>
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
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 50px;
    }
`;

customElements.define("settings-menu", SettingsMenu);