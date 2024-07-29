export class GameOver extends HTMLElement{
    constructor(status_player1, status_player2, Player1Name, Player2Name){
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
        const Player1 = document.createElement('p')
        const Player2 = document.createElement('p')

        Player1.textContent = `${Player1Name} ${status_player1.toUpperCase()}`
        Player2.textContent = `${Player2Name} ${status_player2.toUpperCase()}`
        Player1.classList.toggle(status_player1, true)
        Player2.classList.toggle(status_player2, true)
        resultDiv.appendChild(Player1)
        resultDiv.appendChild(Player2)

        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(GameOverTamplate.content.cloneNode(true))
    }
}
