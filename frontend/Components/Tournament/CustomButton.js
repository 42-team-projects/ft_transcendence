const cssContent = /*css*/`
:host {
    display: flex;
    width: 100%;
    height: 56px;
    background-color: aqua;
    clip-path: polygon(0 0, calc(100% - 20px) 0%, 100% 20px, 100% 100%, 20px 100%, 0% calc(100% - 20px));
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Sansation Bold';
    cursor: pointer;
}

.center {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background-color: #1c3143;
    clip-path: polygon(0 0, calc(100% - 20px) 0%, 100% 20px, 100% 100%, 20px 100%, 0% calc(100% - 20px));
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Sansation Bold';
}

:host ::slotted(div) {
    font-family: 'Sansation Bold';
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 10px;
}

`;

export class CustomButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
                    <style> ${cssContent} </style>
                    <div class="center">
                        <slot></slot>
                    </div>
            `;
    }

    connectedCallback() {
        if (this.width)
            this.style.width = this.width;
        if (this.height)
            this.style.height = this.height;
        if (this.borderColor)
            this.changeBorderColor(this.borderColor);
        if (this.backgroundColor)
            this.changeBackgroundColor(this.backgroundColor);
        if (this.reverse)
            this.reverseButton(this.reverse);
    }


    disconnectedCallback() {
    }


    changeBorderColor(newValue) {
        this.shadowRoot.style.backgroundColor = newValue;
    }

    changeBackgroundColor(newValue) {
        this.shadowRoot.querySelector(".center").style.backgroundColor = newValue;
    }

    reverseButton(newValue) {
        if (!this.hasAttribute("reverse"))
            return ;
        this.style.clipPath = "polygon(20px 0%, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0% 20px)";
        this.shadowRoot.querySelector(".center").style.clipPath = "polygon(20px 0%, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0% 20px)";
    }

    set width(val) { this.setAttribute("width", val);}
    get width() { return this.getAttribute("width");}

    set height(val) { this.setAttribute("height", val);}
    get height() { return this.getAttribute("height");}
    
    set reverse(val) { this.setAttribute("reverse", val);}
    get reverse() { return this.getAttribute("reverse");}
    
    set borderColor(val) { this.setAttribute("border-color", val);}
    get borderColor() { return this.getAttribute("border-color");}

    set backgroundColor(val) { this.setAttribute("background-color", val);}
    get backgroundColor() { return this.getAttribute("background-color");}

    static observedAttributes = ["width", "height", "border-color", "background-color", "reverse"];

    attributeChangedCallback(attrName, oldVdalue, newValue) {
        if (attrName == "width")
            this.style.width = newValue;
        else if (attrName == "height")
            this.style.height = newValue;
        else if (attrName == "border-color")
            this.changeBorderColor(newValue);
        else if (attrName == "background-color")
            this.changeBackgroundColor(newValue);
        else if (attrName == "reverse")
            this.reverseButton(newValue);

    }
}

customElements.define("custom-button", CustomButton);
