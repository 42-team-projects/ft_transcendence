import { SettingsItem } from "/Components/Settings/SettingsItem.js";
import { ReportContent } from "/Components/Settings/Contents/ReportContent.js";
import { router } from "/root/Router.js";

export class SettingsMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <a id="account" href="/Settings/account">
                <settings-item> ACCOUNT </settings-item>
            </a>
            <a id="profile" href="/Settings/profile">
                <settings-item> PROFILE </settings-item>
            </a>
            <a id="game" href="/Settings/game">
                <settings-item> GAME </settings-item>
            </a>
            <a id="report" href="/Settings/report">
                <settings-item> REPORT </settings-item>
            </a>
        `;
    }
    connectedCallback() {
        const settingsItems = this.shadowRoot.querySelectorAll("a");
        let settingsSection = window.location.pathname.substring(10);
        const settingsContent = this.parentNode.querySelector("settings-content");
        if (!settingsSection || settingsSection == "")
            settingsSection = "account";
        settingsContent.innerHTML = `<${settingsSection}-content></${settingsSection}-content>`;
        const selectItemcomponent = this.shadowRoot.getElementById(settingsSection);
        selectItemcomponent.classList.add("active");
        settingsItems.forEach(elem => {
            elem.addEventListener("click", (e) => {
                e.preventDefault();
                if (settingsSection == elem.id)
                    return ;
                this.selectItem = elem.id;
                const url = new URL(elem.href);
                router.handleRoute(url.pathname);
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

    a {
        height: 48px;
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Sansation bold';
        border: 1px solid #d9d9d9;
        color: #d9d9d9;
        min-width: 150px;
        font-size: 22px;
        outline: none;
        text-decoration: none;
    }

    .active {
        border: 2px solid aqua;
        color: aqua;
        
    }
`;

customElements.define("settings-menu", SettingsMenu);