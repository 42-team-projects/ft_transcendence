import { getLeagueColor } from "../../../Utils/LeaguesData.js";

export class ProfileInfoComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    static observedAttributes = ["src", "username", "joindate", "league", "active", "friend"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "src")
        {
            const element = this.shadowRoot.querySelector(".c-hexagon-content");
            if (!element)
                return ;
            element.style.background = "url(" + newValue + ") center / cover no-repeat";
        }
        else if (attrName === "username")
        {
            const element = this.shadowRoot.querySelector(".name-and-online p");
            if (!element)
                return ;
            element.textContent = newValue;
        }
        else if (attrName === "joindate")
        {
            const element = this.shadowRoot.querySelector(".joined-date-text");
            if (!element)
                return ;
            element.textContent = newValue;
        }
        else if (attrName === "league")
        {
            const element = this.shadowRoot.querySelector(".c-hexagon-profile");
            if (!element)
                return ;
            element.bcolor = getLeagueColor(this.league);
        }
        else if (attrName === "active")
        {
            const element = this.shadowRoot.querySelector(".name-and-online c-hexagon");
            if (!element)
                return ;
            element.bcolor = newValue === "true" ? "#00ffff" : "#d9d9d9";
            element.querySelector("div").style.background = newValue === "true" ? "#00ffff" : "#d9d9d9";
        }
        else if (attrName === "friend")
        {
            const element = this.shadowRoot.querySelector(".add-friend img");
            if (!element)
            return ;
            element.hidden = newValue === "true" ? true : false;
        }
        
    }

    get src() { return this.getAttribute("src");}
    set src(value) { this.setAttribute("src", value);}
    
    get username() { return this.getAttribute("username");}
    set username(value) { this.setAttribute("username", value);}
    
    get joindate() { return this.getAttribute("joindate");}
    set joindate(value) { this.setAttribute("joindate", value);}

    get league() { return this.getAttribute("league");}
    set league(value) { this.setAttribute("league", value);}

    get active() { return this.getAttribute("active");}
    set active(value) { this.setAttribute("active", value);}
    
    get friend() { return this.getAttribute("friend");}
    set friend(value) { this.setAttribute("friend", value);}
    
    connectedCallback() {

        this.shadowRoot.innerHTML = /* html */ `
            <style>

                ${cssContent}
            
            </style>
            <div class="profile-image">
                <c-hexagon class="c-hexagon-profile" width="250px" height="250px" apply="true">
                    <div slot="content" class="c-hexagon-content"></div>
                </c-hexagon>
                <div class="name">
                    <div class="name-and-online">
                        <p> </p>
                        <c-hexagon width="24px" height="24px" apply="true">
                            <div style="width: 100%; height: 100%;" slot="content"></div>
                        </c-hexagon>
                    </div>
                    <div class="joined-date">
                        <img loading="lazy"   src="./assets/images/profile/Calendar.svg" width="20px"/>
                        <p class="joined-text">joined:</p>
                        <p class="joined-date-text"> </p>
                    </div>
                </div>
                <div class="add-friend">
                    <img loading="lazy"   src="./assets/images/profile/add-friends-icon.svg" width="32"/>
                </div>
            </div>

        `;
    }
}

customElements.define("profile-info-component", ProfileInfoComponent);

const cssContent = /*css*/`
    :host * {
        margin: 0;
        padding: 0;
    }

    .c-hexagon-content {
        width: 250px;
        height: 247px;
    }

    .profile-image {
        display: flex;
        position: relative;
        margin-left: 30%;
        margin-top: -155px;
        height: 250px;
        z-index: 3;
    }

    .add-friend {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
        height: 80%;
    }

    .add-friend img {
        width: 32px;
        height: 32px;
    }

    .profile-image > .name {
        height: 250px;
        display: flex;
        flex-direction: column;
        margin: 10px;
        margin-top: 60px;
    }

    .name-and-online {
        width: 100%;
        color: white;
        display: flex;
        justify-content: space-between;
        gap: 10px;
        align-items: center;
    }

    .name-and-online > p {
        font-size: 40px;
        margin-right: 10px;
    }

    .joined-date {
        color: #d9d9d9;
        gap: 10px;
        display: flex;
        width: max-content;
        margin-top: 10px;
        opacity: 0.7;
    }
`;