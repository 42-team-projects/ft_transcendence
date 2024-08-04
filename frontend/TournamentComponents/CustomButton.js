const cssContent = /*css*/`
:host {
    display: flex;
    width: 100%;
    height: 50px;
}

.left-side {
    width: 40px;
    height: 100%;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 3px;
    clip-path: polygon(100% 0, 100% 100%, 50% 100%, 0 70%, 0 0);
    background-color: aqua;
    display: flex;
    align-items: center;
    justify-content: right;
}

.left-side div {
    width: 100%;
    height: 100%;
    clip-path: polygon(100% 0, 100% 100%, 50% 100%, 0 70%, 0 0);
    background-color: #1c3143;
}
.center {
    width: 100%;
    height: 100%;
    background-color: #1c3143;
    border-top: 3px solid;
    border-bottom: 3px solid;
    border-color: aqua;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.right-side {
    width: 40px;
    height: 100%;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 3px;
    clip-path: polygon(100% 0, 100% 100%, 50% 100%, 0 70%, 0 0);
    background-color: aqua;
    display: flex;
    align-items: center;
    justify-content: right;
    transform: rotate(180deg);
}

.right-side div {
    width: 100%;
    height: 100%;
    clip-path: polygon(100% 0, 100% 100%, 50% 100%, 0 70%, 0 0);
    background-color: #1c3143;
}
`;

export class CustomButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
                    <style> ${cssContent} </style>
                    <div class="left-side">
                        <div></div>
                    </div>
                    <div class="center">
                        <slot></slot>
                    </div>
                    <div class="right-side">
                        <div></div>
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
        this.shadowRoot.querySelector(".left-side").style.backgroundColor = newValue;
        this.shadowRoot.querySelector(".right-side").style.backgroundColor = newValue;
        this.shadowRoot.querySelector(".center").style.borderColor = newValue;
    }

    changeBackgroundColor(newValue) {
        this.shadowRoot.querySelector(".left-side div").style.backgroundColor = newValue;
        this.shadowRoot.querySelector(".right-side div").style.backgroundColor = newValue;
        this.shadowRoot.querySelector(".center").style.backgroundColor = newValue;
    }

    reverseButton(newVdalue) {

        if (!this.hasAttribute("reverse"))
            return ;
        this.shadowRoot.querySelector(".left-side").style.clipPath = "polygon(100% 0%, 100% 100%, 0 100%, 0 30%, 50% 0)";
        this.shadowRoot.querySelector(".right-side").style.clipPath = "polygon(100% 0%, 100% 100%, 0 100%, 0 30%, 50% 0)";
        this.shadowRoot.querySelector(".left-side div").style.clipPath = "polygon(100% 0%, 100% 100%, 0 100%, 0 30%, 50% 0)";
        this.shadowRoot.querySelector(".right-side div").style.clipPath = "polygon(100% 0%, 100% 100%, 0 100%, 0 30%, 50% 0)";
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