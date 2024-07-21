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
    }

    set value(val) { this.setAttribute("value", val); }
    get value() { return this.getAttribute("value"); }

    connectedCallback() {
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
                    background-color: #EB9A45;
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
}