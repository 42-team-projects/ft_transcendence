import { Lobby } from "../Lobby.js"

const OnlineGameTemplate = document.createElement('template')

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
			<c-button bcolor="#EB9A45" Hcolor="#e98f2f"> 
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
		// setTimeout(() => {
			button.addEventListener('click', ()=>{
				const lobby = new Lobby();
				lobby.OnlineGame();
				setTimeout(() => lobby.setPlayer(), 5000);
				setTimeout(() => lobby.gameMode(), 6000);
			})
		// }, 4000);
        this.classList.toggle('cart-animation', true)
        this.classList.toggle('opacity-0', true)
        setTimeout(() => {
			this.classList.toggle('opacity-0', false)
			this.classList.toggle('opacity-1', true)
		}, 2000);
	}
}