
import {ButtonText} from './button-text.js'
customElements.define('button-text',ButtonText)

const SB_ButtonTemplate = document.createElement('template')

SB_ButtonTemplate.innerHTML = /*html*/`
    <style>
        .trasparentItem{
            position: relative;
            display: flex;
            background: transparent;
            /* background: red; */
            width: 25%; 
            aspect-ratio: 1;
            transform: rotate(270deg);
            justify-content: center;
        }

        .trasparentItem::before{
            content: "";
            width: 100%;
            height: 100%;
            background: rgb(255, 255, 255);
            clip-path: polygon(24.5% 1%, 31% 1.7%, 5.6% 18.6%, 5.1% 38%, 1.5% 33%, 2% 16%);
            position: absolute;
            top: 12.8%;
            left: 10.8%;
            z-index: 2;
            position: absolute;
        }

        .trasparentItem::after{
            content: "";
            width: 100%;
            height: 100%;
            background: rgb(255, 255, 255);
            clip-path: polygon(24.5% 2%, 31% 2.7%, 5.6% 18.6%, 5.3% 38%, 1.5% 33%, 2% 16%);
            position: absolute;
            bottom: 12.1%;
            right: 10.5%;
            z-index: 2;
            transform: rotate(179deg);
            position: absolute;
        }
        button-text{
            position: absolute;
            width: 83%;
            aspect-ratio: 8 / 2;
            left: 18%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #00fffb;
            clip-path: polygon(8% 15%, 85% 15%, 98% 50%, 85% 94%, 0.3% 94%,7.5% 50%, 4.5% 33.5%,4.4% 31.5%);
            border: 1px solid red;
        }

    </style>
    <div class="trasparentItem">
        <c-hexagon width="100%" height="100%" apply="true">
            <slot name="image" slot="content"></slot>
        </c-hexagon>
    </div>
    <button-text> 
        <slot name="text" slot="content"></slot>
    </button-text>

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

