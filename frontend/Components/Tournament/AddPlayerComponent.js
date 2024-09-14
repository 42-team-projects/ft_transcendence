import { HOST, PROFILE_API_URL } from "/Utils/GlobalVariables.js";
import { getApiData } from "/Utils/APIManager.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";
import { getNotificationWebSocket } from "/Utils/GlobalVariables.js";

let players;

export class AddPlayerComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
        `;
  }

  createItem(userId, profileImage, userName, isActive, leagueColor) {
    const container = document.createElement("div");
    container.className = "friend-item";
    container.innerHTML = `
        <c-hexagon class="profile" width="78px" height="77px" apply="true" bcolor="${leagueColor}">
            <div slot="content" class="c-hexagon-content"></div>
        </c-hexagon>
        <div class="text-content">
            <h1>${userName}</h1>
            <h6>${isActive == true ? "online" : "offline"}</h6>
        </div>
        <img loading="lazy" class="sendRequest" src="/assets/images/profile/add-friends-icon.svg"/>
    `;


    const sendRequest = container.querySelector(".sendRequest");
    sendRequest.addEventListener("click", async () => {
        // put here the logic of sending Request to the backend service.
        const websocket = await getNotificationWebSocket();
        console.log("this.tournamentId : ", this.tournamentId);
        websocket.send(JSON.stringify({'message': 'ask you to join a tournament', 'receiver': userId, 'is_signal': false, 'type': "tournament", "infos": this.tournamentId}));
        sendRequest.src = "/assets/icons/success-circle.svg";
    });


    container.querySelector(".c-hexagon-content").style.background = "url(" + profileImage + ") center / cover no-repeat";
    return container;
  }

  async connectedCallback() {

    if (!players)
        players = await getApiData(PROFILE_API_URL);
    if (!players)
        return ;
    Array.from(players).forEach(data => {
        this.shadowRoot.appendChild(this.createItem(data.user.id, HOST + data.user.avatar, data.user.username, data.active, getLeagueColor(data.stats.league)));
    });
  }

  set tournamentId(val) {
    this.setAttribute("tournament-id", val);
  }

  get tournamentId() {
    return this.getAttribute("tournament-id");
  }

}

const cssContent = /*css*/`

* {
    margin: 0;
    padding: 0;
}

:host {
    width: 86%;
    height: 100%;
    float: bottom;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: scroll;
}

.c-hexagon-content {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
}

.friend-item {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
}

.text-content {
    height: 100%;
    width: calc(100% - 130px);
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;  
}

.text-content h1 {
    font-size: 28px;
    width: 250px;
}
.text-content h6 {
    font-family: 'Sansation';
    margin: 3px 0;
}

.friend-item img {
    width: 32px;
    height: 32px;
}

:host::-webkit-scrollbar {
    opacity: 0.7;
    background-color: transparent;
    width: 1px;
}

:host::-webkit-scrollbar-track {
    opacity: 0.7;
    border-radius: 100px;
}

:host::-webkit-scrollbar-thumb {
    opacity: 0.7;
    background-color: aqua;
    border-radius: 100px;
}

`;

customElements.define("add-player-component", AddPlayerComponent);