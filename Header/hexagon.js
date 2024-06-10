
const HexagonTemplate = document.createElement('template')

HexagonTemplate.innerHTML = /*html*/`
    <style>
        .child{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 95%;
            height: 95%;
            background : linear-gradient(48deg, #09213af2 25%, #093967de 59%,#09213af2 92%);
            clip-path: polygon(13% 30%, 50% 6%, 87% 30%, 87% 70%, 50% 94%, 13% 70%);
        }
    </style>
    <div class="child">
        <slot name="content"></slot>
    </div>
`

export class Hexagon extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({
            mode: 'open'
        })
        shadow.appendChild(HexagonTemplate.content.cloneNode(true))
    }

    update()
    {
        this.style.width = this.width || '140px';
        this.style.height = this.height || '140px';
        this.style.background = this.Bcolor || '#00FFFC';
    }
    attributeChangedCallback(attribut, oldV, newV)
    {
        console.log('hi');
        if(attribut === 'width' || attribut === 'height' || attribut === 'Bcolor')
            this.update()
    }
    static get observedAttributes()
    {
        return ['width', 'height', 'Bcolor', 'apply']
    }
    get width(){
        return this.getAttribute('width')
    }
    get height(){
        return this.getAttribute('height')
    }
    get Bcolor(){
        return this.getAttribute('Bcolor')
    }
    get apply(){
        return this.getAttribute('apply')
    }
    connectedCallback(){
        if(this.apply == 'true')
            this.update()
    }
}



