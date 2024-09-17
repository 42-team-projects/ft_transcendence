const MultiPlayerTemplate = document.createElement('template')

MultiPlayerTemplate.innerHTML = /*html*/ `
	<link rel="stylesheet" href="/Components/Game/GamePlay/GameOfline/GameOfline.css">
	<img loading="lazy" class="BlueCartImg" src="/images/BlueCart/multi-playerImg.svg" alt="BlueImg">
	<img loading="lazy" class="BlueCart" src="/images/BlueCart/GameOfline.svg" alt="Blue">
	<div class="shapes2-3">
		<div class="shapes4-5">
			<div class="text">
				<h1>MULTI PLAYER</h1>
			</div>
			<div class="M-buttonC">
				<p>
				Lorem ipsum dolor sit amet. Ut facere consequatur est dolore placeat rem accusamus quae est odit dolore. Id impedit molestiae vel voluptates repellendus ut perferendis libero et blanditiis dolor est dolorum molestiae. 
				</p>
				<c-button bcolor="#2EA4E1" Hcolor="#197fb3"> 
					<h1 slot="text">START</h1>
				</c-button>
			</div>
		</div>
	</div>
	`

export class MultiPlayer extends HTMLElement{

	constructor (){
		super();
		this.attachShadow({mode:'open'})
		this.shadowRoot.appendChild(MultiPlayerTemplate.content.cloneNode(true))
        this.classList.toggle('cart-animation', true)
        this.classList.toggle('opacity-0', true)
		setTimeout(() => {
			this.classList.toggle('opacity-0', false)
			this.classList.toggle('opacity-1', true)
		}, 4000);
	}

}