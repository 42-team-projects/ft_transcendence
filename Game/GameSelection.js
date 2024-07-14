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
            font-size: clamp(0.5, 9vw, 10rem);
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

        .cart-animation{
            position: relative;
            width: 100%;
            aspect-ratio: 0.56;
            transition: transform 0.3s ease;
            animation: retate 2s ease;
        }
        .opacity-0{
            opacity: 0;
        }
        .opacity-1{
            opacity: 1;
        }
        @keyframes retate{
            from{
                top: 100%;
                transform: rotateY(0deg);
            }
            to{
                top: 0%;
                opacity: 1;
                transform: rotateY(360deg);
            }
        }
        .overide-transform{
            animation: middleCart 2s ease;
            transition: transform 0.3s ease;
        }
        @keyframes middleCart{
            from{
                top: 100%;
                opacity: 0;
                transform: rotateY(0deg) translateY(-7%);
            }
            to{
                top: 0%;
                opacity: 1;
                transform: rotateY(360deg) translateY(-7%) ;
            }
        }
        .cart-animation:nth-child(1) { animation-delay: 0s; }
        .cart-animation:nth-child(2) { animation-delay: 2s; }
        .cart-animation:nth-child(3) { animation-delay: 4s; }
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
