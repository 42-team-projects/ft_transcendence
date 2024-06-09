
const SideBarTemplate = document.createElement('template')

SideBarTemplate.innerHTML = `



`

class SideBar extends HTMLElement {
    constructor (){
        super();
    }
}

customElements.define('side-bar', SideBar)