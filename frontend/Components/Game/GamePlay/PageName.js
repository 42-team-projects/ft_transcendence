const page_name = document.createElement('template')

page_name.innerHTML =  /* html */ `

    <style>
        :host{
            position: absolute;
            clip-path: polygon(0% 0%, var(--width) 0%, calc(var(--width) - 4%) 80%, 2% 80%, 2% 100%, 0% 80%);
            width: 100%;
            height: 80px;
            gr: #00fffc45;
            background: linear-gradient(62deg, #00fffc66 0%, #00fffc00 45%);
            top: -0.2%;
            left: -2%;
            font-size: clamp(0.5rem , 0.9vw, 1rem);
            color: white;
            
        }
        :host slot {
            width: var(--width);
            height: 90%;
            position: relative;
            display: flex;
            align-items: center;
            left:3%;
        }
    </style>
    <slot name="text"></slot>
`
export class PageName extends HTMLElement{

    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Clone the template content and append it to the shadow DOM
        this.shadowRoot.appendChild(page_name.content.cloneNode(true));
    }
    get width(){
        return this.getAttribute('width')
    }
    update(){
        this.style.setProperty('--width', this.width);
    }

    connectedCallback()
    {
        this.update()
    }
}
