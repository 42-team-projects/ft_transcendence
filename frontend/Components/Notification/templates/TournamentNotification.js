import { HOST } from "/Utils/APIUrls.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";
import { getApiData } from "/Utils/APIManager.js";
import { PROFILE_API_URL } from "/Utils/APIUrls.js";
import { player_join_tournament } from "/Components/Tournament/configs/TournamentAPIConfigs.js";
import { router } from "/root/Router.js";

export class TournamentNotification extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="mainContainer">
                <div class="message">
                    <c-hexagon class="online" width="56px" height="55px" apply="true" bcolor="aqua" >
                        <div class="profile-icon" slot="content" style="width:100%; height:100%;"></div>
                    </c-hexagon>
                    <div style="display: flex; gap: 5px;">
                        <h4></h4>
                        <h4><i></i></h4>
                    </div>
                </div>
                <div class="notification-actions">
                    <a href="/Tournament">
                        <img src="/assets/icons/join-icon.svg" class="read-message"></img>
                    </a>
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
        const joinButton = this.querySelector(".notification-actions a");
        joinButton.addEventListener("click", async (event) => {
            event.preventDefault();
            console.log("this.tournamentId 22:", this.tournamentId);
            await player_join_tournament(this.tournamentId);
            const url = new URL(joinButton.href);
            router.handleRoute(url.pathname);
        });
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

    set tournamentId(val) {
        this.setAttribute("tournament-id", val);
    }

    get tournamentId() {
        return this.getAttribute("tournament-id");
    }

}

customElements.define("tournament-notification", TournamentNotification);