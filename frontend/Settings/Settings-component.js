export class SettingsComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML == '<h1>hello world</h1>';
    }

    connectedCallback() {
        
    }

    disconnectedCallback() {

    }
}

customElements.define("settings-page", SettingsComponent);