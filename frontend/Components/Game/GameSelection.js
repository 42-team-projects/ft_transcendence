

const game_selection = document.createElement('template')

game_selection.innerHTML = /*html*/ `
    <style>
        :host {
            position:relative;
            align-items: center;
            width:100%;
            height:100%;
            display: grid;
            grid-template-columns: repeat(3, 30rem);
            grid-template-areas: 
            "single multiple online";
            justify-content: space-around;
            transition: grid 0.3s ease;
        }
        @media (max-width: 1600px){
            :host{
                grid-template-columns: repeat(3, 25rem);
            }
        }
        .playerImg{
            position: absolute;
            height: 99%;
            width: 99%;
            z-index: 0;
            border-radius: 2%;
        }

        .Player{
            color: white;
            font-size: 10rem;
        }
        .Name{
            z-index: 0;
            position: absolute;
            font-size: 2rem;
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

        .cart-animation{
            position: relative;
            width: 100%;
            aspect-ratio: 0.56;
            transition: transform 0.3s ease;
            animation: retate 1s ease;
            opacity: 1 !important;
        }
        .opacity-0{
            opacity: 0;
        }
        .opacity-1{
            opacity: 1;
        }
        @keyframes retate{
            from{
                top: 100%;
                transform: translateY(var(--position, 0));
            }
            to{
                top: 0%;
                opacity: 1;
                transform: translateY(var(--position, 0));
            }
        }
        
    </style>
    <single-player></single-player>
    <multi-player></multi-player>
    <online-game></online-game>
    `
    // .cart-animation:nth-child(1) { animation-delay: 0s; }
    // .cart-animation:nth-child(2) { animation-delay: 1s; }
    // .cart-animation:nth-child(3) { animation-delay: 2s; }
export class GameSelection extends HTMLElement{

    constructor()
    {
        super();
        const shadow = this.attachShadow({
            mode : 'open'            
        })
        shadow.appendChild(game_selection.content.cloneNode(true))
    }
}
