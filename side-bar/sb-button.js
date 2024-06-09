

const SB_ButtonTemplate = document.createElement('template')

SB_ButtonTemplate.innerHTML = /*html*/`
    <div class="trasparentItem">
        <c-hexagon width="100%" height="100%" apply="true"></c-hexagon>
    </div>
`

class SideBarButton extends HTMLElement{
    constructor(){
        super();
        this.appendChild(SB_ButtonTemplate.content)
        // console.log(this.querySelector('c-hexagon'));


    }
}

customElements.define("sb-button", SideBarButton)