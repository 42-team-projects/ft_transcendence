import { CustomSliders } from "../CustomSliders.js"
import { CustomField } from "../CustomField.js"


export class GameContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="container">
                <custom-sliders label="GAME PLAY" game-color="#00fffc"></custom-sliders>
                <custom-field label="GAME PLAY COLOR" description="chose the color you want play on it.">
                    <input type="color" id="gamePlayColor" name="body" value="#00fffc" />
                </custom-field>
                <custom-field label="FIRST RACKET" description="chose the color of the first racket.">
                    <input type="color" id="firstRacketColor" name="body" value="#f6b73c" />
                </custom-field>
                <custom-field label="SECOND RACKET" description="chose the color of the second racket.">
                    <input type="color" id="secondRacketColor" name="body" value="#b23def" />
                </custom-field>
            </div>
            <div class="actions">
                <settings-item color="aqua" border-size="2px" width="64px" height="40px"><h4>SAVE</h4></settings-item>
            </div>
        `;
    }

    interval;

    connectedCallback() {
        const gamePlayColorSelector = this.shadowRoot.querySelector("#gamePlayColor");
        let gamePlayColor = gamePlayColorSelector.value;
        const customSliders = this.shadowRoot.querySelector("custom-sliders");
        gamePlayColorSelector.addEventListener("click", () => {
            let counter = 0;
            if (this.interval)
                clearInterval(this.interval);
            this.interval = setInterval(() => {
                if (gamePlayColorSelector.value != gamePlayColor)
                {
                    gamePlayColor = gamePlayColorSelector.value;
                    customSliders.gameColor = gamePlayColor;
                    counter = 0;
                }
                if (counter >= 3000)
                {
                    clearInterval(this.interval);
                }
                console.log("hello from game play selector : ", this.interval);
                counter += 100;
            }, 100);
        });
    }

    disconnectedCallback() {

    }
}

const cssContent = /*css*/`
    * {
        margin: 0;
        padding: 0;
    }
    :host {
        flex: 4;
        height: calc(100% - 50px);
        display: flex;
        gap: 50px;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 50px;
    }

    .actions {
        display: flex;
        flex-wrap: wrap-reverse;
        gap: 20px;
        width: 90%;
        align-items: center;
        justify-content: space-around;
    }

`;

customElements.define("game-content", GameContent);