

export class Router {
    constructor() {
        this.routes = [
            { path: "/signup", view: "signup-page" },
            { path: "/confirm-email", view: "email-page" },
            { path: "/oauth", view: "oauth-callback" },
            { path: "*", view: "login-page" },
            
            { path: '/Home', view: 'home-page' },
            { path: '/Game', view: 'game-selection' },
            { path: '/Chat', view: 'chat-page' },
            { path: '/Friends', view: 'freinds-page' },
            { path: '/Tournament', view: 'tournament-page' },
            { path: '/Settings', view: 'settings-page' },
        ];
        this.rootContent = document.querySelector("root-content");
        this.sideBar = document.querySelector("side-bar")
        this.handleRoute(window.location.pathname);
    }

    handleRoute(path) {
        console.log(path);
        // get access token from local storage
        const accessToken = localStorage.getItem('accessToken');
        if (window.location.pathname !== path)
            window.history.pushState({}, "", path);

        let matchedRoute = this.routes.find((route) => route.path === path);
        if (!matchedRoute && !accessToken)
            matchedRoute = this.routes.find((route) => route.path === "*");
        if (!matchedRoute && accessToken)
            matchedRoute = this.routes.find((route) => route.path === "/home");
        
        if(accessToken)
        {
            this.sideBar.shadowRoot.querySelectorAll('sb-button').forEach((button, index) =>{
                if(button.shadowRoot.href === matchedRoute)
                    sideBar.clickEvent = index;
            });
        }
        this.rootContent.innerHTML = "";
        this.rootContent.changeStyle();
        this.rootContent.appendChild(document.createElement(matchedRoute.view));
        this.rootContent.clickEvent();
        this.addLinkEventListeners();
    }

    addLinkEventListeners() {
        this.rootContent.querySelectorAll('a[href^="/"]').forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                this.handleRoute(link.getAttribute('href'));
            });
        });
    }
}

export let router;

document.addEventListener('DOMContentLoaded', (event) => {
    router = new Router();
});