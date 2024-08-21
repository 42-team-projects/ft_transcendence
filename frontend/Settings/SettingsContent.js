import { GameContent } from "./Contents/GameContent.js";
import { ProfileContent } from "./Contents/ProfileContent.js";
import { AccountContent } from "./Contents/AccountContent.js";

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