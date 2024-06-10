
const SB_ButtonTemplate = document.createElement('template')

SB_ButtonTemplate.innerHTML = /*html*/`
    <div class="trasparentItem">
        <c-hexagon width="100%" height="100%" apply="true">
            <img slot="content" draggable="false" src="./images/Home.svg" alt="Home" class="images">
        </c-hexagon>
    </div>
    <button-text> 
        <div slot="content" class="text-tag">
            <h1></h1>
        </div>
    </button-text>

`

class SideBarButton extends HTMLElement{
    constructor(){
        super();
        this.appendChild(SB_ButtonTemplate.content.cloneNode(true))
        // console.log(this.querySelector('c-hexagon'));
    }
}

customElements.define("sb-button", SideBarButton)
