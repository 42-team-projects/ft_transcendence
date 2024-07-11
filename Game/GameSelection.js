import {SinglePlayer} from './GamePlay/SinglePlayer/SinglePlayerCart.js'
import {MultiPlayer} from './GamePlay/MultiPlayer/MultiPlayerCart.js'
import {OnlineGame} from './GamePlay/GameOnline/OnlineGameCart.js'

customElements.define("single-player", SinglePlayer)
customElements.define("multi-player", MultiPlayer)
customElements.define("online-game", OnlineGame)

const game_selection = document.createElement('template')

game_selection.innerHTML = /*html*/ `
    <style>
        :host {
            position:relative;
            align-items: center;
            width:100%;
            height:100%;
            border: 1px solid rgb(0, 255, 204);
            grid-area: content;
            display: grid;
            grid-template-columns: repeat(3, 23%);
            grid-template-areas: 
            "single multiple online";
            justify-content: space-around;
        }
        .playerImg{
            position: absolute;
            height: 99%;
            width: 99%;
            z-index: 0;
            border-radius: 2%;
        }

        .Player{
            color: white;
            font-size: clamp(1rem, 9vw, 10rem);
        }
        .Name{
            z-index: 0;
            position: absolute;
            font-size: clamp(0.3rem, 1.5vw, 2rem);
            color: white;
            top:100%;
            margin: 0;
            animation: moveName 1s forwards;
            transform: translateY(-200%);
        }
        @keyframes moveName {
            to{
                transform: translateY(0%);
            }
        }
    </style>
    <single-player></single-player>
    <multi-player></multi-player>
    <online-game></online-game>
    `
export class GameSelection extends HTMLElement{

    constructor()
    {
        super();
        const shadow = this.attachShadow({
            mode : 'open'            
        })
        shadow.appendChild(game_selection.content.cloneNode(true))
    }
}