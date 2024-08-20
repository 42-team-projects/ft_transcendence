export class CustomSliders extends HTMLElement {
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
                    <div class="left-arrow"></div>
                    <div class="slides">
                        <img src="../assets/settings-assets/game-play.svg"></img>
                    </div>
                    <div class="right-arrow"></div>
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
        flex-direction: column;
        flex-wrap: wrap;
        gap: 10px;
    }

    .label {
        flex: 1;
        min-width: 250px;
    }

    .box {
        display: flex;
        align-items: center;
        justify-content: space-around;
        min-width: 250px;
    }

    .slides {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    p {
        margin: 0;
        padding: 0;
        font-size: 10px;
        color: #d9d9d9;
        margin: 5px 0;
        opacity: 0.5;
    }
 
    .slides img {
        width: 100%;
    }


    .left-arrow, .right-arrow {
        width: 0;
        height: 0;
        border-top: 20px solid transparent;
        border-right: 28px solid aqua;
        border-bottom: 20px solid transparent;
    }
    .right-arrow {
        transform: rotate(180deg);
    }
`;

customElements.define("custom-sliders", CustomSliders);