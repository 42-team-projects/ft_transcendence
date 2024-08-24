import { convertTimeStampIntoDate } from "../../Utils/Convertor.js";
import { calculateTimeDifferents } from "../../Utils/DateUtils.js";
import { playerId } from "../../Utils/GlobalVariables.js";


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

export function createTournamentTable(mainContainer, data) {
    mainContainer.innerHTML = TABLEHEADER;
    const tbody = mainContainer.querySelector("tbody");
    for (let index = data.length - 1; index >= 0; index--)
        tbody.appendChild(createRow(data[index]));

}

export function createRow(data) {

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
