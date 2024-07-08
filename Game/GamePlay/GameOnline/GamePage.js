
const game_page = document.createElement('template');

game_page.innerHTML = /*html*/ `
<link rel="stylesheet" href="../../Game/GamePlay/GameOnline/GamePage.css">


<div class="game_header">

	<div class="leftPlayer">
		<img class="GamePlayer" src="../../images/svg-header/profile.jpeg" />
		<div class="playerinfo">
			<div class="player_number">
				<p>PLAYER 1</p>
			</div>
			<div class="rackita"></div>
		</div>
		<div class="playerscor">
			<h1>10</h1>
		</div>
	</div>

	<div class="Play_Pause">
		<div class="pause"></div>
		<p class="status">PAUSE</p>			
	</div>
	
	<div class="rightPlayer">
		<img class="GamePlayer1" src="../../images/svg-header/profile.jpeg" />
		<div class="playerinfo1">
			<div class="player_number">
				<p>PLAYER 1</p>
			</div>
			<div class="rackita1"></div>
		</div>
		<div class="playerscor1">
			<h1>5</h1>
		</div>
	</div>

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
		<div class="table_container">
			<div class="table">
                <div class="rackit_of_p1"></div>
                <div class="rackit_of_p2"></div>
            </div>
		</div>
	</div>
</div>

`

export class GamePage extends HTMLElement{

    constructor()
    {
        super();
        this.appendChild(game_page.content.cloneNode(true))
        let keys = {
            keyS: false,
            keyW: false,
            keyArrowUp: false,
            keyArrowDown: false,
        }
        const player1 = this.querySelector('.rackit_of_p1')
        const player2 = this.querySelector('.rackit_of_p2')
        player1.style.top = '50%';
        player2.style.top = '50%';
        addEventListener('keydown', (event) => this.setMove(event, keys));
        addEventListener('keyup', (event) => this.resetMove(event, keys));
    }
    movePlayer(keys){
        const player1 = this.querySelector('.rackit_of_p1')
        const player2 = this.querySelector('.rackit_of_p2')
        if(keys.keyW === true)
            this.moveUp(player1);
        if(keys.keyS === true)
            this.moveDown(player1);
        if(keys.keyArrowUp === true)
            this.moveUp(player2);
        if(keys.keyArrowDown === true)
            this.moveDown(player2);
    }
    setMove = (event, keys) =>{
        if(event.key === 'w' || event.key === 'W')
            keys.keyW = true;
        if(event.key === 's' || event.key === 'S')
            keys.keyS = true;
        if(event.key === 'ArrowUp')
            keys.keyArrowUp = true;
        if(event.key === 'ArrowDown')
            keys.keyArrowDown = true;
        this.movePlayer(keys);
    }
    resetMove = (event, keys) =>{
        if(event.key === 'w' || event.key === 'W')
            keys.keyW = false;
        if(event.key === 's' || event.key === 'S')
            keys.keyS = false;
        if(event.key === 'ArrowUp')
            keys.keyArrowUp = false;
        if(event.key === 'ArrowDown')
            keys.keyArrowDown = false;
    }
    moveDown(player){
        const top = Number(player.style.top.replace('%', ''));
        const parse_top = parseFloat(top);
        if(top + 12 >= 100)
            return;
        player.style.top = (top + 1) + '%';
    }
    moveUp(player){
        const top = Number(player.style.top.replace('%', ''));
        const parse_top = parseFloat(top);
        console.log(top);
        if(top - 1 <= 0)
            return;
        player.style.top = (top - 1) + '%';
    }

}

customElements.define('game-page', GamePage)