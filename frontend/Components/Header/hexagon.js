
const HexagonTemplate = document.createElement('template')

HexagonTemplate.innerHTML = /*html*/`
    <style>
        :host{
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            clip-path: polygon(13% 30%, 50% 6%, 87% 30%, 87% 70%, 50% 94%, 13% 70%);
            z-index: 1;
        }
        .child{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 95%;
            height: 95%;
            background : linear-gradient(48deg, #09213af2 25%, #093967de 59%,#09213af2 92%);
            clip-path: polygon(13% 30%, 50% 6%, 87% 30%, 87% 70%, 50% 94%, 13% 70%);
        }
        ::slotted(*) {
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
    </style>
    <div class="child">
        <slot name="content"></slot>
    </div>
        `

export class Hexagon extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(HexagonTemplate.content.cloneNode(true))
    }

    static observedAttributes = ["width", "height", "bcolor", "apply"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        this.update();
    }

    update()
    {
        this.style.width = this.width || '140px';
        this.style.height = this.height || '140px';
        this.style.background = this.bcolor || '#00FFFC';
    }

    get width(){
        return this.getAttribute('width')
    }
    set width(value) {this.setAttribute("width", value);}

    get height(){
        return this.getAttribute('height')
    }
    set height(value) {this.setAttribute("height", value);}

    get bcolor(){
        return this.getAttribute('bcolor')
    }
    set bcolor(value) {this.setAttribute("bcolor", value);}

    get apply(){
        return this.getAttribute('apply')
    }
    set apply(value) {this.setAttribute("apply", value);}
    
    connectedCallback(){
        if(this.apply == 'true')
            this.update()
    }
}



