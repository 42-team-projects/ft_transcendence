import { convertTimeStampIntoDate } from "../Utils/Convertor.js";
import { calculateTimeDifferents } from "../Utils/DateUtils.js";
import { apiUrl, playerId, wsUrl } from "../Utils/GlobalVariables.js";
import { TournamentAlert } from "./configs/TournamentAlert.js";

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


    useWebsocket(data) {
        const tournament_id = data.tournament_id;
        const tournamentSocket = new WebSocket(`${wsUrl}tournament/` + tournament_id + '/');
        tournamentSocket.onopen = async () => {
            console.log('WebSocket connection of Tournament is opened');
            console.log(data);
            if(data.number_of_players == data.players.length)
            {
                await this.update_start_date(data);
                console.log(data.tournament_name);
                tournamentSocket.send(JSON.stringify({'type': 'play_cancel','message': 'Tournament is starting in 2 minutes'}));
            }
        };
        tournamentSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            const tournamentAlert = window.document.querySelector("body");
            if (!window.document.querySelector("body tournament-alert"))
                tournamentAlert.appendChild(new TournamentAlert());
            console.log("tournamentSocket.onmessage.data : ", data);
            // const mainContainer = this.querySelector(".mainContainer");
            // mainContainer.innerHTML = `<tournament-alert></tournament-alert>`
            // TODO: Tournament Alert
            // showTournamentModal();

        };
        tournamentSocket.onclose = function () {
            console.log('WebSocket connection of tournament closed');
        };
        tournamentSocket.onerror = (error) => {
            console.error('WebSocket tournament error:', error);
        };
    }

    async  update_start_date(data) {
        try {
            const tournamentId = data.tournament_id;
            const now = new Date();
            // console.log(now);
            // console.log("\n===\n");
            const start_date = now.toISOString().replace('T', ' ').substring(0, 19); // Converts to YYYY-MM-DD HH:MM:SS
            // console.log(start_date);
            const Tournament = {
                tournamentId : tournamentId,
                start_date : start_date,
            }
            const response = await fetch(`${apiUrl}SetStartDate/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Tournament),
            });
            if (!response.ok) {
                const data = await response.json();
                console.log(JSON.stringify(data, null, 2));
                throw new Error(`${response.status}  ${data.statusText}`);
            }
            // const data = await response.json();
            // console.log(JSON.stringify(data, null, 2));
        } catch(error) {
            console.error('Error of update start date: ', error);
        }
    }

    createRow(data) {

        this.useWebsocket(data);

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
                this.player_leave_tournament(data.id);
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
                const response = await this.get_tournament_by_id(data.id);
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

    async get_tournaments_by_player_id() {
        try {
            const player = "player/";
            const response = await fetch(`${apiUrl}${player}${playerId}/`);
            if (!response.ok) {
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error('Error of tournament list: ', error);
            return null;
        }
    }

    async createTournament(data) {
        try {
            const Tournament = {
                tournament_name: data.name,
                number_of_players: data.num_players,
                is_accessible: data.access.toLowerCase() == "public" ? true : false,
                access_password: data.password,
                owner: null

            }
            const create_tournament = "create/player/";
            const response = await fetch(`${apiUrl}${create_tournament}${playerId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Tournament),
            });
            if (!response.ok)
                throw new Error(`${response.status}  ${response.statusText}`);
            return await response.json();
        } catch (error) {
            console.error('Error creating Tournament: ', error);
        }
    }

    async createTournamentTable() {
        const tournamentsAPIData = await this.get_tournaments_by_player_id();
        if (!tournamentsAPIData)
            return;
        let numberOfTournament = tournamentsAPIData.length;
        const tbody = this.querySelector("tbody");

        for (let index = tournamentsAPIData.length - 1; index >= 0; index--)
            tbody.appendChild(this.createRow(tournamentsAPIData[index]));

        const deadlineTimeNodes = tbody.querySelectorAll(".deadLineTime");
        const unfinishedTournament = Array.from(deadlineTimeNodes).filter((time) => time.textContent !== "finished");

        this.dateInterval = setInterval(async () => {
            numberOfTournament = await this.updateTournamentsTable(Number(numberOfTournament), tbody);
            // console.log("setInterval function: ", numberOfTournament);
            unfinishedTournament.forEach((time) => {
                time.textContent = calculateTimeDifferents(time.dataset.createdAt);
            });
        }, 1000);
    }

    async updateTournamentsTable(numberOfTournament, tbody) {
        const tmpTournamentsAPIData = await this.get_tournaments_by_player_id();
        const tournamentsCount = tmpTournamentsAPIData.length;
        if (tmpTournamentsAPIData && Number(numberOfTournament) < Number(tournamentsCount)) {
            const rest = tournamentsCount - numberOfTournament;
            for (let index = 0; index < rest; index++)
                tbody.prepend(this.createRow(tmpTournamentsAPIData.pop()));
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
                        console.log("data : ", data);
                        const response = await this.createTournament(data);
                        if (!response)
                            throw new Error(`${response.status}  ${response.statusText}`);
                        const tournamentResponse = await response.tournament;
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

    async player_leave_tournament(tournamentId) {
        try {
            const response = await fetch(`${apiUrl}tournament/${tournamentId}/player/${playerId}/leave/`, {
                method: 'POST'
            });
            if (!response.ok) {
                const data = await response.json();
                console.log(JSON.stringify(data, null, 2));
                throw new Error(`${response.status}  ${data.statusText}`);
            }
            const data = await response.json();
            console.log(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error of player leave tournament: ', error);
        }
    }

    async get_tournament_by_id(id) {
        try {
            const response = await fetch(`${apiUrl}${id}`);
            if (!response.ok) {
                throw new Error(`${response.status}  ${response.statusText}`);
            }
            return await response.json();
        } catch(error) {
            console.error('Error of tournament list: ', error);
        }
    }
}

customElements.define('tournaments-table', TournamentsTable);
