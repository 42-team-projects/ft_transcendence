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
// background-color: #021f38; 
// background-color: #205997;
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
            console.log(textObject.textContent)
            if (textObject.textContent == 'RESTART')
                document.body.dispatchEvent(new CustomEvent('restart-game'))
            else if (textObject.textContent == 'RESUME')
                document.body.dispatchEvent(new CustomEvent('resume-game'))
            else
                document.body.dispatchEvent(new CustomEvent('exit-game'))
        })
        this.addEventListener('mouseover', () => {
            this.style.backgroundColor = '#00fffb90'
            this.shadowRoot.querySelector('.child').style.backgroundColor = 'rgb(2 31 56 / 68%)'
            const icon = this.shadowRoot.querySelector('slot[name="icon"]');
            const text = this.shadowRoot.querySelector('slot[name="text"]');
            const iconObject = icon.assignedElements()[0];
            const textObject = text.assignedElements()[0];
            const iconObjectContent = iconObject.contentDocument;
            const svg = iconObjectContent.querySelector('svg');
            if(svg.getAttribute('fill') == 'none'){
                iconObjectContent.querySelector('path').setAttribute('stroke', 'white');
            }
            else{
                svg.setAttribute('fill', 'white');
            }
            textObject.style.color = 'white';
        })
        this.addEventListener('mouseout', () => {
            this.style.backgroundColor = '#00fffb30'
            this.shadowRoot.querySelector('.child').style.backgroundColor = '#021f38'
            const icon = this.shadowRoot.querySelector('slot[name="icon"]');
            const text = this.shadowRoot.querySelector('slot[name="text"]');
            const iconObject = icon.assignedElements()[0];
            const textObject = text.assignedElements()[0];
            const iconObjectContent = iconObject.contentDocument;
            const svg = iconObjectContent.querySelector('svg');
            console.log(svg.getAttribute('fill'));
            if(svg.getAttribute('fill') == 'none'){
                iconObjectContent.querySelector('path').setAttribute('stroke', '#00fffb90');
            }
            else{
                svg.setAttribute('fill', '#00fffb90');
            }
            textObject.style.color = '#00fffb90';
        })
    }
}
customElements.define('pause-buttons', PauseButtons)