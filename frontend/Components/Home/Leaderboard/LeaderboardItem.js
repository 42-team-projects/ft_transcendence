import { HOST } from "/Utils/GlobalVariables.js";
import { router } from "/root/Router.js";
import { getLeagueColor, getLeagueImage } from "/Utils/LeaguesData.js";

export class LeaderboardItem extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <svg width="300" height="10" viewBox="0 0 405 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M195.876 1.59094L190.84 7.44064M190.84 7.44064L195.876 13.2903M190.84 7.44064H2" stroke="aqua" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M209.247 13.2903L214.283 7.44058M214.283 7.44058L209.247 1.59088M214.283 7.44058L403.123 7.44058" stroke="aqua" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="195.875" y="7.5" width="9.19239" height="9.19239" transform="rotate(-45 195.875 7.5)" fill="aqua"/>
            </svg>
        
            <div class="leaderboard-item-content">
                <h1 class="rank">4</h1>
                <h4>esalim</h4>
                <c-hexagon class="c-hexagon-profile" width="64px" height="64px" apply="true">
                    <div slot="content" class="c-hexagon-content"></div>
                </c-hexagon>
                <img src="/assets/images/leagues/bronze-league.svg" width="32px"></img>
                <div style="display: flex; flex-direction: column; align-items:center; justify-content: center;">
                    <h3>5644</h3>
                    <h4>XP</h4>
                </div>
            </div>
        `;
    }
    connectedCallback() {
        this.querySelector("c-hexagon").addEventListener("click", (e) => {
            const url = new URL(HOST + "/Profile/" + this.username);
            router.handleRoute(url.pathname);
        });
    }


    static observedAttributes = ["rank", "username", "profile", "league", "total_win"];


    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "rank")
            this.querySelector(".leaderboard-item-content h1").textContent = newValue;
        else if (attrName == "username")
            this.querySelector(".leaderboard-item-content h4").textContent = newValue;
        else if (attrName == "profile")
            this.querySelector(".leaderboard-item-content c-hexagon div").style.background = "url(" + newValue + ") center / cover no-repeat";
        else if (attrName == "league") {
            this.querySelector(".leaderboard-item-content c-hexagon").bcolor = getLeagueColor(newValue);
            this.querySelector(".leaderboard-item-content img").src = getLeagueImage(newValue);
        }
        else if (attrName == "total_win")
            this.querySelector(".leaderboard-item-content h3").textContent = newValue;
    }

    set rank(val) { this.setAttribute("rank", val); }
    get rank() { return this.getAttribute("rank"); }

    set username(val) { this.setAttribute("username", val); }
    get username() { return this.getAttribute("username"); }

    set profile(val) { this.setAttribute("profile", val); }
    get profile() { return this.getAttribute("profile"); }

    set league(val) { this.setAttribute("league", val); }
    get league() { return this.getAttribute("league"); }

    set total_win(val) { this.setAttribute("total_win", val); }
    get total_win() { return this.getAttribute("total_win"); }

}

customElements.define("leaderboard-item", LeaderboardItem);