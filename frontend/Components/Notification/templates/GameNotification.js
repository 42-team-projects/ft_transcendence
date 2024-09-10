import { HOST } from "/Utils/APIUrls.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";
import { getApiData } from "/Utils/APIManager.js";
import { PROFILE_API_URL } from "/Utils/APIUrls.js";
import { player_join_tournament } from "/Components/Tournament/configs/TournamentAPIConfigs.js";
import { router } from "/root/Router.js";
import { Lobby } from "/Components/Game/GamePlay/Lobby.js";

export class GameNotification extends HTMLElement {
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
                    <img src="/assets/icons/arrow-forward-icon.svg" class="read-message"></img>
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
        const playButton = this.querySelector(".notification-actions img");
        playButton.addEventListener("click", async (event) => {
            const lobby = new Lobby(sender.id, 30);
            document.body.querySelector('root-content').innerHTML = '';
            document.body.querySelector('root-content').appendChild(lobby);
        });
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

customElements.define("game-notification", GameNotification);