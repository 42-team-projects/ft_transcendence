export class ReceiverMessageContainerComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    margin: 4px;
                    display: flex;
                    font-family: 'Sansation bold';
                }
                
                * {
                    margin: 0;
                }
            
                .mainContainer {
                    display: flex;
                    flex-direction: column;
                    background-color: #00ffff40;
                    padding: 10px 10px 2px 10px;
                    color: white;
                    font-size: 14px;
                    border-radius: 10px;
                    margin-left: 15px;
                    min-width: 24px;
                    min-height: 16px;
                    max-width: 650px;
                }
                .corner {
                    border-bottom: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-top: 0px solid #00ffff40;
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
            <div class="corner" ></div>
            <div class="mainContainer">
                <slot></slot>
                <p> 12:00 PM </p>
            </div>
    
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
            mainContainer.style.borderRadius = "0px 10px 10px 10px";
            mainContainer.style.marginLeft = "0px";
            const cornerElement = this.shadowRoot.querySelector(".corner");
            cornerElement.style.borderBottom = "15px solid transparent";
            cornerElement.style.borderLeft = "15px solid transparent";
            cornerElement.style.borderTop = "15px solid #00ffff40";
        }
        else if (attrName === "time")
            this.shadowRoot.querySelector("p").textContent = newValue;

    }

    connectedCallback() {
        const hasCorner = this.hasAttribute("corner");
        if (hasCorner)
        {
            const mainContainer = this.shadowRoot.querySelector(".mainContainer");
            mainContainer.style.borderRadius = "0px 10px 10px 10px";
            mainContainer.style.marginLeft = "0px";
            const cornerElement = this.shadowRoot.querySelector(".corner");
            cornerElement.style.borderBottom = "15px solid transparent";
            cornerElement.style.borderLeft = "15px solid transparent";
            cornerElement.style.borderTop = "15px solid #00ffff40"; 
        }
        this.shadowRoot.querySelector("p").textContent = this.time;
        
    }

}

customElements.define("receiver-message-container", ReceiverMessageContainerComponent);
