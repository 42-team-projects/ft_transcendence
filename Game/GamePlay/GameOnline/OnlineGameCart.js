
import {Buttons} from '../buttons.js'
import {aiLobby} from '../Lobby.js'

const OnlineGameTemplate = document.createElement('template')

const sherching_images = [
	{
		src: '../../images/svg-header/profile.jpeg',
		name: 'ESCANOR'
	},
	{
		src: '../../images/OrangeCart/images.png',
		name: 'ITATCHI'
	},
	{
		src: '../../images/OrangeCart/img1.png',
		name: 'ESALIM'
	},
	{
		src: '../../images/OrangeCart/img2.jpg',
		name: 'KILLUA'
	},
	{
		src: '../../images/OrangeCart/img3.jpg',
		name: 'GOJO'
	}
]

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
	.PlayerS{
		position: absolute;
		height: 100%;
		width: 100%;
		z-index: 0;
		border-radius: 2%;
		animation: verticMove 2s linear infinite;
		opacity:0;
	}
	@keyframes verticMove {
		0%{
			top: -100%;
			opacity:1;
		}
		100%{
			top: 380%;
		}
	}
	.PlayerS:nth-child(1) { animation-delay: 0s; }
	.PlayerS:nth-child(2) { animation-delay: 0.4s; }
	.PlayerS:nth-child(3) { animation-delay: 0.8s; }
	.PlayerS:nth-child(4) { animation-delay: 1.2s; }
	.PlayerS:nth-child(5) { animation-delay: 1.6s; }
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
	<img id='Opponent1' class="PlayerS" slot="OpponentImg1" alt="" />
	<img id='Opponent2' class="PlayerS" slot="OpponentImg2" alt="" />
	<img id='Opponent3' class="PlayerS" slot="OpponentImg3" alt="" />
	<img id='Opponent4' class="PlayerS" slot="OpponentImg4" alt="" />
	<img id='Opponent5' class="PlayerS" slot="OpponentImg5" alt="" />

    <img id='Player' class="Player" slot="PlayerImg" alt="" />
    <h1 id='NPlayer' class="Name" slot="PlayerName"></h1>
`
OnlineGameTemplate.innerHTML = /*html*/ `
	<link rel="stylesheet" href="../../Game/GamePlay/GameOnline/OnlineGame.css">
	<img class="OrangeCartImg" src="../../images/OrangeCart/OrangeCartImg.svg" alt="">
	<div class="shapes3-4">
		<div class="Online-text">
			<h1>ONLINE GAME</h1>
		</div>
		<div class="O-buttonC">
			<p>
			Lorem ipsum dolor sit amet. Ut facere consequatur est dolore placeat rem accusamus quae est odit dolore. Id impedit molestiae vel voluptates repellendus ut perferendis libero et blanditiis dolor est dolorum molestiae. 
			</p>
			<c-button Bcolor="#EB9A45" Hcolor="#e98f2f"> 
				<h1 slot="text">START</h1>
			</c-button>
		</div>
	</div>
	`

export class OnlineGame extends HTMLElement{
	constructor (){
		super();
		this.appendChild(OnlineGameTemplate.content.cloneNode(true))
		const button = this.querySelector('c-button')
		const root = document.querySelector('root-content')
		button.addEventListener('click', ()=>{
			const lobby = new aiLobby();
			const p_img = player_template.content.getElementById('Player')
			p_img.src = '../../images/svg-header/profile.jpeg';
			const p_h1 = player_template.content.getElementById('NPlayer')

			p_h1.textContent = 'NOUAKHRO'

			const players = player_template.content.querySelectorAll('.PlayerS')
			console.log(players);
			players.forEach((element, index)=>{
				element.src = sherching_images[index].src;
			})
			lobby.appendChild(player_template.content.cloneNode(true))
			root.innerHTML = ``
			root.appendChild(lobby)
			setTimeout(() => {
				const h1 = document.createElement('h1')
				const lobbyPlayerS = lobby.querySelectorAll('.PlayerS')
				console.log(lobbyPlayerS);
				lobbyPlayerS.forEach((element)=>{
					console.log(element.getBoundingClientRect());
					
				})
				h1.id = 'NOpponent'
				h1.classList = 'Name'
				h1.slot = 'OpponentName'
				h1.textContent = 'NOUAKHRO'
				lobby.appendChild(h1.cloneNode(true))

				// animation: verticMove 0.5s linear infinite;
				
			}, 5000);
		})

	}
}