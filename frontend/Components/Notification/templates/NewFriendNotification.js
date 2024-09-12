import { PROFILE_API_URL, HOST } from "/Utils/GlobalVariables.js";
import { getApiData, createApiData } from "/Utils/APIManager.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";
import { router } from "/root/Router.js";

export class NewFriendNotification extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                .notification-profile {
                    width: auto;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
            </style>
            <div class="mainContainer">
                <div class="message">
                    <a class="notification-profile">
                        <c-hexagon class="online" width="56px" height="55px" apply="true" bcolor="#d9d9d9" >
                            <div class="profile-icon" slot="content"></div>
                        </c-hexagon>
                    </a>
                    <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                        <h4></h4>
                        <h4><i></i></h4>
                    </div>
                </div>
                <div class="notification-actions">
                    <img src="/assets/icons/checked-icon.svg" class="accept" width="24px" height="24px"></img>
                    <svg class="reject" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="red"/>
                    </svg>
                </div>
            </div>
        `;
    }

  
    async initProfileImage(user_name) {
        const profile = this.querySelector(".message c-hexagon");
        const sender = await getApiData(PROFILE_API_URL + user_name + "/");
        profile.bcolor = getLeagueColor(sender.stats.league);
        profile.querySelector("div").style.background =  `url(${HOST + sender.user.avatar}) center center / cover no-repeat`;
        const messageOwner = this.querySelector(".message div h4");
        messageOwner.textContent = sender.user.username;
    }

    initMessage(message) {
        const messageOwner = this.querySelector(".message div h4 i");
        messageOwner.textContent = message;
    }

    async connectedCallback() {
        if (this.senderName)
            await this.initProfileImage(this.senderName);
        if (this.message)
            this.initMessage(this.message);

        const profile = this.querySelector("a");
        profile.href = "/Profile/" + this.senderName;
        console.log("profile.href: ", profile.href);
        profile.addEventListener("click", (event) => {
            event.preventDefault();
            const url = new URL(profile.href);
            router.handleRoute(url.pathname);
        });

        const accept = this.querySelector(".notification-actions .accept");
        if (accept) {
            accept.addEventListener("click", async () => {
                const acceptResponse = await createApiData(HOST + "/friend/accept/" + this.id + "/", "");
                console.log("acceptResponse: ", acceptResponse);
                this.parentElement.remove();
            });
        }
        
        const reject = this.querySelector(".notification-actions .reject");
        if (reject) {
            reject.addEventListener("click", () => {
                alert("reject friend request.");
            });
        }


    }

    static observedAttributes = ["sender-name", "message"];

    async attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "sender-name")
            await this.initProfileImage(newValue);
        else if (attrName == "message")
            this.initMessage(newValue);
    }


    set senderName(val) {
        this.setAttribute("sender-name", val);
    }

    get senderName() {
        return this.getAttribute("sender-name");
    }

    set message(val) {
        this.setAttribute("message", val);
    }

    get message() {
        return this.getAttribute("message");
    }
}

customElements.define("new-friend-notification", NewFriendNotification);