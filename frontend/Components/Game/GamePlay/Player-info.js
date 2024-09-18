const PlayerInfoTemplate = document.createElement('template');
PlayerInfoTemplate.innerHTML = /*html*/ `
    <style>
        .playerinfo{
            grid-area: player_info;
            display:flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
        }
        .rackita {
            width: 50%;
            height: 15%;
            background-color: white;
        }
        .playerscor{
            grid-area: scor;
            display:flex;
            justify-content: center;
            align-items: center;
        }
    </style>
    <img loading="lazy" alt="playerImg"/>
    <div class="playerinfo">
        <div class="playerusername">
            <p></p>
        </div>
        <div class="rackita"></div>
    </div>
    <div class="playerscor">
        <h1>0</h1>
    </div>
`

export class PlayerInfo extends HTMLElement {
    constructor(state){
        super();
        this.states = state
        this.appendChild(PlayerInfoTemplate.content.cloneNode(true))
        if(this.states == 'offline')
            this.querySelector('img').remove()
    }
    newScore(score, userInfo){
        const player = this.querySelector('.playerscor')
        const playerImg = this.querySelector('img')
        const playerName = this.querySelector('.playerinfo')
        const rackita = this.querySelector('.rackita')
        player.querySelector('h1').textContent = score
        if(this.states != 'offline'){
            playerImg.src = userInfo.picture;
            rackita.style.backgroundColor = userInfo.color
        }
        playerName.querySelector('p').textContent = userInfo.username
    }

    get state(){
        return this.getAttribute('state')
    }
    static observedAttributes = ['state']

    connectedCallback(){
        if(this.state == 'reverse'){
            if(this.states != 'offline')
                this.querySelector('img').style.transform = 'scaleX(-1)';
            this.querySelector('.playerinfo').style.transform = 'translateY(0%) scaleX(-1)';
            this.querySelector('.playerscor').style.transform = 'translateY(0%) scaleX(-1)';
            this.style.transform = 'translateY(0%) scaleX(-1)';
        }
    }
    attributeChangedCallback(attrName, oldValue, newValue){
        if(attrName == 'state'){
            this.style.transform = newValue;
        }
    }

} 

customElements.define('player-info', PlayerInfo)