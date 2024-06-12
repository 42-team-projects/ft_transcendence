
import {SideBarButton} from './sb-button.js'
customElements.define("sb-button", SideBarButton)

const SideBarTemplate = document.createElement('template')
const SideBarBirttonTemplate = document.createElement('template')

SideBarBirttonTemplate.innerHTML = /*html*/`
    <style>
        h1
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
        }
        sb-button{
        border: 1px solid red;
        position: relative;
        display: flex;
        height: 80px;
        width: 100%;
        align-items: center;
    }
    </style>
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
        this.appendChild(SideBarTemplate.content.cloneNode(true))
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
        Sidebar_button_contetn.forEach((element) => {
            let clone = SideBarBirttonTemplate.content.cloneNode(true)
            this.setbuttonimages(element.src, clone)
            this.setbuttontext(element.text, clone)
            // console.log(clone);
            this.shadowRoot.appendChild(clone.cloneNode(true))
        })
    }
    connectedCallback(){
        this.setbuttons()
    }
}

customElements.define('side-bar', SideBar)