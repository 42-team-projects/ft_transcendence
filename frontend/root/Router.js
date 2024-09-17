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
            { path: '/Ranking', view: 'ranking-page', isAccessed: true },
            { path: '/Tournament', view: 'tournament-page', isAccessed: true },
            { path: '/Settings', view: 'settings-page', isAccessed: true },
            { path: '/Profile', view: 'profile-component', isAccessed: true },
            // { path: '/usr/share/nginx/html/artifacts/contracts/TournamentScores.sol/TournamentScores.json', view: 'profile-component', isAccessed: true },
        ];
        this.randred = false;
        this.rootContent = document.querySelector("root-content");
        this.header = document.querySelector("header-bar");
        this.sideBar = document.querySelector("side-bar");
        this.handleRoute(window.location.pathname);
    }
    randring(){
        this.removeRandring();
        document.body.classList = 'body-default-shrink'
        // setTimeout(() => {
            this.header.render()
            this.sideBar.render()
            this.randred = true;
        // }, 1000);

    }
    profileRandring(){
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
    }
    removeRandring(){
        console.log("removing...")
        document.body.classList.remove('body-default-shrink')
        this.header.remove()
        this.sideBar.remove()
        this.randred = false;
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
        let logout = document.querySelector('.logout')
        logout.addEventListener('click', () => {
            fetchWithToken(`${HOST}/api/v1/auth/logout/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                credentials: 'include'
            })
            .then(response => {
                if (response.ok) {
                    localStorage.removeItem('accessToken');
                    this.handleRoute('/login')
                } else {
                    response.json().then(errorData => {
                        console.error('Logout failed:', errorData);
                    });
                }
            })
            .catch(error => {
                console.error('catch ->', error);
            });
        });
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