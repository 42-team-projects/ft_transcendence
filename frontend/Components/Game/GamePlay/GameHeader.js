
const HeaderTemplate = document.createElement('template');
import { userInfo, opponentInfo } from "/Components/Game/GamePlay/Lobby.js";
HeaderTemplate.innerHTML = /*html*/ `
<link rel="stylesheet" href="/Components/Game/GamePlay/GameTable.css">
<div class="leftPlayer">
<img loading="lazy"   class="GamePlayer" src="/images/svg-header/profile.jpeg" alt="playerImg" />
<div class="playerinfo">
    <div class="playerusername">
        <p></p>
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
<img loading="lazy"   class="GamePlayer1" src="/images/svg-header/profile.jpeg" alt="playerImg" />
<div class="playerinfo1">
    <div class="playerusername">
        <p></p>
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
        this.updateScore({player:0, opponent:0})
    }
    updateScore(score){
        // console.log('update : ', score);
        const player1 = this.querySelector('.playerscor')
        const player1Img = this.querySelector('.GamePlayer')
        const player1Name = this.querySelector('.playerinfo')
        player1.querySelector('h1').textContent = score.player
        player1Img.src = userInfo.picture;
        player1Name.querySelector('p').textContent = userInfo.username

        const player2 = this.querySelector('.playerscor1')
        const player2Img = this.querySelector('.GamePlayer1')
        const player2Name = this.querySelector('.playerinfo1')
        player2.querySelector('h1').textContent = score.opponent
        player2Img.src = opponentInfo.picture;
        // console.log(player1Name);
        // console.log(player2Name);
        player2Name.querySelector('p').textContent = opponentInfo.username
    }
}
