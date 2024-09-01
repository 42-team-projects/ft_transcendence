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
            "http://127.0.0.1:8000/game/player/",
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
            localStorage.setItem('user_data', JSON.stringify(data));
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
        this.not_accessed_routes = [
            { path: "/signup", view: "signup-page" },
            { path: "/confirm-email", view: "email-page" },
            { path: "/oauth", view: "oauth-callback" },
            { path: "*", view: "login-page" },
            
        ]
        
        this.accessed_routes = [
            { path: '/Home', view: 'home-page' },
            { path: '/Game', view: 'game-selection' },
            { path: '/Chat', view: 'chat-page' },
            { path: '/Friends', view: 'freinds-page' },
            { path: '/Tournament', view: 'tournament-page' },
            { path: '/Settings', view: 'settings-page' },
            { path: '*', view: 'home-page' }
        ]
        this.randred = false;
        this.rootContent = document.querySelector("root-content");
        this.header = document.querySelector("header-bar");
        this.sideBar = document.querySelector("side-bar");
        this.handleRoute(window.location.pathname);
    }
    randring(access_token){
        document.body.classList.add('body-default-shrink')
        this.header.render()
        this.sideBar.render()
        this.randred = true;
        fetchWhoAmI(access_token);
        this.this.sideBar.shadowRoot.querySelectorAll('sb-button').forEach((button, index) =>{
            let a = button.shadowRoot.querySelector('a');
            let url = new URL(a.href);
            if(url.pathname === matchedRoute.path){
                this.this.sideBar.clickEvent = index;
            }
        });
    }

    removeRandring(){
        document.body.classList.remove('body-default-shrink')
        this.header.remove()
        this.sideBar.remove()
        this.randred = false;
    }

    changeStyle(access_token, path){
        console.log(access_token)
        let matchedRoute = this.accessed_routes.find((route) => route.path === path);
        if(access_token){
            if(!matchedRoute)
                matchedRoute = this.accessed_routes.find((route) => route.path === "/Home");
            if(this.randred === false)
                this.randring(access_token);
            this.rootContent.innerHTML = "";
            this.rootContent.appendChild(document.createElement(matchedRoute.view));
        }
        matchedRoute = this.not_accessed_routes.find((route) => route.path === path);
        if(!access_token){
            if(!matchedRoute)
                matchedRoute = this.not_accessed_routes.find((route) => route.path === "*");
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