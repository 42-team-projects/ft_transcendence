import { SettingsItem } from "./SettingsItem.js";

export class SettingsMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <settings-item id="account"> ACCOUNT </settings-item>
            <settings-item id="profile"> PROFILE </settings-item>
            <settings-item id="game"> GAME </settings-item>
            <settings-item id="sound"> SOUND </settings-item>
        `;
    }

    connectedCallback() {
        const settingsItems = this.shadowRoot.querySelectorAll("settings-item");
        console.log(settingsItems);
        settingsItems.forEach(elem => {
            elem.addEventListener("click", (e) => {
                elem.color = "aqua";
                elem.borderSize = "2px";
                console.log("hello world");
            })
        });
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