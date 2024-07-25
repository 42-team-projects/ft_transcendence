import { Lobby } from "../Lobby.js";

const singlePlayerTemplate = document.createElement('template')
const player_template = document.createElement('template')

player_template.innerHTML = /*html*/ `

<!-- .Player{
    color: white;
    font-size: clamp(1rem, 9vw, 10rem);
} -->
    <style>
    .Player{
        position: absolute;
        height: 99%;
        width: 99%;
        z-index: 0;
        border-radius: 2%;
    }
    .Opponent{
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
    <img id='Player' class="Player" slot="PlayerImg" alt="Player" />
    <h1 id='NPlayer' class="Name" slot="PlayerName"></h1>
    <h1 id='Opponent' class="Opponent" slot="searshing"></h1>
    <h1 id='NOpponent' class="Name" slot="OpponentName"></h1>
`

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
        const root = document.querySelector('root-content')
		setTimeout(() => {

            button.addEventListener('click', ()=>{
                const lobby = new Lobby()
                const p_img = player_template.content.getElementById('Player')
                p_img.src = 'images/svg-header/profile.jpeg';
                const p_h1 = player_template.content.getElementById('NPlayer')

                p_h1.textContent = 'NOUAKHRO'

                const o_img = player_template.content.getElementById('Opponent')
                o_img.textContent = 'AI'
                const o_h1 = player_template.content.getElementById('NOpponent')

                o_h1.textContent = 'AI'

                lobby.appendChild(player_template.content.cloneNode(true))
                root.innerHTML = ``
                root.appendChild(lobby)
            })
        }, 4000);
        this.classList.toggle('cart-animation', true)
        this.classList.toggle('opacity-0', true)
        setTimeout(() => {
			this.classList.toggle('opacity-0', false)
			this.classList.toggle('opacity-1', true)
		}, 3000);
    }
}