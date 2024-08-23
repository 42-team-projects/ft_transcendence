import { convertTimeStampIntoDate } from "../Utils/Convertor.js";
import { calculateTimeDifferents } from "../Utils/DateUtils.js";
import { apiUrl, playerId, wsUrl } from "../Utils/GlobalVariables.js";
import { closeWebSocket, initWebSocket } from "../Utils/TournamentWebSocketManager.js";
import { get_tournaments_by_player_id, createTournament, player_leave_tournament, get_tournament_by_id } from "./configs/TournamentAPIConfigs.js";

const cssContent = /*css*/`
:host {
    width: 100%;
    height: 100%;
    position: relative;
}
.mainContainer {
    display: flex;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}

h2 {
    margin: 0;
}

.mainContainer::-webkit-scrollbar {
    opacity: 0.7;
    background-color: transparent;
    width: 2px;
}

.mainContainer::-webkit-scrollbar-track {
    opacity: 0.7;
    border-radius: 100px;
}

.mainContainer::-webkit-scrollbar-thumb {
    opacity: 0.7;
    background-color: aqua;
    border-radius: 100px;
}


table {
    width: 100%;
    height: min-content;
    font-size: 26px;
    color: white;
}


thead > tr {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    background-image: linear-gradient(to right, #24606e, #214251, #224655);
    width: 100%;
    height: 56px;
    font-size: 24px;
}

tbody {
    width: 100%;
}

tbody > tr {
    height: 64px;
    font-size: 22px;
    text-align: center;
    opacity: 0.6;
    background-color: #00fffc10;
}

td {
    height: 64px;
    border-top: 0.1px solid #051d31;
}

.actions {
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: center;
}


.tournament-actions {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    padding: 5px;
}

.settingsContainer {
    width: 100%;
    height: 100%;
    background: green;
    display: flex;
}
.settings-section {
    flex: 2;
    height: 100%;
    background: #cccc4040;
}

.c-hexagon-content {
    width: 100%;
    height: 100%;
}

h4 {
    max-width: 90px;
    overflow-x: scroll;
}

h4::-webkit-scrollbar {
    display: none;
}

.sss {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

`;

const TABLEHEADER = `
<table cellspacing="0" cellpadding="0">
    <thead>
        <tr>
            <th>NAME</th>
            <th>OWNER</th>
            <th>CREATED AT</th>
            <th>NUMBER OF PLAYERS</th>
            <th>DEADLINE</th>
            <th>ACCESS</th>
            <th>ACTIONS</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
`;

