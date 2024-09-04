import { getApiData } from "../../Utils/APIManager.js";
import { PROFILE_API_URL } from "../../Utils/APIUrls.js";
import { createWebSocketsForTournaments } from "../Utils/TournamentWebSocketManager.js";
export let playerId;
export const fetchWithToken = async (url, options) => {
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
            { path: '/Profile', view: 'profile-component' },
            { path: '*', view: 'home-page' },
        ];
        this.randred = false;
        this.rootContent = document.querySelector("root-content");
        this.header = document.querySelector("header-bar");
        this.sideBar = document.querySelector("side-bar");
        this.handleRoute(window.location.pathname);
    }
    randring(access_token, matchedRoute){
        document.body.classList.add('body-default-shrink')
        this.header.render()
        this.sideBar.render()
        this.randred = true;

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
        document.body.classList.remove('body-default-shrink')
        this.header.remove()
        this.sideBar.remove()
        this.randred = false;
        console.log("remove")
    }
    async changeStyle(access_token, path){
        console.log("hiii", access_token)
        let matchedRoute = this.accessed_routes.find((route) => route.path === path);
        if(access_token){
            if(!matchedRoute)
                matchedRoute = this.accessed_routes.find((route) => route.path === "/Home");
            console.log(this.randred)
            if(this.randred === false)
                this.randring(access_token, matchedRoute);
            if (!playerId)
            {
                const data = await getApiData(PROFILE_API_URL);
                playerId = data.id;
            }
            const res = await createWebSocketsForTournaments();
            this.rootContent.innerHTML = "";
            this.rootContent.appendChild(document.createElement(matchedRoute.view));
            this.sideBar.shadowRoot.querySelectorAll('sb-button').forEach((button, index) =>{
                let a = button.shadowRoot.querySelector('a');
                let url = new URL(a.href);
                if(url.pathname === matchedRoute.path){
                    this.sideBar.clickEvent = index;
                }
            });
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