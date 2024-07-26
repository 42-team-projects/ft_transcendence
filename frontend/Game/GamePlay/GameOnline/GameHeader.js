
const HeaderTemplate = document.createElement('template');

HeaderTemplate.innerHTML = /*html*/ `
<link rel="stylesheet" href="./Game/GamePlay/GameOnline/GameTable.css">
<div class="leftPlayer">
<img loading="lazy" class="GamePlayer" src="./images/svg-header/profile.jpeg" alt="playerImg" />
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
<img loading="lazy" class="GamePlayer1" src="./images/svg-header/profile.jpeg" alt="playerImg" />
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
`

export class GameHeader extends HTMLElement{
    constructor(){
        super();
        this.appendChild(HeaderTemplate.content.cloneNode(true))
    }
    updateScore(score){
        this.querySelector('.playerscor h1').textContent = score.player1
        this.querySelector('.playerscor1 h1').textContent = score.player2
    }
}

customElements.define('game-header', GameHeader)