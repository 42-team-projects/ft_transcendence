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
        profile.addEventListener('click', () => {

            if(this.firstChild.nodeName !== 'PROFILE-COMPONENT')
            {
                this.ChangeRootContent = 'profile-component'
            }
            if(sideBar.activeButton.classList.length)
            {
                sideBar.activeButton.classList.toggle('on')
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
        this.clickEvent()
    }
}
customElements.define("root-content", Root)