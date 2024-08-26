import { PlayerBorder } from "./PlayerBorder.js";
import { GameHeader } from "./GameHeader.js"
import { GameTable } from "./GameTable.js"
import { ip , playerId } from "../../../Utils/GlobalVariables.js";

const lobby = document.createElement('template');
const playerSlot = document.createElement('template');
const opponentSlot = document.createElement('template');
const AiGameTemplate = document.createElement('template');
const OnlineGameTemplate = document.createElement('template');
const timer = document.createElement('template')

let searching_images = [
	{
		picture: `http://${ip}:8000/media/24/08/10/profile.jpeg`,
		username: 'ESCANOR'
	},
	{
		picture: `http://${ip}:8000/media/24/08/10/images.png`,
		username: 'ITATCHI'
	},
	{
		picture: `http://${ip}:8000/media/24/08/10/img1.png`,
		username: 'ESALIM'
	},
	{
		picture: `http://${ip}:8000/media/24/08/10/img2.jpg`,
		username: 'KILLUA'
	},
	{
		picture: `http://${ip}:8000/media/24/08/10/img3.jpg`,
		username: 'GOJO'
	}
]

export let userInfo = {
	picture: `http://${ip}:8000/media/24/08/10/img3.jpg`,
	username: 'GOJO',
}

export let opponentInfo = {
	picture: `http://${ip}:8000/media/24/08/10/img3.jpg`,
	username: 'GOJO',
}

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



export class Lobby extends HTMLElement{

	constructor(opponentId){
		super();
		this.time = 0;
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(lobby.content.cloneNode(true));
		this.setSlots(playerSlot.content, 'false')
		this.setSlots(opponentSlot.content, 'true')
		setTimeout(() => {
			document.body.classList.toggle('body-game-shrink', true);   
		}, 1000);
		if(opponentId)
			this.OnlineGame(opponentId);
		else{
			this.headerAnimation();
			this.sidebarAnimation();
		}
	}

	headerAnimation(){
		const headerBar = document.body.querySelector('header-bar');
		const profile = headerBar.querySelector('c-profile');
		const userRunk = profile.querySelector('user-rank');
	
		userRunk.classList.toggle('drop-100', false);
		userRunk.classList.toggle('transform-1s', true);
		userRunk.classList.toggle('down-60', false);
		userRunk.classList.toggle('rise-0', true);
		headerBar.classList.toggle('transform-1s', true);
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
	
		sideBar.classList.toggle('transform-1s', true);
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

	async openSocket(userId){
		this.socket = new WebSocket(`ws://${ip}:8000/ws/matchmaking/${userId}/`);
		this.socket.onopen = (e) => {
			console.log('socket open');
		};

		this.socket.onmessage = (e) => {
			var data = JSON.parse(e.data).message;
			if (Number(data.user_1) === userId) {
				setTimeout(() => this.setPlayer(data.user_2), 5000);
				setTimeout(() => this.gameMode(data.room_group_name), 6000);
			} else if (Number(data.user_2) === userId) {
				setTimeout(() => this.setPlayer(data.user_1), 5000);
				setTimeout(() => this.gameMode(data.room_group_name), 6000);
			} else {
				this.time = data.time;
				this.updateTimer();
			}
		};

		this.socket.onerror = (e) => {
			console.log('socket error');
		};
	}

	async setSearchImages(){
		console.log('setSearchImages')
		let delay = 0; 
		const turnTime = 1;
		const Players = OnlineGameTemplate.content.querySelectorAll('.PlayerS');
		let delayNumber = (turnTime / 2) / Players.length;
		// searching_images = await this.getData(`http://${ip}:8000/game/players/`);
		Players.forEach((element, index)=>{
			element.style.animationDelay = `${delay}s`;
			element.style.setProperty('--dest', ((Players.length - 1) * 100) + '%');
			element.style.setProperty('--numsec', turnTime);
			element.src = searching_images[index].picture;
			delay += delayNumber;
		})
	}

	async OnlineGame(opponentId)
	{
		//get user id from local storage
		const userId = playerId;
		const root = document.querySelector('root-content');
		const p_img = OnlineGameTemplate.content.getElementById('Player');
		const p_h1 = OnlineGameTemplate.content.getElementById('NPlayer');
		userInfo = await this.getData(`http://${ip}:8000/game/players/${userId}/`);
		p_img.src = userInfo.picture;
		p_h1.textContent = userInfo.username;
		if(!opponentId)
		await this.setSearchImages();
		this.appendChild(OnlineGameTemplate.content.cloneNode(true));
		if (!opponentId)
			await this.openSocket(userId);
		else {
			await this.setPlayer(opponentId);
			this.gameMode();
		}
		root.innerHTML = ``;
		root.appendChild(this);
	}

	async setPlayer(opponentId){
		const h1 = document.createElement('h1');
		const Players = this.querySelectorAll('.PlayerS');
		console.log(Players)
		const turnTime = 10;
		let delay = 0;
		let delayNumber = (turnTime / 2) / Players.length;
		opponentInfo = await this.getData(`http://${ip}:8000/game/players/${opponentId}/`)
		h1.id = 'NOpponent';
		h1.classList = 'Name';
		h1.slot = 'OpponentName';
		h1.textContent = opponentInfo.username;
		Players[0].src = opponentInfo.picture
		Players.forEach((element)=>{
			element.style.animationDelay = `${delay}s`;
			element.style.setProperty('--numsec', turnTime);
			element.style.setProperty('--dest', ((Players.length - 1) * 100) + '%');
			element.style.opacity = '1';
			delay += delayNumber;
		})
		this.appendChild(h1.cloneNode(true));
	}
	SinglePlayer()
	{
		const root = document.querySelector('root-content')
		const p_img = AiGameTemplate.content.getElementById('Player')
		const p_h1 = AiGameTemplate.content.getElementById('NPlayer')
		const o_img = AiGameTemplate.content.getElementById('Opponent')
		const o_h1 = AiGameTemplate.content.getElementById('NOpponent')

		p_h1.textContent = userInfo.username;
		p_img.src = userInfo.picture;
		o_img.textContent = 'AI';
		o_h1.textContent = 'AI';
		this.appendChild(AiGameTemplate.content.cloneNode(true));
		root.innerHTML = ``;
		root.appendChild(this);
	}
	gameMode(room_group_name){
		// if (this.socket)
		// 	this.socket.send(JSON.stringify({'message': 'start'}));
		const PlayerS = this.querySelectorAll('.PlayerS')
		PlayerS.forEach((element, index)=>{
			if(index !== 0)
				element.remove()
			else{
				element.style.animation = 'none';
				this.createTimer();
				const countdown = setInterval(()=>{
					if(this.time <= 0){
						this.socket.close();
						this.socket.onclose = (e) => {
							console.log('socket close');
							const header = new GameHeader();
							const game = new GameTable(room_group_name);
							document.body.innerHTML = ``;
							document.body.appendChild(header);
							document.body.appendChild(game);
							clearInterval(countdown)
						};
					}
				},1000)
			}
		})
	}
	createTimer(){
		timer.innerHTML = /*html*/ `
			<link rel="stylesheet", href="./Game/GamePlay/Timer.css">
			<div class="descounter">
				<h1>${this.time}</h1>
			</div>
		`
		this.shadowRoot.appendChild(timer.content.cloneNode(true));
	}
	updateTimer(){
		const h1 = this.shadowRoot.querySelector('.descounter h1');
		h1.textContent = this.time;
	}
}
