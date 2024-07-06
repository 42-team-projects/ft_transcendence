
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
		<img id='Opponent1' class="PlayerS" src="../../images/svg-header/profile.jpeg" />
		<img id='Opponent2' class="PlayerS" src="../../images/svg-header/profile.jpeg" />
		<img id='Opponent3' class="PlayerS" src="../../images/svg-header/profile.jpeg" />
		<img id='Opponent4' class="PlayerS" src="../../images/svg-header/profile.jpeg" />
		<img id='Opponent5' class="PlayerS" src="../../images/svg-header/profile.jpeg" />
	</div>

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
let time = 3;
const timer = document.createElement('template')
timer.innerHTML = /*html*/ `
	<style>
        .descounter{
            position: absolute;
            width: 100%;
            height: 100%;
            border: 1px solid red;
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

const game_mode = document.createElement('template')

game_mode.innerHTML = /*html*/ `
	<style>
		.game_header{
			grid-area: head;
   			display: flex;
			align-items: end;
   			justify-content: space-evenly;
		}
		.leftPlayer{
			width: 24%;
            aspect-ratio: 4.2;
			border: 1px solid red;
			transform: translateY(15%)
		}
		.rightPlayer{
			width: 24%;
            aspect-ratio: 4.2;
			border: 1px solid red;
			transform: translateY(15%)
		}
		.Play_Pause{
			border: 1px solid red;
			width: 7%;
            aspect-ratio: 1.5;
		}
		.c_game{
			grid-area: 2 / 1 / 4 / 3;
			border: 1px solid red;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.GameShapes{
			position:relative;
			border: 1px solid red;
			width: 90%;
            aspect-ratio: 2.1;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.shapes_LT_RT{
			width:100%;
			height:100%;
			position:absolute;			
		}
		.shapes_LT_RT::before{
			position: absolute;
		    content: '';
		    width: 43%;
		    height: 16%;
		    background-image: url(../../images/game-LT.svg);
		    background-repeat: no-repeat;
		    background-size: contain;
		    top: 0;
		    left: 0;
		}
		.shapes_LT_RT::after{
			position: absolute;
		    content: '';
		    width: 43%;
		    height: 16%;
		    background-image: url(../../images/game-LT.svg);
		    background-repeat: no-repeat;
		    background-size: contain;
		    top: 0;
		    right: 0;
			transform: scaleX(-1);
		}
		.shapes_LB_RB{
			width:100%;
			height:100%;
			position:absolute;			
		}
		.shapes_LB_RB::before{
			position: absolute;
			content: '';
			width: 43%;
			height: 16%;
			background-image: url(../../images/game-LT.svg);
			background-repeat: no-repeat;
			background-size: contain;
			bottom: 0;
			left: 0;
			transform: scaleY(-1);
		}
		.shapes_LB_RB::after{
			position: absolute;
			content: '';
			width: 43%;
			height: 16%;
			background-image: url(../../images/game-LT.svg);
			background-repeat: no-repeat;
			background-size: contain;
			bottom: 0;
			right: 0;
			transform: scaleY(-1) scaleX(-1);
		}
		.shapes_DT{
			width:100%;
			height:100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
		}
		.shapes_DT::before{
			margin-top: 0.7%;
			content: '';
			width: 25%;
			height: 7%;
			background-image: url(../../images/game-DT.svg);
			background-repeat: no-repeat;
			background-size: contain;
		}
		.shapes_DT::after{
			content: '';
			width: 25%;
			height: 7%;
			background-image: url(../../images/game-DT.svg);
			background-repeat: no-repeat;
			background-size: contain;
			transform: scaleY(-1) scaleX(-1);
			margin-bottom: 0.7%;
		}
		.shapes_LR_container{
			position:absolute;
			width:99.5%;
			height:65%;
		}
		.center_shapes_LT_RT{
			width:100%;
			height:100%;
			position:absolute;
		}
		.center_shapes_LT_RT::before{
			position: absolute;
    		content: '';
    		width: 6%;
    		height: 34%;
    		background-image: url(../../images/game-LR.svg);
    		background-repeat: no-repeat;
    		background-size: contain;
		    top: 0;
		    left: 0;
		}
		.center_shapes_LT_RT::after{
			position: absolute;
    		content: '';
    		width: 6%;
    		height: 34%;
    		background-image: url(../../images/game-LR.svg);
    		background-repeat: no-repeat;
    		background-size: contain;
    		top: 0;
    		right: 0;
    		transform: scaleX(-1);
		}

		.center_shapes_LB_RB{
			width:100%;
			height:100%;
			position:absolute;
		}
		.center_shapes_LB_RB::before{
			position: absolute;
    		content: '';
    		width: 6%;
    		height: 34%;
    		background-image: url(../../images/game-LR.svg);
    		background-repeat: no-repeat;
    		background-size: contain;
		    bottom: 0;
		    left: 0;
    		transform: scaleY(-1);
		}
		.center_shapes_LB_RB::after{
			position: absolute;
    		content: '';
    		width: 6%;
    		height: 34%;
    		background-image: url(../../images/game-LR.svg);
    		background-repeat: no-repeat;
    		background-size: contain;
    		bottom: 0;
    		right: 0;
    		transform: scaleX(-1) scaleY(-1);
		}
		.center_shapes_MLR{
			width:100%;
			height:100%;
			position:absolute;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.center_shapes_MLR::before{
    		content: '';
    		width: 2%;
    		height: 32%;
    		background-image: url(../../images/game-MLR.svg);
    		background-repeat: no-repeat;
    		background-size: contain;
		    bottom: 0;
		    left: 0;
    		transform: scaleY(-1);
		}
		.center_shapes_MLR::after{
    		content: '';
    		width: 2%;
    		height: 32%;
    		background-image: url(../../images/game-MLR.svg);
    		background-repeat: no-repeat;
    		background-size: contain;
    		bottom: 0;
    		right: 0;
    		transform: scaleX(-1) scaleY(-1);
		}
		.terain_container{
			width:100%;
			height:100%;
			position:absolute;
			border: 1px solid blue;
			display:flex;
			justify-content: center;
			align-items: center;
		}

		.terain{
			width: 85.5%;
   			height: 79.5%;
   			position: absolute;
   			background-color: #00b9be57;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.terain::before{
			content: '';
			width: 1px;
   			height: 100%;
   			position: absolute;
   			background-color: white;
			z-index: -1;
		}
		.terain::after{
			content: '';
			width: 9%;
            aspect-ratio: 1;
   			position: absolute;
   			border : 1px solid white;
			border-radius:50%;
			z-index: -1;
		}
	</style>
	<div class="game_header">
		<div class="leftPlayer"></div>
		<div class="Play_Pause"></div>
		<div class="rightPlayer"></div>
	</div>
	<div class="c_game">
	<div class="GameShapes">
			<div class="shapes_LT_RT"></div>
			<div class="shapes_LB_RB"></div>
			<div class="shapes_DT"></div>
			<div class="shapes_LR_container">
				<div class="center_shapes_LT_RT"></div>
				<div class="center_shapes_LB_RB"></div>
				<div class="center_shapes_MLR"></div>
			</div>
			<div class="terain_container">
				<div class="terain">
			
				</div>
			</div>
		</div>
	</div>
`


// scaleX(-1) scaleY(-1)
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
				element.style.setProperty('--dest', '400%');
				element.style.setProperty('--numsec', 1);
				element.src = sherching_images[index].src;
			})
			lobby.appendChild(player_template.content.cloneNode(true))
			root.innerHTML = ``
			root.appendChild(lobby)
		
			setTimeout(() => {
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
			}, 5000);
			setTimeout(() => {
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
								document.body.innerHTML = game_mode.innerHTML;
								clearInterval(countdown)
							}
							else{
								h1.textContent = `${time}`
							}
						},1000)
					}
				})

			}, 6000);
		})

	}
}