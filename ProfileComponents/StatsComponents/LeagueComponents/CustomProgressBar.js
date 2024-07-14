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

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                .horizontal-scroll-bar {

                    background-color: #d9d9d920;
                    width: 75%;
                    height: 16px;
                    border-radius: 200px;
                }

                .horizontal-scroll-bar-reach {
                    background-color: #EB9A45;
                    width: 80%;
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