export class TournamentsTable extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="sss">
                <div class="mainContainer">
                    ${TABLEHEADER}
                </div>

                <div class="tournament-actions">
                    <custom-button id="firstButton" width="300px">
                        <h3>JOIN TOURNAMENT</h3>
                    </custom-button>
                    <custom-button id="secondButton" width="300px" background-color="#0C9BA3" reverse>
                        <h3>CREATE TOURNAMENT</h3>
                    </custom-button>
                </div>
            </div>
        `;
    }


    createRow(data) {

        const tr = document.createElement("tr");
        tr.id = data.id;
        {
            const td = document.createElement("td");
            td.textContent = data.tournament_name;
            tr.appendChild(td);
        }
        {
            const td = document.createElement("td");
            td.textContent = "unknown";
            td.textContent = data.owner.username;
            tr.appendChild(td);
        }
        {
            const td = document.createElement("td");
            td.textContent = convertTimeStampIntoDate(data.created_at);
            tr.appendChild(td);
        }
        {
            const td = document.createElement("td");
            td.textContent = data.players.length + " / " + data.number_of_players;
            tr.appendChild(td);
        }
        {
            const td = document.createElement("td");
            td.className = "deadLineTime";
            td.dataset.createdAt = data.created_at;
            td.textContent = calculateTimeDifferents(data.created_at);
            tr.appendChild(td);
        }
        {
            const td = document.createElement("td");
            td.textContent = data.is_accessible ? "PUBLIC" : "PRIVATE";
            tr.appendChild(td);
        }
        {
            const actions = document.createElement("td");

            const exitButton = document.createElement("img");
            exitButton.id = data.id;
            exitButton.className = "exitAction";
            exitButton.src = "./images/logout.svg";
            exitButton.width = 24;
            exitButton.addEventListener("click", async () => {
                player_leave_tournament(data.id);
                closeWebSocket(data.tournament_id);
                tr.remove();
            });

            const displayButton = document.createElement("img");
            displayButton.id = data.id;
            displayButton.className = "displayAction";
            displayButton.src = "./assets/profile-assets/play-button.svg";
            displayButton.width = 24;
            displayButton.addEventListener("click", async () => {
                clearInterval(this.dateInterval);
                this.innerHTML = '';
                const response = await get_tournament_by_id(data.id);
                if (!response)
                    throw new Error(`${response.status}  ${response.statusText}`);
                this.innerHTML = '';
                const rounds = document.createElement("generate-rounds");
                rounds.numberOfPlayers = response.number_of_players;
                rounds.players = response.players;
                this.appendChild(rounds);
            });

            const actionsContainer = document.createElement("div");
            actionsContainer.className = "actions";

            if (data.owner.id != playerId)
                actionsContainer.appendChild(exitButton);

            actionsContainer.appendChild(displayButton);

            actions.appendChild(actionsContainer);

            tr.appendChild(actions);
        }
        return tr;
    }

    async createTournamentTable() {
        const tournamentsAPIData = await get_tournaments_by_player_id();
        if (!tournamentsAPIData)
            return;
        let numberOfTournament = tournamentsAPIData.length;
        const tbody = this.querySelector("tbody");

        for (let index = tournamentsAPIData.length - 1; index >= 0; index--)
            tbody.appendChild(this.createRow(tournamentsAPIData[index]));

        const deadlineTimeNodes = tbody.querySelectorAll(".deadLineTime");
        const unfinishedTournament = Array.from(deadlineTimeNodes).filter((time) => time.textContent !== "finished");

        this.dateInterval = setInterval(async () => {
            numberOfTournament = await this.updateTournamentsTable(numberOfTournament, tbody);
            unfinishedTournament.forEach((time) => {
                time.textContent = calculateTimeDifferents(time.dataset.createdAt);
            });
        }, 1000);
    }

    async updateTournamentsTable(numberOfTournament, tbody) {
        const tmpTournamentsAPIData = await get_tournaments_by_player_id();
        const tournamentsCount = tmpTournamentsAPIData.length;
        if (tournamentsCount && Number(numberOfTournament) < Number(tournamentsCount)) {
            const rest = tournamentsCount - numberOfTournament;
            for (let index = 0; index < rest; index++)
            {
                const newData = tmpTournamentsAPIData.pop();
                tbody.prepend(this.createRow(newData));
                await initWebSocket(newData);
            }
        }
        return tournamentsCount;
    }

    async connectedCallback() {
        this.createTournamentTable();

        const mainContainer = this.querySelector(".mainContainer");
            const firstButton = this.querySelector("#firstButton");
            const secondButton = this.querySelector("#secondButton");
        firstButton.addEventListener("click", () => {
            const buttonValue = firstButton.querySelector("h3");
            if (buttonValue.textContent == "CANCEL") {
                mainContainer.innerHTML = TABLEHEADER;
                this.createTournamentTable();
                buttonValue.textContent = "JOIN TOURNAMENT";
                secondButton.querySelector("h3").textContent = "CREATE TOURNAMENT";
            } else {
                let joinTournament = document.createElement("join-tournament");
                joinTournament.id = "joinTournament";
                this.appendChild(joinTournament);
            }
        });
        secondButton.addEventListener("click", async () => {
            clearInterval(this.dateInterval);
            const buttonValue = secondButton.querySelector("h3");
            if (buttonValue.textContent == "GENERATE") {
                const data = this.querySelector("create-tournament").data;
                if (data) {
                    try {
                        const response = await createTournament(data);
                        if (!response)
                            throw new Error(`${response.status}  ${response.statusText}`);
                        const tournamentResponse = await response.tournament;
                        initWebSocket(tournamentResponse);
                        this.innerHTML = '';
                        const rounds = document.createElement("generate-rounds");
                        rounds.numberOfPlayers = tournamentResponse.number_of_players;
                        rounds.players = tournamentResponse.players;
                        this.appendChild(rounds);
                    } catch (error) {
                        console.log(error);
                    }
                } else
                    console.log("Please fill all inputs field!!");
            } else {
                mainContainer.innerHTML = '';
                mainContainer.appendChild(document.createElement("create-tournament"));
                buttonValue.textContent = "GENERATE";
                firstButton.querySelector("h3").textContent = "CANCEL";
            }
        });
    }

    dateInterval;

    disconnectedCallback() {
        clearInterval(this.dateInterval);
    }

}

customElements.define('tournaments-table', TournamentsTable);
