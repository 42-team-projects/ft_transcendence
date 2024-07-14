const UserRankTemplate = document.createElement('template')
UserRankTemplate.innerHTML = /*html*/`
    <style>
        .child{
            display: flex;
            justify-content : center;
            align-items: center;
            width: 95%;
            height: 95%;
            background : linear-gradient(180deg, #000000e0, transparent);
            clip-path: polygon(10% 0%, 50% 0% ,90% 0%, 90% 60%, 50% 90%,10% 60%);
        }
        h2 {
            color : white;
        }
    </style>
    <div class="child">
    </div>
`

export class UserRank extends HTMLElement{
    constructor(){
        super();
        const width = this.getAttribute('width') || '80px';
        const height = this.getAttribute('height') || '110px';
        const Bcolor = this.getAttribute('Bcolor') || '#00FFFC';
        
        this.style.width = width;
        this.style.height = height;
        this.style.background = Bcolor
        const shadow = this.attachShadow({mode: 'open'})
        shadow.appendChild(UserRankTemplate.content)
        const tmp_content =  this.innerHTML
        if(tmp_content)
            shadow.querySelector('.child').innerHTML = tmp_content;
        this.classList.toggle('drop-100', true);
        this.classList.toggle('down-60', true);
    }
}

