import { CustomSelect } from "../CustomElements/CustomSelect.js";
import { CustomInputField } from "../CustomElements/CustomInputField.js";
import { CustomToggleSwitch } from "../CustomElements/CustomToggleSwitch.js";
import { CustomAlert } from "../../Tournament/CustomAlert.js";

export class AccountContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="container">
                <custom-input-field class="username-field" label="USERNAME" description="Username must be unique." placeholder="esalim" type="text" readonly="true"></custom-input-field>
                <custom-input-field class="email-field" label="EMAIL" description="the email will not be modified until you verified it" placeholder="elmehdi.salim@gmail.com" type="email" readonly="true"></custom-input-field>
                <custom-input-field class="password-field" label="PASSWORD" description="the password must be contains at least two lower case and two upper case alphabitecs, two special characters and two numbers." placeholder="elmehdi.salim@gmail.com" type="password" readonly="true"></custom-input-field>
                <custom-toggle-switch></custom-toggle-switch>
                <custom-select label="LANGUAGE" description="Select your favorite language."></custom-select>
            </div>
            <div class="actions">
                <settings-item id="delete-account-button" background-color="#c8000080" color="#c8000090" border-size="2px" width="200px" height="40px"><h3>DELETE ACCOUNT</h3></settings-item>
                <settings-item id="save-button" color="aqua" border-size="2px" width="64px" height="40px"><h4>SAVE</h4></settings-item>
            </div>
        `;
    }

    connectedCallback() {
        const usernameField = this.shadowRoot.querySelector(".username-field");
        const emailField = this.shadowRoot.querySelector(".email-field");
        const passwordField = this.shadowRoot.querySelector(".password-field");


        const saveButton = this.shadowRoot.querySelector("#save-button");
        saveButton.addEventListener("click", () => {
            const accountData = {username: null, email: null, password: null};
            if (usernameField.value)
                accountData.username = usernameField.value;
            if (emailField.value)
                accountData.email = emailField.value;
            if (passwordField.value)
                accountData.password = passwordField.value;

            // you can now update the account infos by fetching API.

        });


        const deleteButton = this.shadowRoot.querySelector("#delete-account-button");
        deleteButton.addEventListener("click", () => {
            const alertsConrtainer = window.document.querySelector("body .alerts");
            alertsConrtainer.style.display = "flex";

            const customAlert = new CustomAlert();
            customAlert.innerHTML = `
                <h2 slot="header"> Settings Alert</h2>
                <div slot="body" class="alert-footer">
                    <h2> Are you sure you want to delete your account</h2>
                    <h5> All your inforamtions will be destroyed and there is no way to restore it again.</h5>
                </div>
                <div slot="footer" class="alert-footer buttons">
                    <custom-button id="playBtn" width="160px" height="48px" reverse>DELETE</custom-button>
                    <custom-button id="cancelBtn" width="160px" height="48px" reverse>CANCEL</custom-button>
                </div>
            `;

            alertsConrtainer.appendChild(customAlert);

            // you can now delete the account
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
        height: 100%;
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
`;

customElements.define("account-content", AccountContent);