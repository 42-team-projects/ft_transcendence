const ButtontextElement = document.createElement('template')

ButtontextElement.innerHTML = /*html*/ `
    <style>
        .text-tag{
            position: absolute;
            width: 98.7%;
            height: 96.5%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(48deg, #09213af2 25%, #093967de 59%,#09213af2 92%);
            clip-path: polygon(8% 15%, 85% 15%, 98% 50%, 85% 94%, 0.3% 94%,7.5% 50%, 4.5% 33.5%,4.4% 31.5%);
        }
    </style>
    <div class="text-tag">
        <slot name="content"></slot>
    </div>
`

export class SideBarButtonText extends HTMLElement {
    constructor(){
        super();
        const shadow = this.attachShadow({
            mode: 'open'
        })
        shadow.appendChild(ButtontextElement.content.cloneNode(true))
    }
}
