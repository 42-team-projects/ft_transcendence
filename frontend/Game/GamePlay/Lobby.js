import { PlayerBorder } from "./PlayerBorder.js";
import { GameHeader } from "./GameHeader.js"
import { GameTable } from "./GameTable.js"

const lobby = document.createElement('template');
const playerSlot = document.createElement('template');
const opponentSlot = document.createElement('template');
const AiGameTemplate = document.createElement('template')
const OnlineGameTemplate = document.createElement('template')

let searching_images = [
	{
		picture: 'images/svg-header/profile.jpeg',
		username: 'ESCANOR'
	},
	{
		picture: 'images/OrangeCart/images.png',
		username: 'ITATCHI'
	},
	{
		picture: 'images/OrangeCart/img1.png',
		username: 'ESALIM'
	},
	{
		picture: 'images/OrangeCart/img2.jpg',
		username: 'KILLUA'
	},
	{
		picture: 'images/OrangeCart/img3.jpg',
		username: 'GOJO'
	}
]
playerSlot.innerHTML = /*html*/ `
    <slot  name="PlayerImg" slot="Player"> </slot>
    <slot  name="PlayerName" slot="Name"> </slot>
`

AiGameTemplate.innerHTML = /*html*/ `
    <link rel="stylesheet" href="./Game/GamePlay/AiLobby.css">
    <img id='Player' class="Player" slot="PlayerImg" alt="Player" />
    <h1 id='NPlayer' class="Name" slot="PlayerName"></h1>
    <h1 id='Opponent' class="Opponent" slot="searshing"></h1>
    <h1 id='NOpponent' class="Name" slot="OpponentName"></h1>
`

OnlineGameTemplate.innerHTML = /*html*/ `
    <link rel="stylesheet" href="./Game/GamePlay/OnlineGameLobby.css">
	<div class="searshingImgs" slot="searshing">
		<img id='Opponent1' class="PlayerS" alt="searchingImg"/>
		<img id='Opponent2' class="PlayerS" alt="searchingImg"/>
		<img id='Opponent3' class="PlayerS" alt="searchingImg"/>
		<img id='Opponent4' class="PlayerS" alt="searchingImg"/>
		<img id='Opponent5' class="PlayerS" alt="searchingImg"/>
	</div>

    <img id='Player' class="Player" slot="PlayerImg" alt="" />
    <h1 id='NPlayer' class="Name" slot="PlayerName"></h1>
`

opponentSlot.innerHTML = /*html*/ `

    <slot  name="searshing" slot="searching"> </slot>
    <slot name="OpponentName" slot="Name"></slot>
    `

lobby.innerHTML =  /* html */ `
    <link rel="stylesheet" href="./Game/GamePlay/Lobby.css">
    <page-name width="35%">
        <div slot="text" class="pageNameText">
            <h1>MATCH MAKING</h1>
        </div>
    </page-name>

    <div class="VS">
    </div>
    <div class="lines"></div>
    `
let time = 3;
const timer = document.createElement('template')
timer.innerHTML = /*html*/ `
    <link rel="stylesheet", href="./Game/GamePlay/Timer.css">
	<div class="descounter">
		<h1>${time}</h1>
	</div>
`

