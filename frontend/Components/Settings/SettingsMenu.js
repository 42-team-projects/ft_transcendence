import { SettingsItem } from "/Components/Settings/SettingsItem.js";
import { ReportContent } from "/Components/Settings/Contents/ReportContent.js";

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
            <settings-item id="report"> FEEDBACK </settings-item>
        `;
    }
    connectedCallback() {
        const settingsItems = this.shadowRoot.querySelectorAll("settings-item");
        const firstElement = settingsItems[0];
        this.selectItem = firstElement.id;
        firstElement.color = "aqua";
        firstElement.borderSize = "2px";
        const settingsContent = this.parentNode.querySelector("settings-content");
        settingsContent.innerHTML = `<${firstElement.id}-content></${firstElement.id}-content>`;
        settingsItems.forEach(elem => {
            elem.addEventListener("click", (e) => {
                if (this.selectItem == elem.id)
                    return ;
                const selectItemcomponent = this.shadowRoot.getElementById(this.selectItem);
                if (selectItemcomponent)
                {
                    selectItemcomponent.color = "#d9d9d9";
                    selectItemcomponent.borderSize = "1px";
                }
                this.selectItem = elem.id;
                elem.color = "aqua";
                elem.borderSize = "2px";
                settingsContent.innerHTML = `<${elem.id}-content></${elem.id}-content>`;
            })
        });
    }

    disconnectedCallback() {

    }

    selectItem;

    get selectItem() { return this.selectItem; }
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