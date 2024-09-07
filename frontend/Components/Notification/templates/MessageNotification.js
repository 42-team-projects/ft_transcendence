import { HOST } from "/Utils/APIUrls.js";
import { getCurrentPlayerData } from "/Utils/GlobalVariables.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";

export class MessageNotification extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="mainContainer">
                <div class="message"></div>
                <div class="notification-actions">
                    <img src="/assets/icons/arrow-forward-icon.svg" class="read-message"></img>
                </div>
            </div>
        `;
    }

    async connectedCallback() {
        const message = this.querySelector(".message");
        const currentPlayerData = await getCurrentPlayerData();
        message.innerHTML = `
            <c-hexagon class="online" width="56px" height="55px" apply="true" bcolor="${getLeagueColor(currentPlayerData.stats.league)}" >
                <div class="profile-icon" slot="content" style="background: url(${HOST + currentPlayerData.user.avatar}) center center / cover no-repeat; width:100%; height:100%;"></div>
            </c-hexagon>
            <h4>${currentPlayerData.user.username} <i>sent you a new message</i></h4>
        `;
    }
}

customElements.define("message-notification", MessageNotification);