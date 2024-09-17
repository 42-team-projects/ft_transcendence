import { HOST } from "/Utils/GlobalVariables.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";
import { ProfileComponent } from "/Components/Profile/ProfileComponent.js";
import { router } from "/root/Router.js";
import { getNotificationWebSocket } from "/Utils/GlobalVariables.js";
import { Lobby } from "/Components/Game/GamePlay/Lobby.js";
import { createApiData } from "/Utils/APIManager.js";

export class UsersSearchSection extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>

                .search-actions {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                }

            </style>
            <div class="search-sections">
                <h2 class="result-section-title">USERS</h2>
                <div class="result-section-content"></div>
            </div>
        `;
    }

    connectedCallback() {

    }

    appendPlayers(playersData) {
        const resultSectionContent = this.querySelector(".result-section-content");
        if (!playersData)
            return ;
        Array.from(playersData).forEach(elem => {
            const item = this.createPlayerItem(elem);
            resultSectionContent.appendChild(item);
        });
    }

    clearPlayers() {
        this.querySelector(".result-section-content").innerHTML = '';
    }

    createPlayerItem(playerData) {
        const item = document.createElement("div");
        item.className = "item";
        item.id = "id_" + playerData.id;
        item.innerHTML = `
            <div class="profile-item">
                <c-hexagon class="profile" width="56px" height="55px" apply="true" bcolor="${getLeagueColor(playerData.stats.league)}" >
                    <div class="profile-icon" slot="content" style="background: url(${HOST + playerData.user.avatar}) center center / cover no-repeat; width:100%; height:100%;"></div>
                </c-hexagon>
                <h4>${playerData.user.username}</h4>
            </div>
            <div class="search-actions">
                <img id="chat" src="${playerData.is_friend ? "/assets/icons/chat-icon.svg" : "/assets/icons/add-friends-icon.svg"}" class="read-message" width="24px" height="24px"></img>
                <img id="play-game" src="/assets/icons/manette-icon.svg" class="read-message" width="24px" height="24px"></img>
                <a id="show-profile" href="/Profile/${playerData.user.username}">
                    <img src="/assets/icons/account-icon.svg" class="read-message" width="24px" height="24px"></img>
                </a>
            </div>
        `;

        const chat = item.querySelector("#chat");
        const playGame = item.querySelector("#play-game");
        const showProfile = item.querySelector("#show-profile");
        showProfile.addEventListener("click", e => {
            e.preventDefault()
            const url = new URL(showProfile.href)
            console.log(url.pathname)
            router.handleRoute(url.pathname)
        });

        playGame.addEventListener("click", async () => {
            const websocket = await getNotificationWebSocket();
            websocket.send(JSON.stringify({'message': 'want to play with you.', 'receiver': playerData.user.id, 'is_signal': false, "type": "game", "data": "hello world"}));
            new Lobby(playerData.user.id, 30);
        });

        chat.addEventListener("click", async () => {
            if (playerData.is_friend) {
                const url = new URL(HOST + "/Chat/" + playerData.user.username);
                router.handleRoute(url.pathname);
                return ;
            }
            const sendRequestResponse = await createApiData(HOST + "/friend/send/" + playerData.user.id + "/", "");
            if (sendRequestResponse.response) {
                const websocket = await getNotificationWebSocket();
                websocket.send(JSON.stringify({'message': 'send you a friend request', 'receiver': playerData.user.id, 'is_signal': false, "type": "friend", "data": "hello world"}));
            }

        });
        return item;
    }

}

customElements.define("users-search-section", UsersSearchSection);