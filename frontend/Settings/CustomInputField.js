export class CustomInputField extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="field-container">
                <h2></h2>
                <div class="inputContainer">
                    <input type="text" readonly/>
                </div>
                <img src="../assets/icons/pencil-icon.svg"></img>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".inputContainer").style.width = this.width;
        this.shadowRoot.querySelector(".inputContainer").style.height = this.height;
        this.shadowRoot.querySelector("h2").textContent = this.label;
        this.shadowRoot.querySelector("input").type = this.type;
        this.shadowRoot.querySelector("input").placeholder = this.placeholder;
    }

    disconnectedCallback() {
        // Clean up if necessary
    }

    static observedAttributes = ["width", "height", "type", "label", "placeholder"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "width")
            this.shadowRoot.querySelector(".inputContainer").style.width = newValue;
        if (attrName == "height")
            this.shadowRoot.querySelector(".inputContainer").style.height = newValue;
        if (attrName == "label")
            this.shadowRoot.querySelector("h2").textContent = newValue;
        if (attrName == "type")
            this.shadowRoot.querySelector("input").type = newValue;
        if (attrName == "placeholder")
            this.shadowRoot.querySelector("input").value = newValue;


    }


    set placeholder(value) { this.setAttribute("placeholder", value)};
    get placeholder() { return this.getAttribute("placeholder")};

    set type(value) { this.setAttribute("type", value)};
    get type() { return this.getAttribute("type")};
    
    set label(value) { this.setAttribute("label", value)};
    get label() { return this.getAttribute("label")};

    set width(value) { this.setAttribute("width", value)};
    get width() { return this.getAttribute("width")};
    
    set height(value) { this.setAttribute("height", value)};
    get height() { return this.getAttribute("height")};


}

const cssContent = /*css*/`
    * {
        margin: 0;
        padding: 0;
    }

    :host {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .field-container {
        width: 90%;
        min-width: 300px;
        height: 100px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    h2 {
        width: 50%;
        min-width: 150px;
    }

    .inputContainer {
        display: flex;
        height: 48px;
    }

    input {
        width: calc(100% - 20px);
        background: #d9d9d950;
        border: none;
        border-radius: 5px;
        outline: none;
        color: white;
        padding: 0px 10px;
        font-size: 16px;
    }
    img {
        width: 20px;
        height: 20px;
        opacity: 0.7;
    }
`;

customElements.define("custom-input-field", CustomInputField);