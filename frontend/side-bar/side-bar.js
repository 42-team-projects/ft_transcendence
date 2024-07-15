
import {SideBarButton} from './sb-button.js'
customElements.define("sb-button", SideBarButton)

const SideBarTemplate = document.createElement('template')
const SideBarButtonTemplate = document.createElement('template')
const ButtonStyle = document.createElement('style')


SideBarButtonTemplate.innerHTML = /*html*/`
    <sb-button>
    </sb-button>
`
SideBarTemplate.innerHTML = /*html*/`
    <link rel="stylesheet" href="side-bar/side-bar.css"/>
    <nav class="buttons">
    </nav>
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
        const nav = this.shadowRoot.querySelector('.buttons')
        Sidebar_button_contetn.forEach((element, index) => {
            let clone = SideBarButtonTemplate.content.cloneNode(true);
            clone.lastElementChild.setAttribute('id', `${index}`);
            this.setbuttonimages(element.src, clone);
            this.setbuttontext(element.text, clone);
            nav.appendChild(clone);
        });
    }
    connectedCallback(){
        this.setbuttons()
        this.clickEvent = 0;
    }
    set activeButton(button){
        this.active_button = button;
    }
    get activeButton(){
        return this.active_button;
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
                this.active_button = button;
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
