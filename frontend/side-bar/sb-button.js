const SB_ButtonTemplate = document.createElement('template')

SB_ButtonTemplate.innerHTML = /*html*/`
    <link rel="stylesheet" href="side-bar/sb-button.css" />
    <a>
        <div class="c-sb-text">
            <sb-text> 
                <slot name="text" slot="content"></slot>
            </sb-text>
        </div>
        <sb-icon>
            <slot name="image" slot="content"></slot>
        </sb-icon>
    </a>
`
const media_query = window.matchMedia('(max-width: 1900px)') 
export class SideBarButton extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({
            mode: 'open'
        })
        this.shadowRoot.appendChild(SB_ButtonTemplate.content.cloneNode(true))
        const a = this.shadowRoot.querySelector('a')
        console.log(a)
        a.href = this.href
        a.addEventListener('click', (event) => {
            event.preventDefault()
            window.history.pushState({}, '', this.href)
        })
        const sbText = this.shadowRoot.querySelector('sb-text')
        const sbIcon = this.shadowRoot.querySelector('sb-icon')
        sbText.classList.toggle('transform-1s')
        media_query.addEventListener('change', (event) => {
            this.handelMediaQueryChanes(media_query, sbText)
        })
        this.handelMediaQueryChanes(media_query, sbText)
    }
    handelMediaQueryChanes(event, sbText){
        if (event.matches) {
            sbText.classList.add('left');
        } else {
            sbText.classList.remove('left');
        }
    }

    get href(){
        return this.getAttribute('href')
    }
}

