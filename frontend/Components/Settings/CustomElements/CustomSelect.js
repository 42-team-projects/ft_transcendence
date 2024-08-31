export class CustomSelect extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="field-container">
                <div class="label">
                    <h2></h2>
                    <p></p>
                </div>
                <div class="box">
                    <select name="cars" id="cars">
                        <option value="english">🇺🇸 ENGLISH (EN)</option>
                        <option value="french">🇫🇷 FRENCH (FR)</option>
                        <option value="arabic">🇲🇦 ARABIC (AR)</option>
                    </select>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".box").style.width = this.width;
        this.shadowRoot.querySelector(".box").style.height = this.height;
        this.shadowRoot.querySelector("h2").textContent = this.label;
        this.shadowRoot.querySelector("p").textContent = this.description;
    }

    disconnectedCallback() {
        // Clean up if necessary
    }

    static observedAttributes = ["width", "height", "label", "description"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "width")
            this.shadowRoot.querySelector(".box").style.width = newValue;
        if (attrName == "height")
            this.shadowRoot.querySelector(".box").style.height = newValue;
        if (attrName == "label")
            this.shadowRoot.querySelector("h2").textContent = newValue;
        if (attrName == "description")
            this.shadowRoot.querySelector("p").textContent = newValue;
       
    }
    
    set label(value) { this.setAttribute("label", value)};
    get label() { return this.getAttribute("label")};

    set description(value) { this.setAttribute("description", value)};
    get description() { return this.getAttribute("description")};

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
        flex-wrap: wrap;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .field-container {
        width: 90%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
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
        height: 48px;
        gap: 10px;
    }

    p {
        margin: 0;
        padding: 0;
        font-size: 10px;
        color: #d9d9d9;
        margin: 5px 0;
        opacity: 0.5;
    }
    
    select {
        display: flex;
        max-width: 600px;
        width: 100%;
        height: 100%;
        border: 1px solid aqua;
        background: transparent;
        border-radius: 6px;
        position: relative;
        margin-left: 20px;
        color: white;
        padding: 0 10px;
        outline: none;
    }

    option {
        font-size: 16px;
        color: white;
        font-family: 'Sansation Bold';
    }
 
`;

customElements.define("custom-select", CustomSelect);