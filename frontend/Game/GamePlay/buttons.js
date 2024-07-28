const buttonsTemplate = document.createElement('template')
buttonsTemplate.innerHTML = /*html*/`

    <style>
        :host{
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 22%;
            clip-path: polygon(14% 1%, 100% 0%, 100% 72%, 90% 100%, 1% 100%, 1% 36%);
            background-color: #47AF56;
            transition: transform 0.3s ease;
            cursor: pointer;
        }
        :host(:hover){
            transform: scale(1.05);
            background-color: var(--hover-background-color , #3a9c49) !important; 
        }
        .buttons-content{
            position: absolute;
            width: 97%;
            height: 92%;
            clip-path: polygon(14% 1%, 100% 0%, 100% 72%, 90% 100%, 1% 100%, 1% 36%);
            background-color: #050a2c63;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
    <div class="buttons-content">
        <slot name="text"></slot>
    </div>
`

export class Buttons extends HTMLElement{

    constructor (){
        super();
        const shadow = this.attachShadow({
            mode : 'open'
        })
        shadow.appendChild(buttonsTemplate.content.cloneNode(true))
    }

    get width(){
        return this.getAttribute('width')
    }
    get height(){
        return this.getAttribute('height')
    }
    get bcolor(){
        return this.getAttribute('bcolor')
    }
    get Hcolor(){
        return this.getAttribute('Hcolor')
    }
    update(){
        this.style.width = this.width || '55%';
        this.style.height = this.height || '22%';
        this.style.background = this.bcolor || '#47AF56';
        this.style.setProperty('--hover-background-color', this.Hcolor);
        this.style.setProperty('--width', this.style.width);
    }
    connectedCallback(){
        this.update()
    }
}