export class GameOver extends HTMLElement{
    constructor(player_state){
        super();
        const GameOverTamplate = document.createElement('template')
        GameOverTamplate.innerHTML = /*html*/ `
        <style>
        p{
            font-size: 4rem;
            color: white;
            text-shadow: 0 0 10px #00b9be;
        }
        .result{
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
        }
        .lose{
            color: red;
            text-shadow: 0 0 10px red;
        }
        .win{
            color: #00b9be;
            text-shadow: 0 0 10px #00b9be;
        }
        </style>

        <p>Game Over</p>
        <div class="result"></div>
        `
        const resultDiv = GameOverTamplate.content.querySelector('.result')
        const p = document.createElement('p')
        // const Player2 = document.createElement('p')
        // console.log(player_state)
        p.textContent = `YOU ${player_state.toUpperCase()}`
        p.classList.toggle(player_state, true)
        resultDiv.appendChild(p)

        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(GameOverTamplate.content.cloneNode(true))
    }
}
