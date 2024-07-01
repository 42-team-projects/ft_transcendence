import { PageName } from "./PageName.js";

import { PlayerBorder } from "./PlayerBorder.js";
customElements.define('page-name',PageName)
customElements.define('player-border',PlayerBorder)

const ia_lobby = document.createElement('template');

ia_lobby.innerHTML =  /* html */ `
    <style>

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
        .lines{
            position : absolute;
            width: 100%;
            height: 100%;
            z-index: 2;

        }
        .lines::before{
            content: '';
            position: absolute;
            background-image: url(../../../images/GreenCart/smalLine.svg);
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
            background-image: url(../../../images/GreenCart/line1.svg);
            background-repeat: no-repeat;
            background-size: contain;
            width: 4.4%;
            aspect-ratio: 0.7;
            top: 61.5%;
            left: 44.2%;
        }
        .VS{
            overflow: hidden;
            position : absolute;
            width: 100%;
            height: 100%;
            z-index: 2;
        }
        .VS::before{
            content: '';
            position: absolute;
            background-image: url(../../../images/GreenCart/V-Lobby.svg);
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
            background-image: url(../../../images/GreenCart/s-Lobby.svg);
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
            background-image: url(../../../images/GreenCart/lobby-border.svg);
            background-repeat : no-repeat;
            background-size: contain;
            width: 36.4%;
            aspect-ratio: 1;
            transform: scaleX(-1) scaleY(-1);
        }
        .Player{
            color: white;
            font-size: clamp(1rem, 9vw, 10rem);
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
        .playerImg{
            position: absolute;
            height: 99%;
            width: 99%;
            z-index: 0;
            border-radius: 2%;
        }
        .Name{
            z-index: 0;
            position: absolute;
            font-size: clamp(0.3rem, 1.5vw, 2rem);
            color: white;
            top:100%;
            margin: 0;
            animation: moveName 1s forwards;
            transform: translateY(-200%);
        }
        @keyframes moveName {
            to{
                transform: translateY(0%);
            }
        }
    </style>
    <page-name width="35%">
        <div slot="text" class="pageNameText">
            <h1>MATCH MAKING</h1>
        </div>
    </page-name>
    <player-border revers="false">
        <img class="playerImg" slot="Player" src="../../images/svg-header/profile.jpeg" alt="">
        <h1 class="Name" slot="Name" >NOUAKHRO</h1>
    </player-border>
    <player-border revers="true">
        <h1 class="Player" slot="Player" >AI</h1>
        <h1 class="Name" slot="Name" >AI</h1>
    </player-border>

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

export class IaLobby extends HTMLElement{

    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });

        // Clone the template content and append it to the shadow DOM
        this.shadowRoot.appendChild(ia_lobby.content.cloneNode(true));
    }

}

