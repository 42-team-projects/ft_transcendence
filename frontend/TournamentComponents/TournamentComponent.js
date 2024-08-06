import { apiUrl, playerId } from "../Utils/GlobalVariables.js";
import { GenerateRounds } from "./GenerateRounds.js";

export class TournamentComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <page-name width="23%">
                <h2 slot="text">TOURNAMENTS LIST</h2>
            </page-name>
            <div style="height:62px; width:100%;"></div>

            <div class="mainContainer"></div>

            <div class="tournament-actions">
                <custom-button id="firstButton" width="300px">
                    <h3>JOIN TOURNAMENT</h3>
                </custom-button>
                <custom-button id="secondButton" width="300px" background-color="#0C9BA3" reverse>
                    <h3>CREATE TOURNAMENT</h3>
                </custom-button>
            </div>

        `;
    }

    async connectedCallback() {
        const mainContainer = this.shadowRoot.querySelector(".mainContainer");
        let tournamentsTable = document.createElement("tournaments-table");
        tournamentsTable.style.width = "100%";
        mainContainer.appendChild(tournamentsTable);
        const firstButton = this.shadowRoot.getElementById("firstButton");
        const secondButton = this.shadowRoot.getElementById("secondButton");
        firstButton.addEventListener("click", () => {
            const buttonValue = firstButton.querySelector("h3");
            if (buttonValue.textContent == "CANCEL") {
                mainContainer.innerHTML = '';
                tournamentsTable = document.createElement("tournaments-table");
                tournamentsTable.style.width = "100%";
                mainContainer.appendChild(tournamentsTable);
                buttonValue.textContent = "JOIN TOURNAMENT";
                secondButton.querySelector("h3").textContent = "CREATE TOURNAMENT";
            }
            else {
            }
        });
        secondButton.addEventListener("click", async () => {
            const buttonValue = secondButton.querySelector("h3");
            if (buttonValue.textContent == "GENERATE") {
                const data = this.shadowRoot.querySelector("create-tournament").data;
                if (data)
                {
                    try {
                        const response = await this.createTournament(data);
                        if (!response)
                            throw new Error(`${response.status}  ${response.statusText}`);
                        const tournamentResponse = await response.tournament;
                        const rounds = document.createElement("generate-rounds");
                        rounds.numberOfPlayers = tournamentResponse.number_of_players;
                        rounds.players = tournamentResponse.players;
                        mainContainer.innerHTML = '';
                        mainContainer.appendChild(rounds);
                    } catch (error) {
                        console.log(error);
                    }
                }
                else
                    console.log("Please fill all inputs field!!");
            }
            else
            {
                mainContainer.innerHTML = '';
                mainContainer.appendChild(document.createElement("create-tournament"));
                buttonValue.textContent = "GENERATE";
                firstButton.querySelector("h3").textContent = "CANCEL";
            }
        });
    }

    disconnectedCallback() {

    }

    static observedAttributes = [];

    attributeChangedCallback(attrName, oldVdalue, newValue) {

    }


    async createTournament(data)
    {
        try {
            const Tournament = {
                tournament_name: data.name,
                number_of_players: data.num_players,
                is_accessible: data.access.toLowerCase() == "public" ? true : false,
                access_password: data.password
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
        } catch(error) {
            console.error('Error creating Tournament: ', error);
        }
    }
}

const cssContent = /*css*/`
    :host {
        font-family: 'Sansation Bold', 'Sansation';
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        padding-top: 80px;
        background-color: #d9d9d920;
        color: white;
    }

    .mainContainer {
        display: flex;
        width: 100%;
        height: calc(100% - 60px);
        overflow-y: scroll;
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

    .qrcode-section {
        flex: 1;
        height: 100%;
        background: #ffffff40;
    }

    .rounds,
    .final {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .final {
        flex-direction: row;
        gap: 20px;
    }

    .rounds > tournament-round > div {
        display: flex;
        width: 100%;
        height: 100%;
        max-width: 200px;
        align-items: center;
        justify-content: center;
        gap: 10px;
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

`;
