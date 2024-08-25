export class Router {
    constructor() {
        this.routes = [
            { path: "/signup", view: "signup-page" },
            { path: "/confirm-email", view: "email-page" },
            { path: "/oauth", view: "oauth-callback" },
            { path: "*", view: "login-page" },
            
            { path: '/home', view: 'home-page' },
            { path: '/play', view: 'game-selection' },
            { path: '/chat', view: 'chat-page' },
            { path: '/friends', view: 'game-selection' },
            { path: '/tournament', view: 'tournament-page' },
            { path: '/settings', view: 'settings-page' },
        ];
        
        this.rootContent = document.querySelector("root-content");
        this.handleRoute(window.location.pathname);
    }

    handleRoute(path) {
        console.log(path);
        if (window.location.pathname !== path)
            window.history.pushState({}, "", path);

        let matchedRoute = this.routes.find((route) => route.path === path);
        if (!matchedRoute)
            matchedRoute = this.routes.find((route) => route.path === "*");

        this.rootContent.innerHTML = "";
        this.rootContent.appendChild(document.createElement(matchedRoute.view));
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