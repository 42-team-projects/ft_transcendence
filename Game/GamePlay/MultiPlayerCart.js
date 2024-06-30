

const MultiPlayerTemplate = document.createElement('template')


MultiPlayerTemplate.innerHTML = /*html*/ `
	<link rel="stylesheet" href="../Game/GamePlay/MultiPlayer.css">
	<img class="BlueCartImg" src="../images/multi-playerImg.svg" alt="">
	<img class="BlueCart" src="../../images/multiPlayerCart.svg" alt="">
	<div class="shapes2-3">
	<div class="shapes2-3">
	</div>
	</div>
	`
/*
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
				<div class="buttons">
					<div class="buttons-content">
						<h1>START</h1>
					</div>
				</div>
			</div>
	
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