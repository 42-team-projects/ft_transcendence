export class NotificationComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="parent-box">
                <div class="top-line"></div>
                <div class="main-box">
                    <div class="mainContainer">
                        <slot></slot>
                    </div>
                </div>
                <div class="bottom-box"></div>
            </div>
        `;
    }

    connectedCallback() {
        this.style.width = this.width;
        this.style.height = this.height;

    }

    disconnectedCallback() {

    }

    static observedAttributes = ["width", "height"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "width")
            this.style.width = newValue;
        else if (attrName == "height")
            this.style.height = newValue;

    }

    set width(val) {this.setAttribute("width", val);}
    get width() { return this.getAttribute("width"); }

    set height(val) {this.setAttribute("height", val);}
    get height() { return this.getAttribute("height"); }
}

customElements.define("notification-component", NotificationComponent);

const cssContent = /*css*/`

:host {
    width: 100%;
    height: 96px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 600px;
    box-shadow: 2px 2px 10px 2px #00fffc40, inset 2px 2px 10px 2px #00fffc40;
}

.parent-box {
    width: 100%;
    height: 100%;
    border: 1px solid #00fffc80;
    clip-path: polygon(100% 0, 100% calc(100% - 32px), calc(100% - 24px) 100%, 0 100%, 0 0);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.top-line {
    height: 2px;
    width: 66%;
    background: #00fffc80;
    position: absolute;
    top: 8px;
    border-radius: 100px;

}

.bottom-box {
    width: 50%;
    height: 50%;
    border-color: aqua;
    border-style: solid;
    border-right: 2px;
    border-top: 2px;
    position: absolute;
    bottom: 8px;
    left: 8px;
}

.main-box {
    width: 90%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mainContainer {
    width: calc(100% - 3px);
    height: calc(100% - 3px);
}

`;