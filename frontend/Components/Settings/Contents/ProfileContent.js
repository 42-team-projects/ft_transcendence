import { CustomInputField } from "../CustomElements/CustomInputField.js";
import { CustomToggleSwitch } from "../CustomElements/CustomToggleSwitch.js";
import { CustomUnorderedList } from "../CustomElements/CustomUnorderedList.js";
import { CustomUnorderedListItem } from "../CustomElements/CustomUnorderedListItem.js";

export class ProfileContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="container">
                <c-hexagon class="c-hexagon-profile" width="200px" height="200px" apply="true">
                    <div slot="content" class="c-hexagon-content"></div>
                </c-hexagon>
                <custom-input-field class="full-name-field" label="FULL NAME" placeholder="esalim" type="text"></custom-input-field>
                <custom-input-field class="cover-field" label="COVER" description="Supported extenstions: JPEG JPG PNG SVG." type="file"></custom-input-field>
                <custom-unordered-list label="LINKS" description="Max links you can add is 4."></custom-unordered-list>
            </div>
            <div class="actions">
                <settings-item id="save-button" color="aqua" border-size="2px" width="64px" height="40px"><h4>SAVE</h4></settings-item>
            </div>
        `;
    }

    connectedCallback() {
        const fullNameField = this.shadowRoot.querySelector(".full-name-field");
        const saveButton = this.shadowRoot.querySelector("#save-button");
        saveButton.addEventListener("click", async () => {
            const profileInfos = {fullName: null, active: false};
            if (fullNameField.value)
            {
                profileInfos.fullName = fullNameField.value;
                const response = await fetch("http://127.0.0.1:8000/api/v1/players/5/", {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(profileInfos),

                });
                console.log("response: ", response);
            }

            // you can now update the account infos by fetching API.

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
        background: url("../../assets/images/profile/tanjuro.jpg");
        background-position: center;
        background-size: cover;
    }

`;

customElements.define("profile-content", ProfileContent);