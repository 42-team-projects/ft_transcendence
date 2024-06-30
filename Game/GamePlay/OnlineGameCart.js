

const OnlineGameTemplate = document.createElement('template')


OnlineGameTemplate.innerHTML = /*html*/ `
	<link rel="stylesheet" href="../Game/GamePlay/OnlineGame.css">
	<img class="OrangeCartImg" src="../images/OrangeCart/OrangeCartImg.svg" alt="">
	<div class="shapes3-4">
		<div class="Online-text">
			<h1>ONLINE GAME</h1>
		</div>
		<div class="O-buttonC">
			<p>
			Lorem ipsum dolor sit amet. Ut facere consequatur est dolore placeat rem accusamus quae est odit dolore. Id impedit molestiae vel voluptates repellendus ut perferendis libero et blanditiis dolor est dolorum molestiae. 
			</p>
			<div class="O-buttons">
				<div class="O-buttons-content">
					<h1>START</h1>
				</div>
			</div>
		</div>
	</div>
	`
/*
		</div>
	</div>
	<div class="style-1">
		<div class="style-2">
	
		</div>
	</div>
</div>
</div>
			*/
						// <div class="mask1"></div>

export class OnlineGame extends HTMLElement{

	constructor (){
		super();
		this.appendChild(OnlineGameTemplate.content.cloneNode(true))
	}

}