import { HOST, PROFILE_API_URL, getNotificationWebSocket, getCurrentPlayerId } from "/Utils/GlobalVariables.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";
import { getApiData } from "/Utils/APIManager.js";
import { player_join_tournament } from "/Components/Tournament/configs/TournamentAPIConfigs.js";
import { router } from "/root/Router.js";
import { Lobby } from "/Components/Game/GamePlay/Lobby/Lobby.js";
import { deleteApiData } from "/Utils/APIManager.js";
import { removeNotification } from "/Components/Notification/configs/NotificationUtils.js";

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
                        <h6></h6>
                        <h6><i></i></h6>
                    </div>
                </div>
                <div class="notification-actions">
                    <img src="/assets/icons/arrow-forward-icon.svg" class="read-message"></img>
                </div>
            </div>
        `;
    }


    async initProfileImage(user_name) {
        const currentPlayerId = await getCurrentPlayerId();

        const profile = this.querySelector(".message c-hexagon");
        const sender = await getApiData(PROFILE_API_URL + user_name + "/");
        profile.bcolor = getLeagueColor(sender.stats.league);
        profile.querySelector("div").style.background =  `url(${HOST + sender.user.avatar}) center center / cover no-repeat`;
        const messageOwner = this.querySelector(".message div h6");
        messageOwner.textContent = sender.user.username;
        const playButton = this.querySelector(".notification-actions img");
        playButton.addEventListener("click", async (event) => {
            const websocket = await getNotificationWebSocket();
            websocket.send(JSON.stringify({'message': 'send you a friend request', 'receiver': sender.user.id, 'is_signal': true, "type": "game", "data": currentPlayerId}));
            removeNotification(this.id);
            this.parentElement.remove();
            new Lobby(sender.id, 30);
        });
    }

    initMessage(message) {
        const messageOwner = this.querySelector(".message div h6 i");
        messageOwner.textContent = message;
    }

    async connectedCallback() {
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