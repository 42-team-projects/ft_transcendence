import { CustomInputField } from "../CustomInputField.js";
import { CustomToggleSwitch } from "../CustomToggleSwitch.js";
import { CustomUnorderedList } from "../CustomUnorderedList.js";
import { CustomUnorderedListItem } from "../CustomUnorderedListItem.js";

export class ProfileContent extends HTMLElement {
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
                <c-hexagon class="c-hexagon-profile" width="200px" height="200px" apply="true">
                    <div slot="content" class="c-hexagon-content"></div>
                </c-hexagon>
                <custom-input-field label="FULL NAME" placeholder="esalim" type="text"></custom-input-field>
                <custom-input-field label="COVER" description="Supported extenstions: JPEG JPG PNG SVG." type="file"></custom-input-field>
                <custom-unordered-list label="LINKS" description="Max links you can add is 4."></custom-unordered-list>
            </div>
            <div class="actions">
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
        height: calc(100% - 50px);
        display: flex;
        gap: 50px;
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
        gap: 50px;
    }

    .actions {
        display: flex;
        flex-wrap: wrap-reverse;
        gap: 20px;
        width: 90%;
        align-items: center;
        justify-content: space-around;
    }

    h3 {
        color: white;
    }

    .c-hexagon-content {
        width: 100%;
        height: 100%;
        background: url("../../assets/profile-assets/tanjuro.jpg");
        background-position: center;
        background-size: cover;
    }

`;

customElements.define("profile-content", ProfileContent);