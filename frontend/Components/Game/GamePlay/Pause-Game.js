const PauseGameTemplate = document.createElement('template');

PauseGameTemplate.innerHTML = /*html*/`
<style>
    .Play_Pause{
        display:flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    .pause{
        width:40%;
        height:50%;
        display:flex;
        justify-content: space-evenly;
        align-items: center;
        cursor: pointer;
    }
    .pause::before{
        content:'';
        width:20%;
        height:100%;
        background-color:#00FFFC;
    }
    .pause::after{
        content:'';
        width:20%;
        height:100%;
        background-color:#00FFFC;
    }
    .status{
        font-size: 1.6rem;
        color: white;
    }
</style>

<div class="Play_Pause">
    <div class="pause"></div>
    <p class="status">PAUSE</p>			
</div>
`

export class PauseGame extends HTMLElement{
    constructor(){
        super();
        this.appendChild(PauseGameTemplate.content.cloneNode(true))
    }
    connectedCallback(){
        this.addEventListener('click', () => {
            document.body.dispatchEvent(new CustomEvent('pause-game'))
        })
    }
}

customElements.define('pause-game', PauseGame)