export class Lobby extends HTMLElement{

    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(lobby.content.cloneNode(true));
    }

    headerAnimation(){
        const headerBar = document.body.querySelector('header-bar');
        const profile = headerBar.querySelector('c-profile');
        const userRunk = profile.querySelector('user-rank');
    
        userRunk.classList.toggle('drop-100', false);
        userRunk.classList.toggle('game-mode', true);
        userRunk.classList.toggle('down-60', false);
        userRunk.classList.toggle('rise-0', true);

        headerBar.classList.toggle('game-mode', true);
        headerBar.classList.toggle('up-100', true);
        headerBar.classList.toggle('p-animation', true);
        setTimeout(() => {
            headerBar.innerHTML = '';
        }, 1000);
    }

    sidebarAnimation(){
        const sideBar = document.body.querySelector('side-bar');
        const Buttons = sideBar.shadowRoot.querySelector('.buttons');
        const clickedButtons = Buttons.querySelector('.on');
    
        sideBar.classList.toggle('game-mode', true);
        sideBar.classList.toggle('left', true);
        clickedButtons.classList.toggle('on', false);
        sideBar.classList.toggle('p-animation', true);
        setTimeout(() => {
            sideBar.shadowRoot.innerHTML = '';
        }, 1000);
    }
    setSlots(template, revers){
        const border = new PlayerBorder();
        border.setAttribute('revers', revers);
        border.appendChild(template.cloneNode(true))
        this.shadowRoot.appendChild(border.cloneNode(true))
    }

    connectedCallback()
    {
        this.setSlots(playerSlot.content, 'false')
        this.setSlots(opponentSlot.content, 'true')
        this.headerAnimation();
        this.sidebarAnimation();
        setTimeout(() => {
            document.body.classList.toggle('body-game-shrink', true);   
        }, 1000);

    }
    async getData(str)
    {
        try{

            const response = await fetch(str);
            if(response.ok)
                return response.json();
            throw new Error("cant recive anything")            
        }
        catch(error){
            console.log(error)
        }
    }
    async OnlineGame()
    {
        searching_images = await this.getData('http://127.0.0.1:8000/game/');
        for(let userData in searching_images)
        {
            // console.log(userData);
            console.log(searching_images[0].picture);
        }
		const root = document.querySelector('root-content')
        const p_img = OnlineGameTemplate.content.getElementById('Player')
		p_img.src = 'images/svg-header/profile.jpeg';
		const p_h1 = OnlineGameTemplate.content.getElementById('NPlayer')

		p_h1.textContent = 'NOUAKHRO'

		const players = OnlineGameTemplate.content.querySelectorAll('.PlayerS')
		players.forEach((element, index)=>{
			element.style.setProperty('--dest', '400%');
			element.style.setProperty('--numsec', 1);
			element.src = searching_images[index].picture;
		})
		this.appendChild(OnlineGameTemplate.content.cloneNode(true))
		root.innerHTML = ``
		root.appendChild(this)
    }
    setPlayer(){
		const h1 = document.createElement('h1')
		const PlayerS = this.querySelectorAll('.PlayerS')
		PlayerS.forEach((element)=>{
			element.style.setProperty('--numsec', 10);
			element.style.setProperty('--dest', '400%');
			element.style.opacity = '1'
		})
		h1.id = 'NOpponent'
		h1.classList = 'Name'
		h1.slot = 'OpponentName'
		h1.textContent = searching_images[0].username
		this.appendChild(h1.cloneNode(true))	
	}
    SinglePlayer()
    {
        const root = document.querySelector('root-content')
        const p_img = AiGameTemplate.content.getElementById('Player')
        p_img.src = 'images/svg-header/profile.jpeg';
        const p_h1 = AiGameTemplate.content.getElementById('NPlayer')

        p_h1.textContent = 'NOUAKHRO'

        const o_img = AiGameTemplate.content.getElementById('Opponent')
        o_img.textContent = 'AI'
        const o_h1 = AiGameTemplate.content.getElementById('NOpponent')

        o_h1.textContent = 'AI'

        this.appendChild(AiGameTemplate.content.cloneNode(true))
        root.innerHTML = ``
        root.appendChild(this)
    }
	gameMode(){
		const PlayerS = this.querySelectorAll('.PlayerS')
		PlayerS.forEach((element, index)=>{
			if(index !== 0)
				element.remove()
			else{
				element.style.animation = 'none';
				this.shadowRoot.appendChild(timer.content.cloneNode(true));
				const countdown = setInterval(()=>{
					time--;
					const desc = this.shadowRoot.querySelector('.descounter')
					const h1 = desc.querySelector('h1')

					if(time < 0){
						const header = new GameHeader()
						const game = new GameTable();
						document.body.innerHTML = ``;
						document.body.appendChild(header);
						document.body.appendChild(game);
						clearInterval(countdown)
					}
					else{
						h1.textContent = `${time}`
					}
				},1000)
			}
		})
	}
}

