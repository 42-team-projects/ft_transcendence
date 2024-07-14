export class imagesContianer extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({
            mode : 'open'
        })
    };
    static get observedAttributes()
    {
        return ['width', 'height']
    }

    update(newWidth, newheight)
    {
        
    }
    connectedCallback()
    {
        this.shadowRoot.innerHTML = /*html*/ `

        `
    }
}