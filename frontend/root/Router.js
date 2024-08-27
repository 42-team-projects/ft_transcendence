
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
        const accessToken = localStorage.getItem('accessToken');
        if (window.location.pathname !== path)
            window.history.pushState({}, "", path);

        let matchedRoute = this.routes.find((route) => route.path === path);
        if (!matchedRoute && !accessToken)
            matchedRoute = this.routes.find((route) => route.path === "*");
        if (!matchedRoute && accessToken)
            matchedRoute = this.routes.find((route) => route.path === "/Home");
        if(accessToken)
        {
            console.log(this.sideBar.shadowRoot);
            setTimeout(() => {
                this.sideBar.shadowRoot.querySelectorAll('sb-button').forEach((button, index) =>{
                    let a = button.shadowRoot.querySelector('a');
                    let url = new URL(a.href);
                    if(url.pathname === matchedRoute.path){
                        this.sideBar.clickEvent = index;
                    }
                });
            }, 100);
        }
        // else
        //     matchedRoute = this.routes.find((route) => route.path === "*");
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