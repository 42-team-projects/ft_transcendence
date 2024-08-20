import { GameContent } from "./Contents/GameContent.js";

export class SettingsContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                }
                :host {
                    flex: 4;
                    height: calc(100% - 40px);
                    display: flex;
                    overflow: scroll;
                    margin: 20px 0;
                }
            
                :host::-webkit-scrollbar {
                    display: none;
                }
            </style>
            <game-content></game-content>
        `;
    }

    disconnectedCallback() {

    }
}

customElements.define("settings-content", SettingsContent);