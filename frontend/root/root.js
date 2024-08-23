
import { ChatComponent } from "../Chat/ChatComponent.js";
import { ProfileComponent } from "../Profile/ProfileComponent.js";
import { TournamentComponent } from "../Tournament/TournamentComponent.js";
import { SettingsComponent } from "../Settings/SettingsComponent.js";


const root = document.createElement('template')

const sideBar = document.querySelector('side-bar')
const header = document.querySelector('header-bar')
const footer = document.querySelector('footer')


const rootContent = ['home-page',
     'game-selection',
     'chat-page',
     'freinds-page',
     'tournament-page',
     'settings-page'
]

root.innerHTML = /*html*/ `
`
class Root extends HTMLElement{

    constructor()
    {
        super();
        this.appendChild(root.content.cloneNode(true))
    }

    set ChangeRootContent(component){
        console.log('hiiiiiiiii')
        const content = document.createElement(component)
        this.innerHTML = ``
        this.appendChild(content);
    }
    clickEvent() {
        const buttons = sideBar.shadowRoot.querySelectorAll('sb-button')
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                if(button.classList.length === 0)
                {
                    this.ChangeRootContent = rootContent[index]
                    sideBar.clickEvent = index;
                    sideBar.activeButton = button;
                }
            });
        })
        const profile = header.querySelector('c-profile')
        const userRunk = header.querySelector('user-rank');
        profile.addEventListener('click', () => {
            if(this.firstChild.nodeName !== 'PROFILE-COMPONENT')
                this.ChangeRootContent = 'profile-component'
            if(sideBar.activeButton.classList.length)
            {
                userRunk.classList.toggle('drop-100', false);
                userRunk.classList.toggle('transform-1s', true);
                userRunk.classList.toggle('down-60', false);
                userRunk.classList.toggle('rise-0', true);
                sideBar.activeButton.classList.toggle('on')
                sideBar.activeButton.shadowRoot.querySelector('sb-icon').classList.toggle('on')
                sideBar.activeButton.shadowRoot.querySelector('.c-sb-text').classList.toggle('on')
                sideBar.activeButton.querySelector('h1').classList.toggle('on')
                sideBar.activeButton.querySelector('img').classList.toggle('on')
            }
        })
        const logout = footer.querySelector('.logout')

        logout.addEventListener('click', () => {

            this.ChangeRootContent = rootContent[0]
            sideBar.clickEvent = 0;
            sideBar.activeButton = buttons[0];
        })
    }
    connectedCallback()
    {
        this.ChangeRootContent = "home-page";
        this.clickEvent()
    }
}
customElements.define("root-content", Root)