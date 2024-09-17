import { getLeagueColor } from "/Utils/LeaguesData.js";
import { ReceiverMessageContainerComponent } from "/Components/Chat/ChatRoom/MessageComponents/ReceiverMessageContainerComponent.js";

export class ReceiverComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    padding: 5px;
                }

                :host::-webkit-scrollbar {
                    display: none;
                }

                * {
                    margin: 0;
                }
            </style>
            <div class="content">
                <slot ></slot>
            </div>
        `;
    }

    connectedCallback() {
        // this.shadowRoot.querySelector(".profile").bcolor = getLeagueColor(this.league);
        // this.shadowRoot.querySelector(".profile img").src = this.profileImage;
    }

    static observedAttributes = [];

    attributeChangedCallback(name, oldValue, newValue) {
        // if (name === "league")
        //     this.shadowRoot.querySelector(".profile").bcolor = newValue;
        // else if (name === "profile-image")
        //     this.shadowRoot.querySelector(".profile img").src = newValue;
    }
    
    // set league(val) { this.setAttribute("league", val);}
    // get league() { return this.getAttribute("league");}

    // set profileImage(val) { this.setAttribute("profile-image", val);}
    // get profileImage() { return this.getAttribute("profile-image");}

}

customElements.define("receiver-component", ReceiverComponent);
