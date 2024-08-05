const sidebar_icon_element = document.createElement('template')

sidebar_icon_element.innerHTML = /*html*/ `
    <c-hexagon width="100%" height="100%" apply="true">
        <slot name="content" slot="content"></slot>
    </c-hexagon>
`

export class SideBarButtonIcons extends HTMLElement {
    constructor(){
        super();
        const shadow = this.attachShadow({
            mode: 'open'
        })
        shadow.appendChild(sidebar_icon_element.content.cloneNode(true))
    }
}
