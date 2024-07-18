


{/* <div class="typing" >
<p>Hi Players before launching the game we want to tell you the game rules</p>
</div> */}
// p{
//     font-size: clamp(0.5rem, 5vw, 4rem);
//     color: white;
//     text-shadow: 0 0 1px #00b9be;
// }
// in  each 2 rounds the ball are given to the oder player in the start the ball given to player 1
// .typing p {
//     overflow: hidden;
//     border-right: 0.15em solid white;
//     white-space: nowrap;
//     margin: 0;
//     letter-spacing: 0.15em;
//     animation: typing 2s steps(40, end), blink-caret 0.8s step-end infinite;
//     font-size: 2em;
//     color: white;
// }

// @keyframes typing {
//     from { width: 0; }
//     to { width: 100%; }
// }

// @keyframes blink-caret {
//     from, to { border-color: transparent; }
//     50% { border-color: white; }
// }
export class LaunchingGame extends HTMLElement{
    constructor(Time, RoundNumber)
    {
        super();
        const launching_game = document.createElement('template')
        launching_game.innerHTML = /*html*/`
            <style>
                p{
                    font-size: clamp(0.5rem, 5vw, 4rem);
                    color: white;
                    text-shadow: 0 0 1px #00b9be;
                }
            </style>
            <p>Round ${RoundNumber}</p>
            <p>${Time}</p>
        `
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(launching_game.content.cloneNode(true))
    }
    updateTimer(time, RoundNumber){
        this.shadowRoot.firstElementChild.textContent = `${RoundNumber}`
        this.shadowRoot.lastElementChild.textContent = `${time}`
    }
}
// <p>Round 1</p>
// <p>${Time}</p>
customElements.define('launching-game', LaunchingGame)