import { getLeagueColor } from "../../Utils/LeaguesData.js";
import { ReceiverMessageContainerComponent } from "./MessageComponents/ReceiverMessageContainerComponent.js";

export class ReceiverComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    padding: 5px;
                    animation: slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                }

                :host::-webkit-scrollbar {
                    display: none;
                }
            
                @keyframes slide-right {
                    0% {
                      transform: translateX(-100%);
                    }
                    100% {
                      transform: translateX(0);
                    }
                }

                * {
                    margin: 0;
                }
                .content {
                    margin-top: 20px;
                }
            </style>
            <c-hexagon class="profile" width="48px" height="47px" apply="true" bcolor="aqua">
                <img loading="lazy"   slot="content" draggable="false" width="48px">
            </c-hexagon>
            <div class="content">
                <slot ></slot>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".profile").bcolor = getLeagueColor(this.league);
        this.shadowRoot.querySelector(".profile img").src = this.profileImage;
    }

    static observedAttributes = ["league", "profile-image"];

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "league")
            this.shadowRoot.querySelector(".profile").bcolor = getLeagueColor(newValue);
        else if (name === "profile-image")
            this.shadowRoot.querySelector(".profile img").src = newValue;
    }
    
    set league(val) { this.setAttribute("league", val);}
    get league() { return this.getAttribute("league");}

    set profileImage(val) { this.setAttribute("profile-image", val);}
    get profileImage() { return this.getAttribute("profile-image");}

}

customElements.define("receiver-component", ReceiverComponent);
