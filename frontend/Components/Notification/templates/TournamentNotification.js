import { HOST } from "/Utils/GlobalVariables.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";
import { getApiData } from "/Utils/APIManager.js";
import { PROFILE_API_URL, getNotificationWebSocket } from "/Utils/GlobalVariables.js";
import { player_join_tournament } from "/Components/Tournament/configs/TournamentAPIConfigs.js";
import { router } from "/root/Router.js";
import { JoinTournament } from "/Components/Tournament/JoinTournament.js";
import { createApiData } from "/Utils/APIManager.js";
import { removeNotification } from "/Components/Notification/configs/NotificationUtils.js";
import { displayToast } from "/Components/CustomElements/CustomToast.js";

export class TournamentNotification extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="mainContainer">
                <div class="message">
                    <c-hexagon class="online" width="56px" height="55px" apply="true" bcolor="aqua" >
                        <div class="profile-icon" slot="content" style="width:100%; height:100%;"></div>
                    </c-hexagon>
                    <div style="display: flex; flex-direction:column; gap: 4px;">
                        <h6></h6>
                        <h6><i></i></h6>
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

    sender;
    async initProfileImage(user_name) {
        const profile = this.querySelector(".message c-hexagon");
        this.sender = await getApiData(PROFILE_API_URL + user_name + "/");
        profile.bcolor = getLeagueColor(this.sender.stats.league);
        profile.querySelector("div").style.background =  `url(${HOST + this.sender.user.avatar}) center center / cover no-repeat`;
        const messageOwner = this.querySelector(".message div h6");
        messageOwner.textContent = this.sender.user.username;
    }

    initMessage(message) {
        const messageOwner = this.querySelector(".message div h6 i");
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
            const addPlayer = new JoinTournament();
            const data = await player_join_tournament(this.tournamentId);
            if (data)
            {
                const alertsConrtainer = window.document.querySelector("body .alerts");
                alertsConrtainer.innerHTML = "";
                alertsConrtainer.style.display = "flex";
                const nicknameContainer = document.createElement("div");
                nicknameContainer.className = "nickname-container"
                nicknameContainer.innerHTML = `
                    <style>
                        .nickname-container {
                            position: relative;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            gap: 50px;
                            background: #00142b;
                            border: 1px solid aqua;
                            padding: 20px;
                            border-radius: 10px;
                        }
    
                        .close-button {
                            position: absolute;
                            top: 10px;
                            right: 10px;
                            width: 16px;
                            height: 16px;
                        }
                    </style>
                    <img class="close-button" src="/assets/icons/close-x-icon.svg" width="16px" ></img>
                    <custom-select id="nickname" label="Nickname"></custom-select>
                    <custom-button class="save-button" width="200px" height="48px">Save</custom-button>
                `;
                nicknameContainer.querySelector(".close-button").addEventListener("click", () => {
                    nicknameContainer.remove();
                    alertsConrtainer.style.display = "none";
                });
                nicknameContainer.querySelector(".save-button").addEventListener("click", async () => {
                    const value = nicknameContainer.querySelector("custom-select").value;
                    if (value && value.length > 1) {
                        const setNicknameResponse = await createApiData(PROFILE_API_URL + "setNickname/", JSON.stringify({"nickname": value, "tournament_id": this.tournamentId}));
                        if (setNicknameResponse.ok) {
                            
                            const websocket = await getNotificationWebSocket();
                            websocket.send(JSON.stringify({'message': 'the user accept your invetation.', 'receiver': this.sender.user.id, 'is_signal': true, 'type': "tournament", "data": `/Tournament/${this.tournamentId}`}));
                            

                            await addPlayer.initTournamentSocket(data);


                            const url = new URL(joinButton.href);
                            router.handleRoute(url.pathname);
                            this.parentElement.remove();

                            // nicknameContainer.remove();
                            alertsConrtainer.style.display = "none";
                        }
                    }
                });
                alertsConrtainer.appendChild(nicknameContainer);
            }
            else
                displayToast("error", "you already join to this tournament !!");
            removeNotification(this.id);
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