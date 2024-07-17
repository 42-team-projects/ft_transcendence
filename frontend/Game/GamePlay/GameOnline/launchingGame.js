



export class LaunchingGame extends HTMLElement{
    constructor()
    {
        super();
		this.setTimer(3);
        const launching_game = document.createElement('template')
        this.appendChild(launching_game.content.cloneNode(true))
    }
    setTimer(Time){
        this.Time = Time;
    }
    getTimer(){
        return this.Time;
    }
}
customElements.define('launching-game', LaunchingGame)