export class SettingsItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <slot></slot>
        `;
    }

    connectedCallback() {
        this.style.borderColor = this.color;
        this.style.color = this.color;
    }

    disconnectedCallback() {

    }

    set color(val) { this.setAttribute("color", val);}
    get color() {return this.getAttribute("color");}
    
    set borderSize(val) { this.setAttribute("border-size", val);}
    get borderSize() {return this.getAttribute("border-size");}

    static observedAttributes = ["color", "border-size"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "color")
        {
            this.style.borderColor = newValue;
            this.style.color = newValue;
        }
        if (attrName == "border-size")
            this.style.borderWidth = newValue;
    }

}

const cssContent = /*css*/`

:host {
    height: 48px;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #d9d9d9;
    color: #d9d9d9;
    font-size: 22px;
    font-family: 'Sansation bold';
    min-width: 150px;
}

`;

customElements.define("settings-item", SettingsItem);