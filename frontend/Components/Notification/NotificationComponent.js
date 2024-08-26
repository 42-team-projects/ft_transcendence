export class NotificationComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="parent-box active"></div>
            <div class="content">
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
        // const interval = setInterval(() => {
        //     clearInterval(interval);
        //     this.remove();
        // }, 5000);
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
/* Google Fonts - Poppins */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:host {
    width: 100%;
    min-height: 100px;
    height: auto;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    position: relative;
    box-shadow: 2px 2px 10px 2px #00fffc40, inset 2px 2px 10px 2px #00fffc40;
    animation: slide-right 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.parent-box {
    width: 100%;
    min-height: 100px;
    height: 100%;
    border: 1px solid #00fffc80;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    clip-path: polygon(0% 0%, 0% 100%, 2px 100%, 2px 2px, calc(100% - 2px) 2px, calc(100% - 2px) calc(100% - 2px), 2px calc(100% - 2px), 2px 100%, 100% 100%, 100% 0%);
    justify-content: center;
    background: #02253b;
}

.parent-box::before {
    content: "";
    position: absolute;
    height: 1000px;
    width: 1000px;
    border-radius: 100%;
    background-image: conic-gradient(aqua, transparent, transparent, transparent, transparent, transparent, transparent);
}

.parent-box.active::before {
    animation: rotate 8s linear infinite;
}


@keyframes rotate {
    0% {
        transform: rotate(360deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

.content {
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
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

::slotted(div) {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center; 
}

@keyframes slide-right {
    0% {
      transform: translateY(-400px);
    }
    100% {
      transform: translateY(0);
    }
}   

@keyframes slide-left {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-400px);
    }
}   

`;