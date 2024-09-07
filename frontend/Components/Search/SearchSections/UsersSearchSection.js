import { HOST } from "/Utils/APIUrls.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";
import { ProfileComponent } from "/Components/Profile/ProfileComponent.js";

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
                <img id="chat" src="/assets/icons/chat-icon.svg" class="read-message" width="24px" height="24px"></img>
                <img id="play-game" src="/assets/icons/manette-icon.svg" class="read-message" width="24px" height="24px"></img>
                <img id="show-profile" src="/assets/icons/account-icon.svg" class="read-message" width="24px" height="24px"></img>
            </div>
        `;

        const chat = item.querySelector("#chat");
        const playGame = item.querySelector("#play-game");
        const showProfile = item.querySelector("#show-profile");
        showProfile.addEventListener("click", e => {
            const rootContent = document.querySelector("root-content");
            if (!rootContent)
                return;
            rootContent.innerHTML = ``;
            const profile = document.createElement("profile-component");
            profile.username = playerData.user.username;
            rootContent.appendChild(profile);
        });

        playGame.addEventListener("click", () => {
            
        });

        chat.addEventListener("click", () => {
            
        });
        return item;
    }

}

customElements.define("users-search-section", UsersSearchSection);