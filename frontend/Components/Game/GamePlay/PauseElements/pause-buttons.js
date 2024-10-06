const template = document.createElement('template');

template.innerHTML = /*html*/`
<style>
    :host{
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        clip-path: polygon(8% 9%, 92% 9%, 100% 21%, 100% 80%, 92% 91%, 9% 90%, 0 78%, 0 21%);
        background-color: #00fffb30;
        cursor : pointer;
    }
    .child{
        width: 98%;
        height: 98%;
        display: flex;
        justify-content: center;
        align-items: center;
        clip-path: polygon(8% 9%, 92% 9%, 100% 21%, 100% 80%, 92% 91%, 9% 90%, 0 78%, 0 21%);
        background-color: #021f38;
        flex-direction: column;
    }
</style>
<div class="child">
    <slot name="icon"></slot>
    <slot name="text"></slot>
</div> 

`
export class PauseButtons extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
    connectedCallback(){
        
        this.addEventListener('click', () => {
            const text = this.shadowRoot.querySelector('slot[name="text"]');
            const textObject = text.assignedElements()[0];
            const game_table = document.body.querySelector('game-table');
            if (textObject.textContent == 'RESTART')
                game_table.dispatchEvent(new CustomEvent('restart-game'))
            else if (textObject.textContent == 'RESUME')
                game_table.dispatchEvent(new CustomEvent('resume-game'))
            else
                game_table.dispatchEvent(new CustomEvent('exit-game'))
        })
        const icon = this.shadowRoot.querySelector('slot[name="icon"]');
        const text = this.shadowRoot.querySelector('slot[name="text"]');
        const svg = icon.assignedElements()[0];
        const textObject = text.assignedElements()[0];
        let color = '#00fffb90';
        if(textObject.textContent == 'EXIT'){
            svg.querySelector('path').setAttribute('stroke', 'red');
            textObject.style.color = 'red';
            color = 'red';
        }
        this.addEventListener('mouseover', () => {
            this.style.backgroundColor = '#00fffb90'
            this.shadowRoot.querySelector('.child').style.backgroundColor = 'rgb(2 31 56 / 68%)'
            if(svg.getAttribute('fill') == 'none'){
                svg.querySelector('path').setAttribute('stroke', 'white');
            }
            else{
                svg.setAttribute('fill', 'white');
            }
            textObject.style.color = 'white';
        })
        this.addEventListener('mouseout', () => {
            this.style.backgroundColor = '#00fffb30'
            this.shadowRoot.querySelector('.child').style.backgroundColor = '#021f38'
            if(svg.getAttribute('fill') == 'none'){
                svg.querySelector('path').setAttribute('stroke', color);
            }
            else{
                svg.setAttribute('fill', color);
            }
            textObject.style.color = color;
        })
    }
}
customElements.define('pause-buttons', PauseButtons)