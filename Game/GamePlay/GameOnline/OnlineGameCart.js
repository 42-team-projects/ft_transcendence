
import {Buttons} from '../buttons.js'

const OnlineGameTemplate = document.createElement('template')


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
	}

}