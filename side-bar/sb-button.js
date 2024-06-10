
const SB_ButtonTemplate = document.createElement('template')

SB_ButtonTemplate.innerHTML = /*html*/`
    <div class="trasparentItem">
        <c-hexagon width="100%" height="100%" apply="true">
            <style>
                .images
                {
                    position: absolute;
                    width: 50%;
                    height: 50%;
                    z-index: 2;
                    transform: rotate(90deg);
                }
            </style>
            <img draggable="false" src="./images/Home.svg" alt="Home" class="images">
        </c-hexagon>
    </div>
`

class SideBarButton extends HTMLElement{
    constructor(){
        super();
        this.appendChild(SB_ButtonTemplate.content.cloneNode(true))
        // console.log(this.querySelector('c-hexagon'));
    }
}

customElements.define("sb-button", SideBarButton)