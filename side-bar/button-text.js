const ButtontextElement = document.createElement('template')

ButtontextElement.innerHTML = /*html*/ `


`

class ButtonText extends HTMLElement {
    constructor(){
        super();
    }
}

customElements.define('button-text',ButtonText)