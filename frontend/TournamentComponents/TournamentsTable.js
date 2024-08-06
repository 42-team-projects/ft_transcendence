import { convertTimeStampIntoDate } from "../Utils/Convertor.js";
import { apiUrl, playerId } from "../Utils/GlobalVariables.js";
import { TournamentComponent } from "./TournamentComponent.js";

const cssContent = /*css*/`
:host {
    
}

table {
    width: 100%;
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
    height: 100%;
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
    border-top: 0.1px solid #051d31;
}

.actions {
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: center;
}
`;


export class TournamentsTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <table cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>OWNER</th>
                        <th>BEGIN</th>
                        <th>NUMBER OF PLAYERS</th>
                        <th>STATE</th>
                        <th>ACCESS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
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
            if (data.players.length)
                td.textContent = data.players[0].username;
            else
                td.textContent = "unknown";
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
            td.textContent = "STARTED";
            tr.appendChild(td);
        }
        {
            const td = document.createElement("td");
            td.textContent = data.is_accessible ? "PUBLIC" : "PRIVATE";
            tr.appendChild(td);
        }
        {
            const actions = document.createElement("td");
            actions.innerHTML = `
                    <div class="actions">
                        <img id="${data.id}" class="exitAction" src="./images/logout.svg" width="24"/>
                        <img id="${data.id}" class="displayAction" src="./assets/profile-assets/play-button.svg" width="24"/>
                    </div>
                `;
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

    async connectedCallback() {
        const APIData = await this.get_tournaments_by_player_id();
        if (!APIData)
            return;
        console.log(APIData);
        const tbody = this.shadowRoot.querySelector("tbody");

        for (let index = APIData.length - 1; index >= 0; index--)
            tbody.appendChild(this.createRow(APIData[index]));

        const allDisplayAction = this.shadowRoot.querySelectorAll(".displayAction");
        allDisplayAction.forEach(elem => {
            elem.addEventListener("click", async () => {
                this.shadowRoot.innerHTML = '';
                const response = await get_tournament_by_id(elem.id);
                if (!response)
                    throw new Error(`${response.status}  ${response.statusText}`);
                this.shadowRoot.innerHTML = '';
                const rounds = document.createElement("generate-rounds");
                rounds.numberOfPlayers = response.number_of_players;
                rounds.players = response.players;
                this.shadowRoot.appendChild(rounds);
            });
        });
    }

    disconnectedCallback() {
    }

}

export async function get_tournament_by_id(id) {
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