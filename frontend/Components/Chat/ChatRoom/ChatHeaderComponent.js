
import { getLeagueColor } from "/Utils/LeaguesData.js";

export class ChatHeaderComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
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
        <img loading="lazy" src="/images/Game.svg">
        <img loading="lazy" src="/assets/images/profile/account-icon.svg">
        <img loading="lazy" src="/assets/images/profile/block-icon.svg">
    `;
    }

    connectedCallback() {
        if (this.userName) {
            this.shadowRoot.querySelector(".infos h1").textContent = this.userName;
            this.shadowRoot.querySelector(".activation p").textContent = this.active === "true" ? "online" : "offline";
        }
        else
        {
            this.shadowRoot.querySelector(".infos").style.display = "none";
            this.shadowRoot.querySelectorAll("img").forEach(elem => {
                elem.style.display = "none";
            });
        }
        if (this.league)
            this.shadowRoot.querySelector(".profile").bcolor = getLeagueColor(this.league);
        else
            this.shadowRoot.querySelector(".profile").style.display = "none";
    
        if (this.profileImage)
            this.shadowRoot.querySelector(".c-hexagon-content").style.background = "url(" + this.profileImage + ") center / cover no-repeat";
        else
            this.shadowRoot.querySelector(".c-hexagon-content").style.display = "none";
        const element = this.shadowRoot.querySelector(".online");
        element.bcolor = this.active === "true" ? "#00ffff" : "#d9d9d9";
        element.querySelector("div").style.backgroundColor = this.active === "true" ? "#00ffff" : "#d9d9d9";
    }

    static observedAttributes = ["target-id", "user-name", "league", "active", "profile-image"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "user-name")
        {
            this.shadowRoot.querySelector(".infos h1").textContent = newValue;
            this.shadowRoot.querySelector(".infos").style.display = "flex";
            this.shadowRoot.querySelectorAll("img").forEach(elem => {
                elem.style.display = "flex";
            });
        }
        else if (attrName === "active")
        {
            this.shadowRoot.querySelector(".online").bcolor = newValue === "true" ? "#00ffff" : "#d9d9d9";
            this.shadowRoot.querySelector(".online div").style.background = newValue === "true" ? "#00ffff" : "#d9d9d9";
            this.shadowRoot.querySelector(".activation p").textContent = this.active === "true" ? "online" : "offline";
        }
        else if (attrName === "league")
        {
            const profile = this.shadowRoot.querySelector(".profile");
            profile.bcolor = getLeagueColor(newValue);
            profile.style.display = "flex";
        }
        else if (attrName === "profile-image")
        {
            const profileComponent = this.shadowRoot.querySelector(".c-hexagon-content").style;
            profileComponent.background = "url(" + newValue + ") center / cover no-repeat";
            profileComponent.display = "flex";
        }

    }

    set targetId(val) { this.setAttribute("target-id", val);}
    get targetId() { return this.getAttribute("target-id");}

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
    :host {
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