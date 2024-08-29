import { ChatComponent } from "../Components/Chat/ChatComponent.js";
import { ProfileComponent } from "../Components/Profile/ProfileComponent.js";
import { TournamentComponent } from "../Components/Tournament/TournamentComponent.js";
import { SettingsComponent } from "../Components/Settings/SettingsComponent.js";
import { NotificationsList } from "../Components/Notification/NotificationsList.js";
import { MessageNotification } from "../Components/Notification/templates/MessageNotification.js";
import { NewFriendNotification } from "../Components/Notification/templates/NewFriendNotification.js";
// import { TournamentNotification } from "../Components/Notification/templates/TournamentNotification.js";
// import { router } from "../User/Router.js";
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
// const rootContent = [   
//     { '/home': 'home-page' },
//     { '/game': 'game-selection' },
//     { '/chat': 'chat-page' },
//     { '/freinds': 'freinds-page' },
//     { '/tournament': 'tournament-page' },
//     { '/settings': 'settings-page' }
// ]

root.innerHTML = /*html*/ `
`
class Root extends HTMLElement{

    constructor()
    {
        super();
        this.appendChild(root.content.cloneNode(true))
        this.randred = false;
    }
    changeStyle(access_token){
        console.log(access_token)
        if(access_token && !this.randred){
            document.body.classList.add('body-default-shrink')
            header.render()
            sideBar.render()
            this.randred = true;
        }
        else if(!access_token){
            document.body.classList.remove('body-default-shrink')
            header.remove()
            sideBar.remove()
            this.randred = false;
        }
    }
    // set ChangeRootContent(component){
    //     const content = document.createElement(component)
    //     this.innerHTML = ``
    //     this.appendChild(content);
    // }

    clickEvent() {
        
        // const buttons = sideBar.shadowRoot.querySelectorAll('sb-button')
        // buttons.forEach((button, index) => {
        //     button.addEventListener('click', () => {
        //         if(button.classList.length === 0)
        //         {
        //             sideBar.clickEvent = index;
        //             sideBar.activeButton = button;
        //         }
        //     });
        // })
        const profile = header.querySelector('c-profile')
        const userRunk = header.querySelector('user-rank');
        // profile.addEventListener('click', () => {
        //     if(this.firstChild.nodeName !== 'PROFILE-COMPONENT')
        //         this.ChangeRootContent = 'profile-component'
        //     if(sideBar.activeButton.classList.length)
        //     {
        //         userRunk.classList.toggle('drop-100', false);
        //         userRunk.classList.toggle('transform-1s', true);
        //         userRunk.classList.toggle('down-60', false);
        //         userRunk.classList.toggle('rise-0', true);
        //         sideBar.activeButton.classList.toggle('on')
        //         sideBar.activeButton.shadowRoot.querySelector('sb-icon').classList.toggle('on')
        //         sideBar.activeButton.shadowRoot.querySelector('.c-sb-text').classList.toggle('on')
        //         sideBar.activeButton.querySelector('h1').classList.toggle('on')
        //         sideBar.activeButton.querySelector('img').classList.toggle('on')
        //     }
        // })
        const logout = footer.querySelector('.logout')

        logout.addEventListener('click', () => {

            this.ChangeRootContent = rootContent[0]
            sideBar.clickEvent = 0;
            sideBar.activeButton = buttons[0];
        })
    }
}
customElements.define("root-content", Root)


window.addEventListener("popstate", function() {
    console.log("Hash changed! New URL: " + window.location.href);
});



  