/*

    <div class="league-progress-bar">
        <div class="horizontal-scroll-bar">
            <div class="horizontal-scroll-bar-reach"></div>
        </div>
    </div>

*/
export class CustomProgressBar extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    flex: 1;
                    align-items: center;
                }
            
                .horizontal-scroll-bar {

                    background-color: #d9d9d920;
                    width: 75%;
                    height: 16px;
                    border-radius: 200px;
                }

                .horizontal-scroll-bar-reach {
                    background-color: ${this.color || "aqua"};
                    width: ${this.value || 0}%;
                    height: 100%;
                    border-radius: 200px;
                }
            </style>

            <div class="horizontal-scroll-bar">
                <div class="horizontal-scroll-bar-reach"></div>
            </div>
        `;
    }

    set value(val) { this.setAttribute("value", val); }
    get value() { return this.getAttribute("value"); }
    
    set color(val) { this.setAttribute("color", val); }
    get color() { return this.getAttribute("color"); }

    static observedAttributes = ["value", "color"];

    attributeChangedCallback(name, oldValue, newValue) {
        const element = this.shadowRoot.querySelector(".horizontal-scroll-bar-reach");
        if (name === "color")
            element.style.backgroundColor = newValue;
        else if (name === "value")
            element.style.width = newValue + "%";
    }

    connectedCallback() {
        const element = this.shadowRoot.querySelector(".horizontal-scroll-bar-reach");
        element.style.backgroundColor = this.color;
        element.style.width = this.value;
    }
}

customElements.define("custom-progress-bar", CustomProgressBar);
