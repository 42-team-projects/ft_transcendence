import { TwoFactorAuthTemplate } from "/Components/Alert/templates/TwoFactorAuthTemplate.js";
import { CustomAlert } from "/Components/Alert/CustomAlert.js";
import { getApiData } from "/Utils/APIManager.js";
import { DISABLE_2FA_API_URL, ENABLE_2FA_API_URL, VIREFY_2FA_API_URL } from "/Utils/GlobalVariables.js";

export class CustomToggleSwitch extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>${cssContent} </style>
            <div class="toggleContainer">
                <div class="label">
                    <h2>TWO-FACTOR AUTONTICATION</h2>
                    <p>activate two factor authontication.</p>
                </div>
                <div class="toggle">
                    <div class="circle"></div>
                </div>
            </div>

        `;  
    }

    async connectedCallback() {
        const toggle = this.shadowRoot.querySelector(".toggle");
        toggle.addEventListener("click", async () => {
            const isEnable = toggle.classList.contains("enable");
            if (isEnable)
            {
                toggle.classList.remove("enable");
                toggle.querySelector("div").style.background = "#d9d9d9";
                this.active = false;
                const disable = await getApiData(DISABLE_2FA_API_URL);
                console.log(disable);
            }
            else {
                const response = await getApiData(ENABLE_2FA_API_URL);
                if (!response)
                    return ;
                // console.log("Response: ", response);

                const alertsConrtainer = window.document.querySelector("body .alerts");
                alertsConrtainer.style.display = "flex";
                const customAlert = new CustomAlert();
                customAlert.innerHTML = `
                    <h2 slot="header"> ENABLE 2FA ALERT</h2>
                    <div slot="body" class="alert-footer">
                        <two-factor-auth-template base-code="${response.qr_code}"></two-factor-auth-template>
                    </div>
                    <div slot="footer" class="alert-footer buttons">
                        <custom-button class="disable" id="playBtn" width="220px" height="48px" reverse>
                            <div class="enable-2fa-button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24px" height="24px">
                                    <path fill="#fff" d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"/>
                                </svg>
                                <h4>Enable  2FA</h4>
                            </div>
                        </custom-button>
                    </div>
                `;
    
                alertsConrtainer.appendChild(customAlert);


                const customButton = customAlert.querySelector("custom-button");
                const twoFA = alertsConrtainer.querySelector("two-factor-auth-template");

                customButton.addEventListener("click", async () => {
                    const code = twoFA.code;
                    if (code.length != 6)
                    {
                        twoFA.code = "invalide code !!";
                        return ;
                    }
                    if (code && code.length == 6)
                    {
                        const isVerify = await getApiData(VIREFY_2FA_API_URL + "?otp=" + code);
                        if (!isVerify) {
                            twoFA.code = "invalide code !!";
                            return ;
                        }
                        alertsConrtainer.style.display = "none";
                        alertsConrtainer.innerHTML = '';
                        toggle.classList.add("enable");
                        toggle.querySelector("div").style.background = "aqua";
                        this.active = true;  
                    }
                });
            }
        });
    }

    interval;

    set active(val) {
        this.setAttribute("active", val);
    }

    get active() {
        return this.getAttribute("active");
    }

    disconnectedCallback() {
        clearInterval(this.interval);
    }

    static observedAttributes = ["active"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "active")
        {
            const toggle = this.shadowRoot.querySelector(".toggle");
            if (newValue == "true") {
                console.log("active ::: ", newValue);
                toggle.classList.add("enable");
                toggle.querySelector("div").style.background = "aqua";
            }
            else {
                console.log("active ::: ", newValue);
                toggle.classList.remove("enable");
                toggle.querySelector("div").style.background = "#d9d9d9";
            }
        }

    }
}


customElements.define("custom-toggle-switch", CustomToggleSwitch);



const cssContent = /*css*/`
    * {
        margin: 0;
        padding: 0;
    }

    :host {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .toggleContainer {
        width: 90%;
        height: 100px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
    }

    .label {
        width: 50%;
        min-width: 250px;
    }

    .toggle {
        display: flex;
        height: 32px;
        width: 64px;
        background-color: #d9d9d950;
        border-radius: 100px;
    }

    .circle {
        height: 32px;
        width: 32px;
        border-radius: 100%;
        background-color: #d9d9d9;
    }

    p {
        margin: 0;
        padding: 0;
        font-size: 10px;
        color: #d9d9d9;
        margin: 5px 0;
        opacity: 0.5;
    }

    .enable {
        justify-content: end;
        background-color: #00fffc50;
    }

    .disable {
        opacity: 0.6;
    }
`;

