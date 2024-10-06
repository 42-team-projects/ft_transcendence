
import { getLeagueColor } from "/Utils/LeaguesData.js";
import { router } from "/root/Router.js";
import { HOST, getNotificationWebSocket } from "/Utils/GlobalVariables.js";
import { createApiData, deleteApiData } from "/Utils/APIManager.js";
import { displayToast } from "/Components/CustomElements/CustomToast.js";

export class ChatHeaderComponent extends HTMLElement {
    constructor () {
        super();
        this.innerHTML = `
        <style>
            ${cssContent}
        </style>
        <div class="profile-infos">
            <c-hexagon class="profile" width="120px" height="118px" apply="true" bcolor="aqua">
                <div slot="content" class="c-hexagon-content"></div>
            </c-hexagon>
            <div class="infos">
                <h1>SALIM ELMEHDI</h1>
                <div class="activation">
                    <c-hexagon class="online" width="16px" height="16px" apply="true" bcolor="aqua" >
                        <div style="width: 100%; height: 100%; background-color: aqua;" slot="content"></div>
                    </c-hexagon>
                    <p>online</p>
                </div>
            </div>
        </div>
        <img class="play-game" loading="lazy" src="/images/Game.svg">
        <img class="show-profile" loading="lazy" src="/assets/icons/account-icon.svg">
        <img class="block-profile" loading="lazy" src="/assets/icons/block-icon.svg">
    `;
    }

    connectedCallback() {
        const profileIcon = this.querySelector(".show-profile");
        profileIcon.addEventListener("click", (e) => {
            e.preventDefault();
            const url = new URL(HOST + "/Profile/" + this.userName);
            router.handleRoute(url.pathname);
        })
        const playgame = this.querySelector(".play-game");
        playgame.addEventListener("click", async (e) => {
            const websocket = await getNotificationWebSocket();
            websocket.send(JSON.stringify({'message': 'want to play with you.', 'receiver': this.userId, 'is_signal': false, "type": "game", "data": ""}));
            displayToast("success", "Your Request has been sended successfully.");
        })

        const blockProfile = this.querySelector(".block-profile");
        blockProfile.addEventListener("click", async (e) => {
            if (blockProfile.id === "blocked") {
                const blockResponse = await deleteApiData(HOST + "/friend/unblock/" + this.userId + "/");
                if (blockResponse)
                    router.handleRoute(window.location.pathname);
                displayToast("success", "unblock player " + this.userName);
            }
            else {
                const blockResponse = await createApiData(HOST + "/friend/block/" + this.userId + "/", "");
                const res = await blockResponse.json();
                if (blockResponse.ok) {
                    displayToast("success", res.response);
                    router.handleRoute(window.location.pathname);
                }
                else
                    displayToast("error", res.response);
            }
            router.handleRoute(window.location.pathname);
        })



        if (this.userName) {
            this.querySelector(".infos h1").textContent = this.userName;
            this.querySelector(".activation p").textContent = this.active === "true" ? "online" : "offline";
        }
        else
        {
            this.querySelector(".infos").style.display = "none";
            this.querySelectorAll("img").forEach(elem => {
                elem.style.display = "none";
            });
        }
        if (this.league)
            this.querySelector(".profile").bcolor = getLeagueColor(this.league);
        else
            this.querySelector(".profile").style.display = "none";
    
        if (this.profileImage)
            this.querySelector(".c-hexagon-content").style.background = "url(" + this.profileImage + ") center / cover no-repeat";
        else
            this.querySelector(".c-hexagon-content").style.display = "none";
        const element = this.querySelector(".online");
        element.bcolor = this.active === "true" ? "#00ffff" : "#d9d9d9";
        element.querySelector("div").style.backgroundColor = this.active === "true" ? "#00ffff" : "#d9d9d9";
    }

    static observedAttributes = ["player-id", "user-id", "user-name", "league", "active", "profile-image", "isblocked"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "user-name")
        {
            this.querySelector(".infos h1").textContent = newValue;
            this.querySelector(".infos").style.display = "flex";
            this.querySelectorAll("img").forEach(elem => {
                elem.style.display = "flex";
            });
        }
        else if (attrName === "active")
        {
            this.querySelector(".online").bcolor = newValue === "true" ? "#00ffff" : "#d9d9d9";
            this.querySelector(".online div").style.background = newValue === "true" ? "#00ffff" : "#d9d9d9";
            this.querySelector(".activation p").textContent = this.active === "true" ? "online" : "offline";
        }
        else if (attrName === "league")
        {
            const profile = this.querySelector(".profile");
            profile.bcolor = getLeagueColor(newValue);
            profile.style.display = "flex";
        }
        else if (attrName === "profile-image")
        {
            const profileComponent = this.querySelector(".c-hexagon-content").style;
            profileComponent.background = "url(" + newValue + ") center / cover no-repeat";
            profileComponent.display = "flex";
        }
        else if (attrName === "isblocked")
        {
            if (newValue == "true") {
                const profileComponent = this.querySelector(".block-profile");
                profileComponent.id = "blocked";
                profileComponent.src = "/assets/icons/unblock-icon.svg";
            }
        }

    }

    set isblocked(val) { this.setAttribute("isblocked", val);}
    get isblocked() { return this.getAttribute("isblocked");}

    set playerId(val) { this.setAttribute("player-id", val);}
    get playerId() { return this.getAttribute("player-id");}

    set userId(val) { this.setAttribute("user-id", val);}
    get userId() { return this.getAttribute("user-id");}

    set userName(val) { this.setAttribute("user-name", val);}
    get userName() { return this.getAttribute("user-name");}

    set league(val) { this.setAttribute("league", val);}
    get league() { return this.getAttribute("league");}
    
    set active(val) { this.setAttribute("active", val);}
    get active() { return this.getAttribute("active");}
    
    set profileImage(val) { this.setAttribute("profile-image", val);}
    get profileImage() { return this.getAttribute("profile-image");}



}

customElements.define("chat-header", ChatHeaderComponent);


const cssContent = /*css*/ `
    chat-header {
        font-family: 'Sansation bold';
        display: flex;
        justify-content: space-between;
        align-items: center;
        justify-content: center;
        padding: 15px 0;
    }

    .c-hexagon-content {
        width: 120px;
        height: 120px;
    }

    .profile-infos {
        flex: 8;
        padding-left: 30px;
        display: flex;
        align-items: center;
        color: white;
        gap: 10px;
    }
    
    .profile-infos h1 {
        font-size: 38px;
        margin: 0;
    }
    
    .profile-infos img {
        width: 100%;
        height: 100%;
    }
    
    img {
        flex: 1;
        width: 40px;
        height: 40px;
        cursor: pointer;
    }
    
    .infos {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .activation {
        align-items: center;
        display: flex;
        gap: 10px;
    }
`;