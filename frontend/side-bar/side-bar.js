

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
        src : './images/Friends.svg',
        text : "Friends",
    },
    {
        src : './images/Settings.svg',
        text : "Tournament",
    },
    {
        src : './images/Settings.svg',
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
        this.activeButton = this.shadowRoot.querySelectorAll('sb-button')[0]
        this.clickEvent = 0;
    }
    set activeButton(button){
        this.active_button = button;
    }
    get activeButton(){
        return this.active_button;
    }
    set clickEvent(id){
        const button = this.shadowRoot.querySelectorAll('sb-button')[id]
        if (!button.classList.contains('on')) {
            this.active_button.classList.remove('on')
            this.active_button.querySelector('img').classList.remove('on')
            this.active_button.shadowRoot.querySelector('sb-icon').classList.remove('on')
            this.active_button.shadowRoot.querySelector('.c-sb-text').classList.remove('on')
            this.active_button.querySelector('h1').classList.remove('on')
            this.active_button.classList.remove('on')

            button.classList.add('on')
            button.querySelector('img').classList.add('on')
            button.querySelector('h1').classList.add('on')
            button.shadowRoot.querySelector('sb-icon').classList.add('on')
            button.shadowRoot.querySelector('.c-sb-text').classList.add('on')
            this.active_button = button;
        }
    }
}

customElements.define('side-bar', SideBar)
