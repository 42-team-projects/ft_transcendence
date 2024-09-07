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
        this.style.width = this.width;
        this.style.height = this.height;
        this.style.borderColor = this.color;
        this.style.color = this.color;
        this.style.backgroundColor = this.backgroundColor;
    }

    disconnectedCallback() {

    }

    set height(val) { this.setAttribute("height", val);}
    get height() {return this.getAttribute("height");}

    set width(val) { this.setAttribute("width", val);}
    get width() {return this.getAttribute("width");}

    set color(val) { this.setAttribute("color", val);}
    get color() {return this.getAttribute("color");}
    
    set backgroundColor(val) { this.setAttribute("background-color", val);}
    get backgroundColor() {return this.getAttribute("background-color");}
    
    set borderSize(val) { this.setAttribute("border-size", val);}
    get borderSize() {return this.getAttribute("border-size");}

    static observedAttributes = ["color", "background-color", "border-size", "width", "height"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "width")
            this.style.width = newValue;
        else if (attrName == "height")
            this.style.height = newValue;
        else if (attrName == "color")
        {
            this.style.borderColor = newValue;
            this.style.color = newValue;
        }
        else if (attrName == "border-size")
            this.style.borderWidth = newValue;
        else if (attrName == "background-color")
            this.style.backgroundColor = newValue;
    }

}

const cssContent = /*css*/`

:host {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Sansation bold';
    min-width: 150px;
    font-size: 22px;

}

::slotted(h3) {
    font-size: 16px;
}

`;

customElements.define("settings-item", SettingsItem);