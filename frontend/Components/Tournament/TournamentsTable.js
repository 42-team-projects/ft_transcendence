import { calculateTimeDifferents } from "../../Utils/DateUtils.js";
import { apiUrl } from "../../Utils/GlobalVariables.js";
import { playerId } from "../../root/Router.js";
import { createTournament, get_tournament_by_id, get_tournaments_by_player_id, player_leave_tournament } from "./configs/TournamentAPIConfigs.js";
import { CustomButton } from "./CustomButton.js";
import { JoinTournament } from "./JoinTournament.js";
import { CreateTournament } from "./CreateTournament.js";
import { GenerateRounds } from "./GenerateRounds.js";
import { closeWebSocket, initWebSocket } from "../../Utils/TournamentWebSocketManager.js";
import { createTournamentTable } from "./configs/TournamentUtils.js";


export class TournamentsTable extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="sss">
                <div class="mainContainer"></div>

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

    async connectedCallback() {
        const tournamentsAPIData = await get_tournaments_by_player_id();
        // const tournamentsAPIData =  null;
        if (!tournamentsAPIData)
            return;
        const mainContainer = this.querySelector(".mainContainer");
        createTournamentTable(this, mainContainer, tournamentsAPIData);

        const firstButton = this.querySelector("#firstButton");
        const secondButton = this.querySelector("#secondButton");
        firstButton.addEventListener("click", () => {
            const buttonValue = firstButton.querySelector("h3");
            if (buttonValue.textContent == "CANCEL") {
                createTournamentTable(this, mainContainer, tournamentsAPIData);
                buttonValue.textContent = "JOIN TOURNAMENT";
                secondButton.querySelector("h3").textContent = "CREATE TOURNAMENT";
            } else {
                let joinTournament = document.createElement("join-tournament");
                joinTournament.id = "joinTournament";
                this.appendChild(joinTournament);
            }
        });
        
        secondButton.addEventListener("click", async () => {
            const buttonValue = secondButton.querySelector("h3");
            if (buttonValue.textContent == "GENERATE") {
                const data = this.querySelector("create-tournament").data;
                if (data) {
                    try {
                        const response = await createTournament(data);
                        if (!response)
                            throw new Error(`${response.status}  ${response.statusText}`);
                        const tournamentResponse = await response.tournament;
                        await initWebSocket(tournamentResponse);
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


    disconnectedCallback() {
    }

}

customElements.define('tournaments-table', TournamentsTable);


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
