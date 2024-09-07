export class TwoFactorAuthTemplate extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="container">
                <div class="qr-code-section">
                    <img class="qrcode-displayer" src="/assets/images/alert/qr-code-example.svg"></img>
                </div>
                <div class="code-field">
                    <h2>Enter generated code by your chosen authonticator app</h2>
                    <div class="inputContainer">
                        <img src="/assets/icons/lock-icon.svg" width="24px"></img>
                        <input class="entered-code" type="number"/>
                    </div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        
    }
    
    disconnectedCallback() {

    }

    static observedAttributes = ["base-code"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "base-code") {
            const qrcodeDisplayer = this.shadowRoot.querySelector(".qrcode-displayer");
            qrcodeDisplayer.src = "data:image/png;base64," + newValue;
        }
    }

    set baseCode(val) { this.setAttribute("base-code", val); }
    get baseCode() { return this.getAttribute("base-code"); }

    get code() {
        return this.shadowRoot.querySelector(".entered-code").value;
    }
}


customElements.define("two-factor-auth-template", TwoFactorAuthTemplate);

const cssContent = /*css*/`
    * {
        margin: 0;
        padding: 0;
        user-select: none;
    }

    :host {
        width: 100%;
        height: 100%;
    }

    .container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .qr-code-section {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .qr-code-section img {
        width: 60%;
    }

    .code-field {
        flex: 1.5;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 50px;
    }

    *::-webkit-outer-spin-button,
    *::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .code-field h2 {
        color: #d9d9d980;
        font-family: 'Sansation';
        line-height: 1.3;
    }


    .inputContainer {
        display: flex;
        width: 70%;
        height: 52px;
        background: transparent;
        border: 1px solid aqua;
        border-radius: 6px;
        position: relative;
        gap: 10px;
        padding: 0 10px;
        align-items: center;
        justify-content: center;
    }

    input {
        display: flex;
        align-items: center;
        height: 100%;
        background: transparent;
        width: 100%;
        border: none;
        outline: none;
        color: white;
        border-radius: 5px;
        padding: 0px 10px;
        font-size: 16px;
        -moz-appearance: textfield;
    }
`;