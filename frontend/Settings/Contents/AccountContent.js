import { CustomInputField } from "../CustomInputField.js";
import { CustomToggleSwitch } from "../CustomToggleSwitch.js";

export class AccountContent extends HTMLElement {
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
                <custom-input-field label="USERNAME" description="Username must be unique." placeholder="esalim" type="text"></custom-input-field>
                <custom-input-field label="EMAIL" description="the email will not be modified until you verified it" placeholder="elmehdi.salim@gmail.com" type="email"></custom-input-field>
                <custom-input-field label="PASSWORD" description="the password must be contains at least two lower case and two upper case alphabitecs, two special characters and two numbers." placeholder="elmehdi.salim@gmail.com" type="password"></custom-input-field>
                <custom-toggle-switch></custom-toggle-switch>
            </div>
            <div class="actions">
                <settings-item background-color="#c8000080" color="#c8000090" border-size="2px" width="200px" height="40px"><h3>DELETE ACCOUNT</h3></settings-item>
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
        height: 70%;
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
`;

customElements.define("account-content", AccountContent);