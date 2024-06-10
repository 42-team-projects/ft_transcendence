
const SideBarTemplate = document.createElement('template')

SideBarTemplate.innerHTML = /*html*/`
        <sb-button> </sb-button>
        <button-text> </button-text>

`

class SideBar extends HTMLElement {
    constructor (){
        super();
        this.appendChild(SideBarTemplate.content)
    }
}

customElements.define('side-bar', SideBar)