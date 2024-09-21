import { Lobby } from "/Components/Game/GamePlay/Lobby.js";
import { displayToast } from "/Components/CustomElements/CustomToast.js";

const singlePlayerTemplate = document.createElement('template')

singlePlayerTemplate.innerHTML = /*html*/ `
    <link rel="stylesheet" href="/Components/Game/GamePlay/SinglePlayer/Single-Player.css">
    <img loading="lazy" class="GreenCartImg" src="images/GreenCart/img-singleplayer.svg" alt="GreenImg">
    <img loading="lazy" class="GreenCart" src="images/GreenCart/Single.svg" alt="Green">
    <div class="style-0">
        <div class="style-1">
            <div class="style-2">
                <div class="style-2_1">
                    <h1>AI GAME</h1>
                </div>
                <div class="box-container">
                    <div class="top-box">
                        <div class="middle-box">
                        </div>
                    </div>
                </div>
                <div class="buttonC">
                    <p>
                    In Ai-Game mode, you’ll face off against an AI opponent in a one-on-one ping pong match. Test your skills across five rounds, as the AI gets progressively tougher. Can you outsmart the computer and claim victory? Let’s find out!
                    </p>
                    <c-button bcolor="#47AF56" Hcolor="#3b9148"> 
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
        this.attachShadow({mode : 'open'})
        this.shadowRoot.appendChild(singlePlayerTemplate.content.cloneNode(true))
        const button = this.shadowRoot.querySelector('c-button')
            button.addEventListener('click', ()=>{
                displayToast('error', 'Single Player Mode is not available yet')
            })
        this.classList.toggle('cart-animation', true)
        this.classList.toggle('opacity-0', true)
        setTimeout(() => {
			this.classList.toggle('opacity-0', false)
			this.classList.toggle('opacity-1', true)
		}, 3000);
    }
}