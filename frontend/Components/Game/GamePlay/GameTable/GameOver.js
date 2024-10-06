export class GameOver extends HTMLElement{
    constructor(player_state, state, winner){
        super();
        const GameOverTamplate = document.createElement('template')
        GameOverTamplate.innerHTML = /*html*/ `
        <style>
        p{
            font-size: 4rem;
            color: white;
            text-shadow: 0 0 10px #00b9be;
        }
        #game-over{
            font-size: 5rem;
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

        <p id="game-over" >Game Over</p>
        <div class="result"></div>
        `
        const resultDiv = GameOverTamplate.content.querySelector('.result')
        const p = document.createElement('p')
        if(state == 'offline'){
            p.textContent = `${winner} ${player_state.toUpperCase()}`
        }
        else
            p.textContent = `YOU ${player_state.toUpperCase()}`
        p.classList.toggle(player_state, true)
        resultDiv.appendChild(p)

        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(GameOverTamplate.content.cloneNode(true))
    }
}
