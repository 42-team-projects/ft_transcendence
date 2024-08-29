const fetchWithToken = async (url, options) => {
    const response = await fetch(url, options);

    if (response.status === 401) {
        const refreshResponse = await fetch(
            "http://127.0.0.1:8000/api/v1/auth/refresh/",
            {
                method: "POST",
                credentials: "include",
            }
        );

        if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            const accessToken = data.access_token;
            localStorage.setItem("accessToken", accessToken);
            options.headers.Authorization = `Bearer ${accessToken}`;
            return fetch(url, options);
        }

        throw new Error("Unable to refresh token");
    }
    return response;
};
async function fetchWhoAmI(accessToken) {

    try {
        const response = await fetchWithToken(
            "http://127.0.0.1:8000/api/v1/auth/whoami/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            console.log(document.cookie);
        }
    } catch (error) {
        console.log('====>', error);
        if (error.message === "Unable to refresh token") {
            window.location.href = '../html/login.html';
        } else {
            console.error("Error:", error);
        }
    }
}

export class Router {
    constructor() {
        this.routes = [
            // { path: "/signup", view: "signup-page" },
            // { path: "/confirm-email", view: "email-page" },
            // { path: "/oauth", view: "oauth-callback" },
            { path: "*", view: "home-page" },
            
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
            fetchWhoAmI(accessToken);
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
        else{
            // go to 127.0.0.1:3000/login
            // window.location.href = 'http:/
        }
        this.rootContent.innerHTML = "";
        this.rootContent.changeStyle(accessToken);
        this.rootContent.appendChild(document.createElement(matchedRoute.view));
        // this.rootContent.clickEvent();
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