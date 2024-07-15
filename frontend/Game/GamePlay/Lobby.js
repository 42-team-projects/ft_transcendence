import { PageName } from "./SinglePlayer/PageName.js";

import { PlayerBorder } from "./SinglePlayer/PlayerBorder.js";
customElements.define('page-name',PageName)
customElements.define('player-border',PlayerBorder)

const ai_lobby = document.createElement('template');
const playerSlot = document.createElement('template');
const opponentSlot = document.createElement('template');

playerSlot.innerHTML = /*html*/ `
    <slot  name="PlayerImg" slot="Player"> </slot>
    <slot  name="PlayerName" slot="Name"> </slot>
`

opponentSlot.innerHTML = /*html*/ `

    <slot  name="searshing" slot="searching"> </slot>
    <slot name="OpponentName" slot="Name"></slot>
    `

ai_lobby.innerHTML =  /* html */ `
    <style>

        :host{
            position: relative;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width : 60%;
            aspect-ratio: 1.7;
            background-color: #e6ffff14;
            box-shadow: 0px 0px 15px 1px #0000001c;
            border-radius: 15px 15px 15px 15px;
        }
        .lines{
            position : absolute;
            width: 100%;
            height: 100%;
            z-index: 2;

        }
        .lines::before{
            content: '';
            position: absolute;
            background-image: url(images/GreenCart/smalLine.svg);
            background-repeat: no-repeat;
            background-size: contain;
            width: 1.5%;
            aspect-ratio: 0.7;
            top: 27%;
            left: 53.8%;
        }
        .lines::after{
            position: absolute;
            content: '';
            background-image: url(images/GreenCart/line1.svg);
            background-repeat: no-repeat;
            background-size: contain;
            width: 4.4%;
            aspect-ratio: 0.7;
            top: 61.5%;
            left: 44.2%;
        }
        .VS{
            position : absolute;
            width: 100%;
            height: 100%;
            z-index: 2;
        }
        .VS::before{
            content: '';
            position: absolute;
            background-image: url(images/GreenCart/V-Lobby.svg);
            background-repeat: no-repeat;
            background-size: contain;
            width: 12.1%;
            aspect-ratio: 0.7;
            left: 42.6%;
            animation: moveV 1s forwards;
            transform: translateY(-100%);
        }
        @keyframes moveV {

            100%{
                transform: translateY(106%);
            }
        }
        @keyframes pulseShadow {
            0%, 100% {
                filter: drop-shadow(0px 0px 5px white);
            }
            50% {
                filter: drop-shadow(0px 0px 10px white);
            }
        }
        .VS::after{
            position: absolute;
            content: '';
            background-image: url(images/GreenCart/s-Lobby.svg);
            background-repeat: no-repeat;
            background-size: contain;
            width: 12.1%;
            aspect-ratio: 0.7;
            top: 44%;
            left: 47%;
            animation: moveS 1s forwards;
            transform: translateY(200%);
        }
        @keyframes moveS {
            to {
                transform: translateY(0);
            }
        }
        .opponent{
            display: flex;
            justify-content: center;
            align-items: center; 
            background-image: url(images/GreenCart/lobby-border.svg);
            background-repeat : no-repeat;
            background-size: contain;
            width: 36.4%;
            aspect-ratio: 1;
            transform: scaleX(-1) scaleY(-1);
        }
        
        .pageNameText{
            width: var(--width);
            height: 90%;
            position: relative;
            display: flex;
            align-items: center;
            left:4%;
        }
        .pageNameText h1{
            font-size: clamp(0.5rem, 2vw, 2.3rem);
            color: white;
        }

    </style>
    <page-name width="35%">
        <div slot="text" class="pageNameText">
            <h1>MATCH MAKING</h1>
        </div>
    </page-name>

    <div class="VS">
    </div>
    <div class="lines"></div>
    `
    /*
            border: 1px solid red;
            :host{
            position: relative;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width : 72%;
            aspect-ratio: 1.7;
            border-radius: 10px;
            background-color: #e6ffff14;
        }
        
        :host::before{

        }
            .page-name h1{
            color : white;
            
        }
    */
    // <!--  -->
export class aiLobby extends HTMLElement{

    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(ai_lobby.content.cloneNode(true));
        this.setSlots(playerSlot.content, 'false')
        this.setSlots(opponentSlot.content, 'true')
        this.headerAnimation();
        this.sidebarAnimation();
        setTimeout(() => {
            document.body.classList.toggle('body-game-shrink', true);   
        }, 1000);
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
}

