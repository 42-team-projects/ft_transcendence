
const HexagonTemplate = document.createElement('template')

HexagonTemplate.innerHTML = `
    <style>
        .child{
            width: 95%;
            height: 95%;
            background : linear-gradient(48deg, #09213af2 25%, #093967de 59%,#09213af2 92%);
            clip-path: polygon(13% 30%, 50% 6%, 87% 30%, 87% 70%, 50% 94%, 13% 70%);
        }
        img{
            max-width:100%;
        }
    </style>
    <div class="child"></div>
`

class Hexagon extends HTMLElement{
    constructor(){
        super();
        const width = this.getAttribute('width') || '140px';
        const height = this.getAttribute('height') || '140px';
        const Bcolor = this.getAttribute('Bcolor') || '#00FFFC';
        
        this.style.width = width;
        this.style.height = height;
        this.style.background = Bcolor
        const tmp_content =  this.innerHTML
        this.innerHTML = ''
        const shadow = this.attachShadow({mode: 'open'})
        shadow.appendChild(HexagonTemplate.content)

        if(tmp_content)
            shadow.querySelector('.child').innerHTML = tmp_content;
    }
}

customElements.define('c-hexagon',Hexagon)


