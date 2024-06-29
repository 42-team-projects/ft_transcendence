import {GameSelection} from '../Game/GameSelection.js'

customElements.define("game-selection", GameSelection)
const root = document.createElement('template')


root.innerHTML = /*html*/ `
    <game-selection></game-selection>
`
class Root extends HTMLElement{

    constructor()
    {
        super();
        this.appendChild(root.content.cloneNode(true))

    }
}
customElements.define("root-content", Root)
