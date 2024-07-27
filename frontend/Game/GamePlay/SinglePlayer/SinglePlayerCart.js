import { Lobby } from "../Lobby.js";

const singlePlayerTemplate = document.createElement('template')

singlePlayerTemplate.innerHTML = /*html*/ `
    <link rel="stylesheet" href="Game/GamePlay/SinglePlayer/Single-Player.css">
    <img class="GreenCartImg" src="images/GreenCart/img-singleplayer.svg" alt="GreenImg">
    <img class="GreenCart" src="images/GreenCart/Single.svg" alt="Green">
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
        this.appendChild(singlePlayerTemplate.content.cloneNode(true))
        const button = this.querySelector('c-button')
		// setTimeout(() => {
            button.addEventListener('click', ()=>{
                const lobby = new Lobby()
                lobby.SinglePlayer();
            })
        // }, 4000);
        this.classList.toggle('cart-animation', true)
        this.classList.toggle('opacity-0', true)
        setTimeout(() => {
			this.classList.toggle('opacity-0', false)
			this.classList.toggle('opacity-1', true)
		}, 3000);
    }
}