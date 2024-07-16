
import {SideBarButtonIcons} from './sb-icon.js'
import {SideBarButtonText} from './sb-text.js'
customElements.define('sb-text',SideBarButtonText)
customElements.define('sb-icon',SideBarButtonIcons)

const SB_ButtonTemplate = document.createElement('template')

SB_ButtonTemplate.innerHTML = /*html*/`
    <link rel="stylesheet" href="side-bar/sb-button.css" />
    <sb-icon>
        <slot name="image" slot="content"></slot>
    </sb-icon>
    <sb-text> 
        <slot name="text" slot="content"></slot>
    </sb-text>
`

export class SideBarButton extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({
            mode: 'open'
        })
        shadow.appendChild(SB_ButtonTemplate.content.cloneNode(true))
    }
}

