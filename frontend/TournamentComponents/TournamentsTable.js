import { convertTimeStampIntoDate } from "../Utils/Convertor.js";

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
                        <img src="./images/logout.svg" width="24"/>
                        <img src="./assets/profile-assets/play-button.svg" width="24"/>
                    </div>
                `;
            tr.appendChild(actions);
        }
        return tr;
    }

    async get_tournaments_by_player_id() {
        try {
            const player = "player/"
            const playerId = JSON.parse(localStorage.getItem('loggedInUser')).id;
            const response = await fetch(`${apiUrl}${player}${playerId}/`);
            if (!response.ok) {
                return null;
            }
            const data = await response.json();
            console.log(JSON.stringify(data, null, 2));
            return data;
        } catch (error) {
            console.error('Error of tournament list: ', error);
            return null;
        }
    }

    async connectedCallback() {
        const APIData = await this.get_tournaments_by_player_id();
        if (!APIData)
            return;
        const tbody = this.shadowRoot.querySelector("tbody");

        APIData.forEach(data => tbody.appendChild(this.createRow(data)));
    }

    disconnectedCallback() {
    }

}

const apiUrl = 'http://127.0.0.1:8000/TournamentApp/';