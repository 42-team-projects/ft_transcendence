import { getLeagueColor } from "/Utils/LeaguesData.js"

export class FriendItemComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: flex;
                justify-content: space-between;
                gap: 10px;
                align-items: center;
                animation: slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
            }

            p {
                flex: 3;
            }

            .c-hexagon-content {
                width: 48px;
                height: 48px;
            }
        </style>

        <c-hexagon class="profile" width="48px" height="48px" apply="true" bcolor="aqua">
            <div slot="content" class="c-hexagon-content"></div>
        </c-hexagon>
        <p></p>
        <c-hexagon class="status" width="16px" height="16px" apply="true" bcolor="#d9d9d9">
            <div style="width: 100%; height: 100%; background-color: #d9d9d9;" slot="content"></div>
        </c-hexagon>  
    `;
    }

    connectedCallback() {
        // this.shadowRoot.querySelector(".profile").bcolor = getLeagueColor(this.league);
        // this.shadowRoot.querySelector(".c-hexagon-content").style.background = "url(" + this.profileImage + ") center / cover no-repeat";
        // const statusElement = this.shadowRoot.querySelector(".status");
        // statusElement.bcolor = this.status === "true" ? "#d9d9d9" : "aqua";
        // statusElement.querySelector("div").style.backgroundColor = this.status === "true" ? "#d9d9d9" : "aqua"; 
        // this.shadowRoot.querySelector("p").textContent = this.userName;
    }


    static observedAttributes = ["league", "profile-image", "status", "user-name"];

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "league")
            this.shadowRoot.querySelector(".profile").bcolor = getLeagueColor(newValue);
        else if (name === "profile-image")
            this.shadowRoot.querySelector(".c-hexagon-content").style.background = "url(" + newValue + ") center / cover no-repeat";
        else if (name === "status")
        {
            const statusElement = this.shadowRoot.querySelector(".status");
            if (newValue === "true") {
                statusElement.bcolor = "aqua";
                statusElement.querySelector("div").style.backgroundColor = "aqua"; 
            }
            else {
                statusElement.bcolor = "#d9d9d9";
                statusElement.querySelector("div").style.backgroundColor = "#d9d9d9"; 
            }
        }
        else if (name === "user-name")
            this.shadowRoot.querySelector("p").textContent = newValue;
    }

    
    set userName(val) { this.setAttribute("user-name", val);}
    get userName() { return this.getAttribute("user-name");}

    set status(val) { this.setAttribute("status", val);}
    get status() { return this.getAttribute("status");}
    
    set league(val) { this.setAttribute("league", val);}
    get league() { return this.getAttribute("league");}

    set profileImage(val) { this.setAttribute("profile-image", val);}
    get profileImage() { return this.getAttribute("profile-image");}
}

customElements.define("friend-item", FriendItemComponent);
