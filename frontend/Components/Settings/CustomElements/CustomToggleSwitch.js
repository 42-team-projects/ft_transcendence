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

    connectedCallback() {
        const toggle = this.shadowRoot.querySelector(".toggle");
        toggle.addEventListener("click", () => {
            const isEnable = toggle.classList.contains("enable");
            if (isEnable)
            {
                toggle.classList.remove("enable");
                toggle.querySelector("div").style.background = "#d9d9d9";
            }
            else
            {
                toggle.classList.add("enable");
                toggle.querySelector("div").style.background = "aqua";
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
`;


customElements.define("custom-toggle-switch", CustomToggleSwitch);