export class Router {
    constructor() {
        this.routes = [
            { path: "/signup", view: "signup-page" },
            { path: "/confirm-email", view: "email-page" },
            { path: "/oauth", view: "oauth-callback" },
            { path: "*", view: "login-page" },
            { path: "/home", view: "home-page" }, // temp view
        ];
        this.userComponent = document.querySelector("user-cpn");
        this.app = this.userComponent.shadowRoot.querySelector("#app");
        this.handleRoute(window.location.pathname);
    }

    handleRoute(path) {
        console.log(path);
        if (window.location.pathname !== path)
            window.history.pushState({}, "", path);

        let matchedRoute = this.routes.find((route) => route.path === path);
        if (!matchedRoute)
            matchedRoute = this.routes.find((route) => route.path === "*");

        this.app.innerHTML = "";
        this.app.appendChild(document.createElement(matchedRoute.view));
        this.addLinkEventListeners();
    }

    addLinkEventListeners() {
        this.app.querySelectorAll('a[href^="/"]').forEach(link => {
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