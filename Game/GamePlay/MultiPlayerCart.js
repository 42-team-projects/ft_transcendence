

const MultiPlayerTemplate = document.createElement('template')


MultiPlayerTemplate.innerHTML = /*html*/ `
	<link rel="stylesheet" href="../Game/GamePlay/MultiPlayer.css">
	<img class="BlueCartImg" src="../images/BlueCart/multi-playerImg.svg" alt="">
	<img class="BlueCart" src="../../images/BlueCart/multiPlayerCart.svg" alt="">
	<div class="shapes2-3">
		<div class="shapes4-5">
			<div class="text">
				<h1>MULTI PLAYER</h1>
			</div>
			<div class="M-buttonC">
				<p>
				Lorem ipsum dolor sit amet. Ut facere consequatur est dolore placeat rem accusamus quae est odit dolore. Id impedit molestiae vel voluptates repellendus ut perferendis libero et blanditiis dolor est dolorum molestiae. 
				</p>
				<div class="M-buttons">
					<div class="M-buttons-content">
						<h1>START</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
	`
/*
	<div class="style-1">
		<div class="style-2">
	
		</div>
	</div>
</div>
</div>
			*/
						// <div class="mask1"></div>

export class MultiPlayer extends HTMLElement{

	constructor (){
		super();
		this.appendChild(MultiPlayerTemplate.content.cloneNode(true))
	}

}