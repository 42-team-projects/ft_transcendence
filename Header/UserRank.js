const UserRankTemplate = document.createElement('template')
UserRankTemplate.innerHTML = `
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

class UserRank extends HTMLElement{
    constructor(){
        super();
        const width = this.getAttribute('width') || '100px';
        const height = this.getAttribute('height') || '120px';
        const Bcolor = this.getAttribute('Bcolor') || '#00FFFC';
        
        this.style.width = width;
        this.style.height = height;
        this.style.background = Bcolor
        const shadow = this.attachShadow({mode: 'open'})
        shadow.appendChild(UserRankTemplate.content)
        const tmp_content =  this.innerHTML
        if(tmp_content)
            shadow.querySelector('.child').innerHTML = tmp_content;
        // const tmp_content =  this.innerHTML

        // this.innerHTML = ''
        // this.innerHTML = UserRankTemplate.innerHTML
    }
}

customElements.define('user-rank',UserRank)
