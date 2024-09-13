import { PauseButtons } from "./pause-buttons.js";

const template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
    :host {
        position: absolute;
        display: flex;
        flex-direction: column  ;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        background-color: #00142b99; 
    }
    .pause-page{
        width: 50%;
        aspect-ratio: 1.5;
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
    }
    .pause-svg{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 30%;
        background-image: url(../../images/pause_bar.svg);
        filter: drop-shadow(0 0 10px #00b9be);
        background-size: contain;
        background-repeat: no-repeat;
    }
    p{
        margin: 0;
        font-size: 4rem;
        color: white;
        text-shadow: 0 0 5px #00b9be;
    }
    .pause-buttons{
        display: flex;
        justify-content: space-around;
        width: 100%;
    }
    pause-buttons p{
        font-size: 1.5rem;
        color: #00fffb90;
        text-shadow: 0 0 1px #00b9be;
    }
    pause-buttons object{
        width: 50px;
        height: 50px;
        filter: drop-shadow(0 0 1px #00b9be);
    }
</style>

<div class="pause-page">
    <p>PAUSE</p>
    <div class="pause-svg">
    </div>
    <div class="pause-buttons">
        <pause-buttons>
            <object slot="icon" type="image/svg+xml" data="../../images/restart.svg"></object>
            <p slot="text">RESTART</p>
        </pause-buttons>
        <pause-buttons>
            <object slot="icon" type="image/svg+xml" data="../../images/play.svg"></object>   
            <p slot="text">RESUME</p>
        </pause-buttons>
        <pause-buttons>
            <object slot="icon" type="image/svg+xml" data="../../images/exit.svg"></object>
            <p slot="text">EXIT</p>
        </pause-buttons>
    </div>
</div>
`

export class PausePage extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.addBlur()
    }
    addBlur(){
        document.body.querySelector('game-header').classList.add('blur')
        document.body.querySelector('game-table').classList.add('blur')
    }
    removeBlur(){
        document.body.querySelector('game-header').classList.remove('blur')
        document.body.querySelector('game-table').classList.remove('blur')
    }
    disconnectedCallback(){
        this.removeBlur()
    }
}
customElements.define('pause-page', PausePage)