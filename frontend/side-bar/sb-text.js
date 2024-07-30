const ButtontextElement = document.createElement('template')

ButtontextElement.innerHTML = /*html*/ `
    <link rel="stylesheet" href="side-bar/sb-text.css" />
    <div class="text-tag">
        <slot name="content"></slot>
    </div>
`

export class SideBarButtonText extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({
            mode: 'open'
        })
        this.shadowRoot.appendChild(ButtontextElement.content.cloneNode(true))
    }
}
