import { Lobby } from "/Components/Game/GamePlay/Lobby.js"
import { isTokenValid } from "/root/fetchWithToken.js";
import { router } from "/root/Router.js";
const OnlineGameTemplate = document.createElement('template')

OnlineGameTemplate.innerHTML = /*html*/ `
	<link rel="stylesheet" href="/Components/Game/GamePlay/GameOnline/OnlineGame.css">
	<img loading="lazy" class="OrangeCartImg" src="images/OrangeCart/OrangeCartImg.svg" alt="">
	<div class="shapes3-4">
		<div class="Online-text">
			<h1>ONLINE GAME</h1>
		</div>
		<div class="O-buttonC">
			<p>
				In this online ping pong game, you’ll be matched with a random player for a competitive match. The game consists of five rounds, and the player who wins the most rounds claims victory. Ready for a fun challenge? Let’s play!
			</p>
			<c-button bcolor="#EB9A45" Hcolor="#e98f2f"> 
				<h1 slot="text">START</h1>
			</c-button>
		</div>
	</div>
	`


export class OnlineGame extends HTMLElement{
	constructor (){
		super();
		this.is_clicked = false
		this.attachShadow({mode:'open'})
		this.shadowRoot.appendChild(OnlineGameTemplate.content.cloneNode(true))
		const button = this.shadowRoot.querySelector('c-button')
		button.addEventListener('click', async ()=>{
			if(isTokenValid(localStorage.getItem('accessToken')) == false)
			{
				router.handleRoute('/login')
				return
			}
			if(this.is_clicked) return
			this.is_clicked = true
			const lobby = new Lobby();
			lobby.OnlineGame();
		})
        this.classList.toggle('cart-animation', true)
        this.classList.toggle('opacity-0', true)
        setTimeout(() => {
			this.classList.toggle('opacity-0', false)
			this.classList.toggle('opacity-1', true)
		}, 2000);
	}
}