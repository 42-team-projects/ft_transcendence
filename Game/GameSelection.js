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