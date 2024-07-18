
import {Buttons} from '../buttons.js'
import {aiLobby} from '../Lobby.js'
import { GameTable } from './GameTable.js'
import { GameHeader } from './GameHeader.js'

const OnlineGameTemplate = document.createElement('template')

const sherching_images = [
	{
		src: 'images/svg-header/profile.jpeg',
		name: 'ESCANOR'
	},
	{
		src: 'images/OrangeCart/images.png',
		name: 'ITATCHI'
	},
	{
		src: 'images/OrangeCart/img1.png',
		name: 'ESALIM'
	},
	{
		src: 'images/OrangeCart/img2.jpg',
		name: 'KILLUA'
	},
	{
		src: 'images/OrangeCart/img3.jpg',
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
	.searshingImgs{
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
	}
	.PlayerS{
		position: absolute;
		height: 100%;
		width: 100%;
		z-index: 0;
		border-radius: 2%;
		animation: verticMove calc(0.5s * var(--numsec)) linear infinite;
		opacity:0;
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
	@keyframes verticMove {
		0%{
			top: -100%;
			opacity:1;
		}
		100%{
			top: var(--dest);
		}
	}
	.PlayerS:nth-child(1) { animation-delay: 0s; }
	.PlayerS:nth-child(2) { animation-delay: calc(0.1s * var(--numsec)); }
	.PlayerS:nth-child(3) { animation-delay: calc(0.2s * var(--numsec)); }
	.PlayerS:nth-child(4) { animation-delay: calc(0.3s * var(--numsec)); }
	.PlayerS:nth-child(5) { animation-delay: calc(0.4s * var(--numsec)); }
</style>
	<div class="searshingImgs" slot="searshing">
		<img id='Opponent1' class="PlayerS" alt="searchingImg"/>
		<img id='Opponent2' class="PlayerS" alt="searchingImg"/>
		<img id='Opponent3' class="PlayerS" alt="searchingImg"/>
		<img id='Opponent4' class="PlayerS" alt="searchingImg"/>
		<img id='Opponent5' class="PlayerS" alt="searchingImg"/>
	</div>

    <img id='Player' class="Player" slot="PlayerImg" alt="" />
    <h1 id='NPlayer' class="Name" slot="PlayerName"></h1>
`
OnlineGameTemplate.innerHTML = /*html*/ `
	<link rel="stylesheet" href="Game/GamePlay/GameOnline/OnlineGame.css">
	<img class="OrangeCartImg" src="images/OrangeCart/OrangeCartImg.svg" alt="">
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
let time = 3;
const timer = document.createElement('template')
timer.innerHTML = /*html*/ `
	<style>
        .descounter{
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: end;
            justify-content: center;
        }
        .descounter h1{
            font-size: clamp(0.5rem, 2vw, 2.3rem);
            color: white;
        }

	</style>
	<div class="descounter">
		<h1>${time}</h1>
	</div>
`

export class OnlineGame extends HTMLElement{
	constructor (){
		super();
		this.appendChild(OnlineGameTemplate.content.cloneNode(true))
		const button = this.querySelector('c-button')
		const root = document.querySelector('root-content')
		// setTimeout(() => {
			button.addEventListener('click', ()=>{
				const lobby = new aiLobby();
				const p_img = player_template.content.getElementById('Player')
				p_img.src = 'images/svg-header/profile.jpeg';
				const p_h1 = player_template.content.getElementById('NPlayer')

				p_h1.textContent = 'NOUAKHRO'

				const players = player_template.content.querySelectorAll('.PlayerS')
				console.log(players);
				players.forEach((element, index)=>{
					element.style.setProperty('--dest', '400%');
					element.style.setProperty('--numsec', 1);
					element.src = sherching_images[index].src;
				})
				lobby.appendChild(player_template.content.cloneNode(true))
				root.innerHTML = ``
				root.appendChild(lobby)
				setTimeout(() => this.setPlayer(lobby), 5000);
				setTimeout(() => this.gameMode(lobby), 6000);
			})
		// }, 4000);
        this.classList.toggle('cart-animation', true)
        this.classList.toggle('opacity-0', true)
        setTimeout(() => {
			this.classList.toggle('opacity-0', false)
			this.classList.toggle('opacity-1', true)
		}, 2000);
	}

	gameMode(lobby){
		const lobbyPlayerS = lobby.querySelectorAll('.PlayerS')
		lobbyPlayerS.forEach((element, index)=>{
			if(index !== 0)
				element.remove()
			else{
				element.style.animation = 'none';
				lobby.shadowRoot.appendChild(timer.content.cloneNode(true));
				const countdown = setInterval(()=>{
					time--;
					const desc = lobby.shadowRoot.querySelector('.descounter')
					const h1 = desc.querySelector('h1')

					if(time < 0){
						const header = new GameHeader();
						const game = new GameTable();
						document.body.innerHTML = ``;
						document.body.appendChild(header);
						document.body.appendChild(game);
						clearInterval(countdown)
					}
					else{
						h1.textContent = `${time}`
					}
				},1000)
			}
		})
	}

	setPlayer(lobby){
		const h1 = document.createElement('h1')
		const lobbyPlayerS = lobby.querySelectorAll('.PlayerS')
		lobbyPlayerS.forEach((element)=>{
			element.style.setProperty('--numsec', 10);
			element.style.setProperty('--dest', '400%');
			element.style.opacity = '1'
		})
		h1.id = 'NOpponent'
		h1.classList = 'Name'
		h1.slot = 'OpponentName'
		h1.textContent = sherching_images[0].name
		lobby.appendChild(h1.cloneNode(true))	
	}
}