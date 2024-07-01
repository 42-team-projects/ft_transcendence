
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
        .player{
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 36.4%;
            aspect-ratio: 1;
            overflow: hidden;
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
            to {
                transform: translateY(106%);
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
        .opponent h1{
            color: white;
            font-size: clamp(1rem, 9vw, 10rem);
            transform: scaleX(-1) scaleY(-1);
        }
        .playerImg{
            position: absolute;
            height: 99%;
            width: 99%;
            z-index: 0;
            border-radius: 2%;
        }
        .playerborder{
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        .page-name{
            display: flex;
            justify-content: center;
            align-items: start;
            position: absolute;
            clip-path: polygon(0% 0%, 100% 0%, 84% 80%, 7% 80%, 7% 100%, 0% 80%);
            width: 35%;
            height: 11%;
            gr: #00fffc45;
            background: linear-gradient(62deg, #00fffc66 0%, #00fffc1f 61%);
            top: -0.2%;
            left: -2%;
        }
        .page-name h1{
            color : white;
            
        }
    </style>
    <div class="player">
    <img class="playerborder" src="../../../images/GreenCart/lobby-border.svg" alt="">
    <img class="playerImg" src="../../images/svg-header/profile.jpeg" alt="">
    </div>
    <div class="opponent">
    <h1>AI</h1>
    </div>
    <div class="VS">
    </div>
    <div class="lines"></div>
    `
    // <div class="page-name">
    //     <h1>
    //         MATCH MAKING
    //     </h1>
    // </div>

export class IaLobby extends HTMLElement{

    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });

        // Clone the template content and append it to the shadow DOM
        this.shadowRoot.appendChild(ia_lobby.content.cloneNode(true));
    }
}

