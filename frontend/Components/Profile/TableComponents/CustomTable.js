import { getApiData } from "/Utils/APIManager.js";
import { DateComponent } from "/Components/Profile/TableComponents/BodyComponents/Date/DateComponent.js";
import { HOST } from "/Utils/GlobalVariables.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";
import { DateFormater } from "/Utils/DateUtils.js";
import { router } from "/root/Router.js";

export class CustomTable extends HTMLElement {
    
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> 
                :host {
                    padding: 10px 0;
                    width: 100%;
                    height: 100%;
                    max-height: 600px;
                }

                tbody {
                    width: 100%;
                    height: 100%;
                    max-height: 500px;
                    overflow-y: scroll;
                }

            </style>
            <link href="/Components/Profile/TableComponents/CustomTable.css" rel="stylesheet"/>
            <div class="profile-data-stats-history">
                <table cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>USERNAME</th>
                            <th>PROFILE</th>
                            <th>TIME</th>
                            <th>SCORE</th>
                            <th>RESULT</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        `;
    }

    createNewRow(gameData) {
        const playerData = gameData.opponent_player;
        const date = DateFormater(gameData.time);
        const row = document.createElement("tr");
        if (gameData.result.toLowerCase() === "lose")
            row.style.backgroundImage = "linear-gradient(to right, #D22C2250 , #D22C2210)";
        row.innerHTML = `
            <td>
                <date-component day="${date.day}" month="${date.month}"></date-component>
            </td>
            <td>
                <div class="profile-container">
                    <c-hexagon width="55px" height="55px" apply="true" bcolor="${getLeagueColor(playerData.stats.league)}">
                        <img slot="content" draggable="false" src="${HOST + playerData.user.avatar}" width="55px" height="55px"></img>
                    </c-hexagon>
                </div>
            </td>
            <td>
                <p>${playerData.user.username}</p>
            </td>
            <td>
                <p class="table-time">${date.time} HOURS AGO</p>
            </td>
            <td>
                <p class="score">${gameData.player_score} - ${gameData.opponent_score}</p>
            </td>
            <td>
                <p class="resulte">YOU ${gameData.result.toUpperCase()}</p>
            </td>
        `;

        row.querySelector(".profile-container").addEventListener("click", () => {
            const url = new URL(HOST + "/Profile/" + playerData.user.username + "/");
            router.handleRoute(url.pathname);
        });
        return row;
    }

    async getTableBody() {
        const tableBody = this.shadowRoot.querySelector("tbody");
        if (!this.username || this.username === undefined)
            return ;
        const gameHistoryData = await getApiData(HOST + "/game/game_history/" + this.username);
        if (!gameHistoryData)
            return ;

        Array.from(gameHistoryData).forEach(item => {
            tableBody.appendChild(this.createNewRow(item));
        })
    }

    connectedCallback() {
    }


    set username(val) {
        this.setAttribute("username", val);
    }

    get username() {
        return this.getAttribute("username");
    }

    static observedAttributes = ["username"];

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "username")
            this.getTableBody();
    }

}

customElements.define("custom-table", CustomTable);
