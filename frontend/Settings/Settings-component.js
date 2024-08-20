import { SettingsMenu } from "./SettingsMenu.js";
import { AccountContent } from "./Contents/AccountContent.js";
import { SettingsContent } from "./SettingsContent.js";

export class SettingsComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <page-name width="15%">
                <h2 slot="text">SETTINGS</h2>
            </page-name>
            <div style="height:62px; width:100%;"></div>
            <div class="mainContainer">
                <settings-menu></settings-menu>
                <div class="separator"></div>
                <settings-content></settings-content> 
            </div>
        `;
    }

    disconnectedCallback() {
        // Clean up if necessary
    }

    static observedAttributes = [];

    attributeChangedCallback(attrName, oldValue, newValue) {
        // Handle attribute changes if needed
    }
}

const cssContent = /*css*/`
    * {
        margin: 0;
        padding: 0;
    }

    :host {
        position: relative;
        width: 100%;
        height: 100%;
        color: white;
        background: #d9d9d910;
    }
    .mainContainer {
        height: calc(100% - 60px);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        
    }
    .separator {
        width: 4px;
        height: 70%;
        background-color: #d9d9d960;
    }
`;

customElements.define("settings-page", SettingsComponent);
