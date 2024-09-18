import { updateApiData } from '/Utils/APIManager.js';
import { PROFILE_API_URL } from '/Utils/GlobalVariables.js';
import { fetchWithToken, isTokenValid} from '/root/fetchWithToken.js'
import { HOST } from '/Utils/GlobalVariables.js';

export class Router {

    constructor() {
        this.routes = [
            { path: "/signup", view: "signup-page", isAccessed: false },
            { path: "/confirm-email", view: "email-page", isAccessed: false },
            { path: "/oauth", view: "oauth-callback", isAccessed: false },
            { path: "/login", view: "login-page", isAccessed: false },
            { path: "/forgot-password", view: "forgot-password", isAccessed: false },
            { path: "/confirm-password", view: "confirm-password", isAccessed: false },
            { path: "/two-factor", view: "two-factor", isAccessed: false },
            
            { path: '/Home', view: 'home-page', isAccessed: true },
            { path: '/Game', view: 'game-selection', isAccessed: true },
            { path: '/Chat', view: 'chat-page', isAccessed: true },
            { path: '/Tournament', view: 'tournament-page', isAccessed: true },
            { path: '/Settings', view: 'settings-page', isAccessed: true },
            { path: '/Profile', view: 'profile-component', isAccessed: true },
        ];
        this.randred = false;
        this.rootContent = document.querySelector("root-content");
        this.header = document.querySelector("header-bar");
        this.sideBar = document.querySelector("side-bar");
        this.footerBar = document.querySelector("footer-bar");
        this.handleRoute(window.location.pathname);
    }
    randring(){
        this.removeRandring();
        document.body.classList = 'body-default-shrink'
        this.header.render()
        this.sideBar.render()
        this.footerBar.render()
        this.randred = true;
    }
    removeRandring(){
        document.body.classList.remove('body-default-shrink')
        this.header.remove()
        this.sideBar.remove()
        this.footerBar.remove()
        this.randred = false;
    }
    
    renderNotificatonAndFriendList() {
        const rightSideBar = document.querySelector(".right-sidebar");
        rightSideBar.innerHTML = `
            <friends-request-list class="transform-1s" style="display: none;"></friends-request-list>
            <notifications-list class="transform-1s" style="display: none;"></notifications-list>
        `;
    }

    removeNotificatonAndFriendList() {
        const rightSideBar = document.querySelector(".right-sidebar");
        rightSideBar.innerHTML = ``;
    }

    async changeStyle(access_token, path){
        let matchedRoute = this.routes.find((route) => path.startsWith(route.path));
        // let matchedRoute = this.routes.find((route) => route.path === path);
        if (!matchedRoute)
        {
            matchedRoute = this.routes.find((route) => route.view === "home-page");
            console.log("matchedRoute: ", matchedRoute);
            window.history.pushState({}, "", matchedRoute.path); // for search bar to get updated
        }
    
        if (matchedRoute.isAccessed) {
            
            const isValid = await isTokenValid(access_token);
            if (isValid) {
                this.renderNotificatonAndFriendList();
                await updateApiData(PROFILE_API_URL + "online/", "");

                if(this.randred === false)
                    this.randring();
                this.rootContent.innerHTML = "";
                this.rootContent.appendChild(document.createElement(matchedRoute.view));
                this.sideBar.shadowRoot.querySelectorAll('sb-button').forEach((button, index) =>{
                    let a = button.shadowRoot.querySelector('a');
                    let url = new URL(a.href);
                    if(url.pathname === matchedRoute.path){
                        this.sideBar.clickEvent = index;
                    }
                });
                if (path.includes("/Profile"))
                {
                    if(this.sideBar.activeButton && this.sideBar.activeButton.classList.length)
                    {
                        this.sideBar.activeButton.classList.toggle('on')
                        this.sideBar.activeButton.shadowRoot.querySelector('sb-icon').classList.toggle('on')
                        this.sideBar.activeButton.shadowRoot.querySelector('.c-sb-text').classList.toggle('on')
                        this.sideBar.activeButton.querySelector('h1').classList.toggle('on')
                        this.sideBar.activeButton.querySelector('img').classList.toggle('on')
                    }
                }
            } else {
                // setTimeout(() => {
                    matchedRoute = this.routes.find((route) => route.view === "login-page");
                    window.history.pushState({}, "", matchedRoute.path); // for search bar to get updated
                    this.removeRandring();
                    this.rootContent.innerHTML = "";
                    this.rootContent.appendChild(document.createElement(matchedRoute.view));
                // }, 2000);    
            }
        } else {
            this.removeRandring();
            this.rootContent.innerHTML = "";
            this.rootContent.appendChild(document.createElement(matchedRoute.view));
        }
    }
    
    handleRoute(path) {
        const accessToken = localStorage.getItem('accessToken');
        if (window.location.pathname !== path)
            window.history.pushState({}, "", path);
        this.changeStyle(accessToken, path);
        this.addLinkEventListeners();

        // tmp place should be in function and called somewhere
    }

    addLinkEventListeners() {
        this.rootContent.querySelectorAll('a[href^="/"]').forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                this.handleRoute(link.getAttribute('href'));
            });
        });
    
        // add by oussama to fix the problem of refreshing the page
        this.rootContent.querySelectorAll('*').forEach(element => {
            if (element.shadowRoot) {
                element.shadowRoot.querySelectorAll('a[href^="/"]').forEach(link => {
                    link.addEventListener('click', event => {
                        event.preventDefault();
                        this.handleRoute(link.getAttribute('href'));
                    });
                });
            }
        });
    }
}

export let router;

document.addEventListener('DOMContentLoaded', (event) => {
    router = new Router();
});