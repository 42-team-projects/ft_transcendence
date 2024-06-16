
import {SideBarButton} from './sb-button.js'
customElements.define("sb-button", SideBarButton)

const SideBarTemplate = document.createElement('template')
const SideBarButtonTemplate = document.createElement('template')
const ButtonStyle = document.createElement('style')

ButtonStyle.innerHTML = /*css*/ `        
    h1
    {
        color: #ffffff8a;
        font-size: clamp(1rem, 1.5vw, 3rem);
    }
    h1.on
    {
        text-shadow: 0px 0px 20px #00fffb;
        color: #ffffff;
        font-size: clamp(1rem, 1.5vw, 3rem);
    }
    .images
    {
        position: absolute;
        width: 50%;
        height: 50%;
        z-index: 2;
        transform: rotate(90deg);
        opacity : 0.5
    }
    .images.on
    {
        position: absolute;
        width: 50%;
        height: 50%;
        z-index: 2;
        transform: rotate(90deg);
        filter: drop-shadow(0px 0px 4px #00FFFC);
        opacity : 1
    }
    sb-button
    {
        position: relative;
        display: flex;
        height: 80px;
        width: 95%;
        align-items: center;
        cursor: pointer;
    }
    sb-button.on
    {
        position: relative;
        display: flex;
        height: 80px;
        width: 100%;
        align-items: center;
        cursor: pointer;
    }
`
SideBarButtonTemplate.innerHTML = /*html*/`
    <sb-button>
    </sb-button>
`
SideBarTemplate.innerHTML = /*html*/`
`
const Sidebar_button_contetn = [
    {
        src : './images/Home.svg',
        text : "Home",
    },
    {
        src : './images/Game.svg',
        text : "Game",
    },
    {
        src : './images/Chat.svg',
        text : "Chat",
    },
    {
        src : './images/friends.svg',
        text : "Friends",
    },
    {
        src : './images/settings.svg',
        text : "Tournament",
    },
    {
        src : './images/settings.svg',
        text : "Settings",
    }
]

class SideBar extends HTMLElement {
    static shadow;
    constructor (){
        super();
        this.attachShadow({
            mode: 'open'
        })
        this.shadowRoot.appendChild(SideBarTemplate.content.cloneNode(true))
    }

    setbuttonimages(image, templat)
    {
        let img = document.createElement('img');
        img.src = image
        img.draggable = false
        img.slot = 'image'
        img.classList = 'images'
        templat.lastElementChild.appendChild(img)
    }
    setbuttontext(content, templat)
    {
        let text = document.createElement('h1');
        text.innerHTML = content
        text.slot = 'text'
        templat.lastElementChild.appendChild(text)
    }

    setbuttons(){
        Sidebar_button_contetn.forEach((element, index) => {
            let clone = SideBarButtonTemplate.content.cloneNode(true);
            clone.lastElementChild.setAttribute('id', `${index}`);
            this.setbuttonimages(element.src, clone);
            this.setbuttontext(element.text, clone);
            clone.lastElementChild.addEventListener('click', () => {
                this.clickEvent = index;
            });
            this.shadowRoot.appendChild(clone);
        });
        this.shadowRoot.insertBefore(ButtonStyle, this.shadowRoot.firstChild);
        
    }
    connectedCallback(){
        this.setbuttons()
        this.clickEvent = 0;
    }
    set clickEvent(id){
        const buttons = this.shadowRoot.querySelectorAll('sb-button')
        buttons.forEach((button) => {
            if(Number(id) === Number(button.id))
            {
                if(button.classList.length === 0)
                {
                    button.classList.toggle('on')
                    let imgClassName = button.querySelector('.images.on')
                    if(!imgClassName)
                    {
                        imgClassName = button.querySelector('.images');
                        if(imgClassName)
                            imgClassName.classList.toggle('on')
                    }
                    let textClassName = button.querySelector('h1.on')
                    if(!textClassName)
                    {
                        textClassName = button.querySelector('h1');
                        if(textClassName)
                            textClassName.classList.toggle('on')
                    }
                }
            }
            else{
                if(button.classList.length)
                    button.classList.toggle('on')
                let imgClassName = button.querySelector('.images.on')
                if(imgClassName)
                    imgClassName.classList.toggle('on')
                let textClassName = button.querySelector('h1.on')
                if(textClassName)
                        textClassName.classList.toggle('on')
            }
        })
    }
}

customElements.define('side-bar', SideBar)
