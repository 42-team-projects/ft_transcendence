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
    pause-buttons svg{
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
            <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg slot="icon" width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#00fffb90" class="bi bi-play">
            <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
            </svg>
            <p slot="text">RESUME</p>
        </pause-buttons>
        <pause-buttons>
            <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg slot="icon" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12H18M18 12L15.5 9.77778M18 12L15.5 14.2222M18 7.11111V5C18 4.44772 17.5523 4 17 4H7C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V16.8889" stroke="#00fffb90" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
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
    }
    connectedCallback(){
        this.addBlur()
    }
    addBlur(){
        if (document.body.querySelector('game-header') == null) return
        if (document.body.querySelector('game-table') == null) return
        document.body.querySelector('game-header').classList.add('blur')
        document.body.querySelector('game-table').classList.add('blur')
    }
    removeBlur(){
        if (document.body.querySelector('game-header') == null) return
        if (document.body.querySelector('game-table') == null) return
        document.body.querySelector('game-header').classList.remove('blur')
        document.body.querySelector('game-table').classList.remove('blur')
    }
    disconnectedCallback(){
        this.removeBlur()
    }
}
customElements.define('pause-page', PausePage)
