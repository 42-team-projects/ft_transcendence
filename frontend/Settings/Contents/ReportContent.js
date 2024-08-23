import { CustomInputField } from "../CustomInputField.js";
import { CustomToggleSwitch } from "../CustomToggleSwitch.js";

export class ReportContent extends HTMLElement {
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
                <custom-input-field label="NAME" description="Please put your name." placeholder="example" type="text"></custom-input-field>
                <custom-input-field label="EMAIL" description="Please Put your email." placeholder="example@mail.com" type="email"></custom-input-field>
                <div class="feedback-block">
                    <div class="label">
                        <h2>MESSAGE</h2>
                        <p>Please insert anythings you want here.</p>
                    </div>
                    <textarea ></textarea>
                </div>
            </div>
            <div class="actions">
                <settings-item color="aqua" border-size="2px" width="64px" height="40px"><h4>SEND</h4></settings-item>
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
        height: 50%;
        max-height: 600px;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        gap: 10px;

    }

    textarea {
        min-height: 48px;
        display: flex;
        background: transparent;
        border: none;
        outline: none;
        color: white;
        border-radius: 5px;
        padding: 0px 10px;
        font-size: 16px;
        width: 70%;
        height: 50%;
        border: 1px solid aqua;
        border-radius: 6px;
        margin-left: 50px;
    }

    textarea::-webkit-scrollbar {
        display: none;
    } 

    p {
        margin: 0;
        padding: 0;
        font-size: 10px;
        color: #d9d9d9;
        margin: 5px 0;
        opacity: 0.5;
    }

`;

customElements.define("report-content", ReportContent);