import { Lobby } from "/Components/Game/GamePlay/Lobby.js"
import { router } from "/root/Router.js";
const OflineGameTemplate = document.createElement('template')

OflineGameTemplate.innerHTML = /*html*/ `
	<link rel="stylesheet" href="/Components/Game/GamePlay/GameOfline/GameOfline.css">
	<img loading="lazy" class="BlueCartImg" src="/images/BlueCart/multi-playerImg.svg" alt="BlueImg">
	<img loading="lazy" class="BlueCart" src="/images/BlueCart/GameOfline.svg" alt="Blue">
	<div class="shapes2-3">
		<div class="shapes4-5">
			<div class="text">
				<h1>LOCAL GAME</h1>
			</div>
			<div class="M-buttonC">
				<p>
					In local game, you can challenge your friends in local multiplayer ping pong matches. Grab a friend, take turns, and compete in five exciting rounds to see who’s the ultimate champion. It’s all about skill and fun – play together!
				</p>
				<c-button bcolor="#2EA4E1" Hcolor="#197fb3"> 
					<h1 slot="text">START</h1>
				</c-button>
			</div>
		</div>
	</div>
	`

export class OflineGame extends HTMLElement{

	constructor (){
		super();
        this.clicked = false
		this.attachShadow({mode:'open'})
		this.shadowRoot.appendChild(OflineGameTemplate.content.cloneNode(true))
        this.classList.toggle('cart-animation', true)
        this.classList.toggle('opacity-0', true)
		const button = this.shadowRoot.querySelector('c-button')
		
		button.addEventListener('click', ()=>{
            if(this.clicked) return
            this.clicked = true
			const lobby = new Lobby();
			router.randred = false
			lobby.OflineGame();
		})
		setTimeout(() => {
			this.classList.toggle('opacity-0', false)
			this.classList.toggle('opacity-1', true)
		}, 4000);
	}
}