import { getCurrentPlayerData } from "/Utils/GlobalVariables.js";
import { CustomInputField } from "/Components/CustomElements/CustomInputField.js";
import { CustomToggleSwitch } from "/Components/CustomElements/CustomToggleSwitch.js";
import { createApiData } from "/Utils/APIManager.js";
import { HOST } from "/Utils/GlobalVariables.js";
import { displayToast } from "/Components/CustomElements/CustomToast.js";

export class ReportContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    async connectedCallback() {
        const playerData = await getCurrentPlayerData();
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="container">
                <custom-input-field label="NAME" placeholder="${playerData.user.username}" type="text" readonly="true" editable="true"></custom-input-field>
                <custom-input-field label="EMAIL" placeholder="${playerData.user.email}" type="email" readonly="true" editable="true"></custom-input-field>
                <div class="feedback-block">
                    <div class="label">
                        <h2>MESSAGE</h2>
                        <p>Please put anythings you want here.</p>
                    </div>
                    <div class="box">
                        <textarea></textarea>
                    </div>
                </div>
            </div>
            <div class="actions">
                <settings-item class="active" color="aqua" border-size="2px" width="64px" height="40px"><h4>SEND</h4></settings-item>
            </div>
        `;

        const message = this.shadowRoot.querySelector(".box textarea");
        const action = this.shadowRoot.querySelector(".actions settings-item");
        let oldMessage = message.value;
        action.addEventListener("click", async () => {
            if (message.value && oldMessage != message.value) {
                const response = await createApiData(HOST + "/api/v1/auth/report/",  JSON.stringify({name: playerData.user.username, email: playerData.user.email, message: message.value}));
                if (!response)
                    displayToast("error", "Opps somethings wrong!!!");
                else
                    displayToast("success", "the email succefully sended");

            }
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
        justify-content: center;
        align-items: center;
        gap: 50px;
    }

    .actions {
        display: flex;
        flex-wrap: wrap-reverse;
        gap: 20px;
        width: 80%;
        align-items: center;
        justify-content: space-around;
    }

    h3 {
        color: white;
    }

    .feedback-block {
        width: 90%;
        max-height: 600px;
        height: 50%;
        flex-wrap: wrap;
        display: flex;
        align-items: start;
        justify-content: center;
        gap: 10px;

    }

    .label {
        flex: 1;
        min-width: 250px;
    }

    .box {
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 250px;
        height: 100%;
        gap: 10px;
    }

    textarea {
        display: flex;
        align-items: center;
        width: calc(100% - 40px);
        height: calc(100% - 20px);
        background: transparent;
        border: 1px solid aqua;
        outline: none;
        color: white;
        border-radius: 6px;
        padding: 10px;
        font-size: 16px;
        margin: 0 20px;
        resize: none;
    }


    p {
        margin: 0;
        padding: 0;
        font-size: 10px;
        color: #d9d9d9;
        margin: 5px 0;
        opacity: 0.5;
    }

    .active {
        border: 2px solid aqua;
        color: aqua;
    }

`;

customElements.define("report-content", ReportContent);