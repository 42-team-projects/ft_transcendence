import { CustomSliders } from "/Components/CustomElements/CustomSliders.js"
import { CustomField } from "/Components/CustomElements/CustomField.js"
import { getApiData, updateApiData } from "/Utils/APIManager.js";
import { HOST } from "/Utils/GlobalVariables.js";


export class GameContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="container">
                <custom-sliders label="GAME PLAY" game-color="#ffffff"></custom-sliders>
                <custom-field label="GAME PLAY COLOR" description="chose the color you want play on it.">
                    <input type="color" id="gamePlayColor" name="body" value="#ffffff"></input>
                </custom-field>
                <custom-field label="FIRST RACKET" description="chose the color of the first racket.">
                    <input type="color" id="firstRacketColor" name="body" value="#f6b73c"></input>
                </custom-field>
                <custom-field label="SECOND RACKET" description="chose the color of the second racket.">
                    <input type="color" id="secondRacketColor" name="body" value="#b23def" />
                </custom-field>
                <custom-field label="BALL" description="chose the color of the ball.">
                    <input type="color" id="ballColor" name="body" value="#ffffff" />
                </custom-field>
            </div>
            <div class="actions">
                <settings-item class="active" color="aqua" border-size="2px" width="64px" height="40px"><h4>SAVE</h4></settings-item>
            </div>
            <custom-spinner time="10" ></custom-spinner>
        `;
    }

    interval;


    init(gameplayData) {
        const slider = this.shadowRoot.querySelector("custom-sliders");
        slider.board = gameplayData.board;
        console.log("slider.board: ", slider.board);
        slider.gameColor = gameplayData.board_color;
        const gamePlayColor = this.shadowRoot.querySelector("#gamePlayColor");
        gamePlayColor.value = gameplayData.board_color;
        const firstRacketColor = this.shadowRoot.querySelector("#firstRacketColor");
        firstRacketColor.value = gameplayData.first_racket_color;
        const secondRacketColor = this.shadowRoot.querySelector("#secondRacketColor");
        secondRacketColor.value = gameplayData.second_racket_color;
        const ballColor = this.shadowRoot.querySelector("#ballColor");
        ballColor.value = gameplayData.ball_color;
    }

    getGamePlayData() {
        const formData = new FormData();
        const slider = this.shadowRoot.querySelector("custom-sliders");
        formData.append("board", slider.board);
    
        const gamePlayColor = this.shadowRoot.querySelector("#gamePlayColor");
        formData.append("board_color",gamePlayColor.value);
        
        const firstRacketColor = this.shadowRoot.querySelector("#firstRacketColor");
        formData.append("first_racket_color",firstRacketColor.value);
        
        
        const secondRacketColor = this.shadowRoot.querySelector("#secondRacketColor");
        formData.append("second_racket_color",secondRacketColor.value);
        
        const ballColor = this.shadowRoot.querySelector("#ballColor");
        formData.append("ball_color",ballColor.value);

        return formData;
    }

    async connectedCallback() {
        const gamePlayColorSelector = this.shadowRoot.querySelector("#gamePlayColor");
        let gamePlayColor = gamePlayColorSelector.value;
        const customSliders = this.shadowRoot.querySelector("custom-sliders");
        const playerGamePlayData = await getApiData(HOST + "/game/game_play/");

        this.init(playerGamePlayData);
        const refreshBox = this.shadowRoot.querySelector("custom-spinner");

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
                    clearInterval(this.interval);
                counter += 100;
            }, 100);
        });


        const action = this.shadowRoot.querySelector(".actions settings-item");
        action.addEventListener("click", async () => {
            const form = this.getGamePlayData();
            const response = await updateApiData(HOST + "/game/game_play/", form);
            console.log("response: ", response);
            refreshBox.display();
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

    .active {
        border: 2px solid aqua;
        color: aqua;
        
    }

`;

customElements.define("game-content", GameContent);