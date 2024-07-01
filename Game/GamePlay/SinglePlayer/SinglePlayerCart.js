
import {Buttons} from '../buttons.js'
import {IaLobby} from './IA-Lobby.js'

customElements.define('ia-lobby', IaLobby)

customElements.define('c-button', Buttons)
const singlePlayerTemplate = document.createElement('template')


singlePlayerTemplate.innerHTML = /*html*/ `
    <link rel="stylesheet" href="../../Game/GamePlay/SinglePlayer/Single-Player.css">
    <img class="GreenCartImg" src="../../images/GreenCart/img-singleplayer.svg" alt="">
    <img class="GreenCart" src="../../images/GreenCart/Single.svg" alt="">
    <div class="style-0">
        <div class="style-1">
            <div class="style-2">
                <div class="style-2_1">
                    <h1>SINGLE PLAYER</h1>
                </div>
                <div class="box-container">
                    <div class="top-box">
                        <div class="middle-box">
                        </div>
                    </div>
                </div>
                <div class="buttonC">
                    <p>
                    Lorem ipsum dolor sit amet. Ut facere consequatur est dolore placeat rem accusamus quae est odit dolore. Id impedit molestiae vel voluptates repellendus ut perferendis libero et blanditiis dolor est dolorum molestiae. 
                    </p>
                    <c-button Bcolor="#47AF56" Hcolor="#3b9148"> 
                        <h1 slot="text" >START</h1>
                    </c-button>
                </div>
        
            </div>
        </div>
    </div>
`


export class SinglePlayer extends HTMLElement{

    constructor (){
        super();
        this.appendChild(singlePlayerTemplate.content.cloneNode(true))
        const button = this.querySelector('c-button')
        const root = document.querySelector('root-content')
        button.addEventListener('click', ()=>{
            const lobby = document.createElement('ia-lobby')
            console.log(root, button, lobby);
            root.innerHTML = ``
            root.appendChild(lobby)
        })
    }
    clickEvent()
    {
    }
    connectedCallback(){
        this.clickEvent()
    }
}