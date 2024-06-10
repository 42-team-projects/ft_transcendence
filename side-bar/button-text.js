const ButtontextElement = document.createElement('template')

ButtontextElement.innerHTML = /*html*/ `

    <slot name="content"> </slot>

`

class ButtonText extends HTMLElement {
    constructor(){
        super();
    }
}

customElements.define('button-text',ButtonText)