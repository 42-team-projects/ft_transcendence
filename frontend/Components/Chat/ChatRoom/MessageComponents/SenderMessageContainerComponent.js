export class SenderMessageContainerComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    margin: 4px;
                    display: flex;
                    font-family: 'Sansation bold';
                    animation: slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                }
                
                * {
                    margin: 0;
                }
                @keyframes slide-right {
                    0% {
                      transform: translateX(100%);
                    }
                    100% {
                      transform: translateX(0);
                    }
                }
                .mainContainer {
                    display: flex;
                    flex-direction: column;
                    background-color: #d9d9d920;
                    padding: 10px 10px 2px 10px;
                    color: white;
                    font-size: 14px;
                    border-radius: 10px 10px 10px 10px;
                    margin-right: 15px;
                    min-width: 28px;
                    min-height: 20px;
                    max-width: 650px;
                }
                .corner {
                    border-bottom: 0px solid transparent;
                    border-right: 0px solid transparent;
                    border-top: 0px solid #d9d9d920;

                }
                p {
                    margin: 4px 0;
                    display: flex;
                    align-items: end;
                    justify-content: end;
                    width: 100%;
                    color: #cccccc90;
                    text-align: end;
                    font-size: 10px;
                }
            </style>
            <div class="mainContainer">
                <slot></slot>
                <p>12:09 PM</p>
            </div>
            <div class="corner" ></div>
    
        `;

    } 

    set time(val) {this.setAttribute("time", val);}
    get time() {return this.getAttribute("time");}
    
    set corner(val) {this.setAttribute("corner", val);}
    get corner() {return this.getAttribute("corner");}

    static observedAttributes = ["time", "corner"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "corner")
        {
            const mainContainer = this.shadowRoot.querySelector(".mainContainer");
            mainContainer.style.borderRadius = "10px 0px 10px 10px";
            mainContainer.style.marginRight = "0px";
            const cornerElement = this.shadowRoot.querySelector(".corner");
            cornerElement.style.borderBottom = "15px solid transparent";
            cornerElement.style.borderRight = "15px solid transparent";
            cornerElement.style.borderTop = "15px solid #d9d9d920";
        }
        else if (attrName === "time")
            this.shadowRoot.querySelector("p").textContent = newValue;

    }

    connectedCallback() {
        const hasCorner = this.hasAttribute("corner");
        if (hasCorner)
        {
            const mainContainer = this.shadowRoot.querySelector(".mainContainer");
            mainContainer.style.borderRadius = "10px 0px 10px 10px";
            mainContainer.style.marginRight = "0px";
            const cornerElement = this.shadowRoot.querySelector(".corner");
            cornerElement.style.borderBottom = "15px solid transparent";
            cornerElement.style.borderRight = "15px solid transparent";
            cornerElement.style.borderTop = "15px solid #d9d9d920";
        }
        this.shadowRoot.querySelector("p").textContent = this.time;

    }

}

customElements.define("sender-message-container", SenderMessageContainerComponent);
