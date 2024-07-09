
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
			<h1>0</h1>
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
			<h1>0</h1>
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
                <div class="ball"></div>
                <div class="rackit_of_p2"></div>
            </div>
		</div>
	</div>
</div>

`

let cordonat = {
    x : 1,
    y : 1
}
let keys = {
    keyS: false,
    keyW: false,
    keyArrowUp: false,
    keyArrowDown: false,
}
export class GamePage extends HTMLElement{

    constructor()
    {
        super();
        this.appendChild(game_page.content.cloneNode(true))
        const player1 = this.querySelector('.rackit_of_p1')
        const player2 = this.querySelector('.rackit_of_p2')
        const ball = this.querySelector('.ball')
        player1.style.top = '50%';
        player2.style.top = '50%';
        player1.style.left = '0%';
        player2.style.left = '99%';
        ball.style.top = '40%';
        ball.style.left = '20%';
        addEventListener('keydown', (event) => this.setMove(event, keys));
        addEventListener('keyup', (event) => this.resetMove(event, keys));
        const  checkKeys = ()=> {
            this.movePlayer(keys);
            this.moveBall(cordonat, ball)
            requestAnimationFrame(checkKeys);
        }
        requestAnimationFrame(checkKeys);
    }
    moveBall(cordonat, ball){
        const player1 = this.querySelector('.rackit_of_p1')
        const player2 = this.querySelector('.rackit_of_p2')

        let top = Number(ball.style.top.replace('%', ''));
        let left = Number(ball.style.left.replace('%', ''));

        const player1Left = Number(player1.style.left.replace('%', ''));
        const player1Top = Number(player1.style.top.replace('%', ''));
        const player2Left = Number(player2.style.left.replace('%', ''));
        const player2Top = Number(player2.style.top.replace('%', ''));
        top += cordonat.y;
        left -= cordonat.x;
    
        if (top + 5 >= 100 || top <= 0) {
            cordonat.y *= -1;
        }
        // console.log('left : ', left ,'top : ',  top, 'player1left : ' ,  player1Left, 'player1top : ' ,  player1Top);
        if ((left <= (player1Left + 1) && ((top >= player1Top || top + 5 >= player1Top) && (top <= player1Top + 12 || top + 5 <= player1Top + 12))) || (left >= (player2Left - 1) && ((top >= player2Top || top + 5 >= player2Top) && (top <= player2Top + 12 || top + 5 <= player2Top + 12)))) {
            cordonat.x *= -1;
        }
        if(left < 0 || left > 100)
        {
            ball.style.top = '40%';
            ball.style.left = '20%';
            cordonat.y = 1;
            cordonat.x = 1;
            return ;
        }
        ball.style.top = top + '%';
        ball.style.left = left + '%';
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
        if(top + 12 >= 100)
            return;
        player.style.top = (top + 1) + '%';
    }
    moveUp(player){
        const top = Number(player.style.top.replace('%', ''));
        if(top <= 0)
            return;
        player.style.top = (top - 1) + '%';
    }

}

customElements.define('game-page', GamePage)