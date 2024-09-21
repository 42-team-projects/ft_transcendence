import { createApiData } from "/Utils/APIManager.js";
import { PROFILE_API_URL, getNotificationWebSocket, HOST } from "/Utils/GlobalVariables.js";
import { router } from "/root/Router.js";
import { displayToast } from "/Components/CustomElements/CustomToast.js";
import { removeNotification } from "/Components/Notification/configs/NotificationUtils.js";
import { player_join_tournament } from "/Components/Tournament/configs/TournamentAPIConfigs.js";
import { JoinTournament } from "/Components/Tournament/JoinTournament.js";

export class TournamentsSearchSection extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="search-sections">
                <h2 class="result-section-title">TOURNAMENTS</h2>
                <div class="result-section-content"></div>
            </div>
        `;
    }

    connectedCallback() {
        
    }

    appendTournament(tournamentData) {
        const resultSectionContent = this.querySelector(".result-section-content");
        Array.from(tournamentData).forEach(elem => {
            const item = this.createTournamentItem(elem);
            resultSectionContent.appendChild(item);
        });
    }

    clearTournaments() {
        this.querySelector(".result-section-content").innerHTML = '';
    }

    createTournamentItem(tournamentData) {
        const item = document.createElement("div");
        item.className = "item";
        item.id = "id_" + tournamentData.tournament_id;
        item.innerHTML = `
            <div class="profile-item">${tournamentData.tournament_name}</div>
            <div class="search-actions">
                <img src="/assets/icons/join-icon.svg" class="read-message" width="24px" height="24px"></img>
            </div>
        `;
        item.addEventListener("click", () => {


            const alertsConrtainer = window.document.querySelector("body .alerts");
            if (!alertsConrtainer)
                return;
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
                    const addPlayer = new JoinTournament();
                    const data = await player_join_tournament(tournamentData.tournament_id);
                    if (data)
                    {
                        const setNicknameResponse = await createApiData(PROFILE_API_URL + "setNickname/", JSON.stringify({"nickname": value, "tournament_id": tournamentData.tournament_id}));
                        if (setNicknameResponse.ok) {
                            const websocket = await getNotificationWebSocket();
                            websocket.send(JSON.stringify({'message': 'the user accept your invetation.', 'receiver': tournamentData.owner.user.id, 'is_signal': true, 'type': "tournament", "data": `/Tournament/${tournamentData.tournament_id}`}));
                            
                            await addPlayer.initTournamentSocket(data);

                            const url = new URL(HOST + "/Tournament");
                            router.handleRoute(url.pathname);
                        }
                    }
                    else
                        displayToast("error", "you already join to this tournament !!");
                    alertsConrtainer.style.display = "none";
                }
            });
            alertsConrtainer.appendChild(nicknameContainer);


        });
        return item;
    }
}

customElements.define("tournaments-search-section", TournamentsSearchSection);