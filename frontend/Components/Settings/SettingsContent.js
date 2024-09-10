import { GameContent } from "/Components/Settings/Contents/GameContent.js";
import { ProfileContent } from "/Components/Settings/Contents/ProfileContent.js";
import { AccountContent } from "/Components/Settings/Contents/AccountContent.js";

export class SettingsContent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
    }

    disconnectedCallback() {

    }
}

customElements.define("settings-content", SettingsContent);