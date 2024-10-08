import { convertTimeStampIntoDate } from "/Utils/Convertor.js";
import { calculateTimeDifferents } from "/Utils/DateUtils.js";
import { closeWebSocket } from "/Utils/TournamentWebSocketManager.js";
import { get_tournament_by_id, player_leave_tournament } from "/Components/Tournament/configs/TournamentAPIConfigs.js";
import { getCurrentPlayerId, HOST, PROFILE_API_URL } from "/Utils/GlobalVariables.js";
import { router } from "/root/Router.js";
import { getApiData } from "/Utils/APIManager.js";


const TABLEHEADER = `
<table cellspacing="0" cellpadding="0">
    <thead>
        <tr>
            <th>NAME</th>
            <th>NICKNAME</th>
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

export async function createTournamentTable(parentNode, mainContainer, data) {
    mainContainer.innerHTML = TABLEHEADER;
    const tbody = mainContainer.querySelector("tbody");
    for (let index = data.length - 1; index >= 0; index--)
    {
        const row = await createRow(parentNode, data[index]);
        tbody.appendChild(row);
    }
}

export async function createRow(parentNode, data) {

    const tr = document.createElement("tr");
    tr.id = data.id;
    {
        const td = document.createElement("td");
        td.textContent = data.tournament_name;
        tr.appendChild(td);
    }
    {
        const td = document.createElement("td");
        const nickname = await getApiData(PROFILE_API_URL + "getNickname/" + data.tournament_id + "/");
        if (nickname)
            td.textContent = nickname.nickname;
        tr.appendChild(td);
    }
    {
        const td = document.createElement("td");
        td.textContent = "unknown";
        td.textContent = data.owner.user.username;
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
        exitButton.src = "/images/logout.svg";
        exitButton.width = 24;
        exitButton.addEventListener("click", async () => {
            await player_leave_tournament(data.tournament_id);
            closeWebSocket(data.tournament_id);
            tr.remove();
        });

        const displayButton = document.createElement("img");
        displayButton.id = data.id;
        displayButton.className = "displayAction";
        displayButton.src = "/assets/images/profile/play-button.svg";
        displayButton.width = 24;
        displayButton.addEventListener("click", async () => {
            parentNode.innerHTML = '';
            const response = await get_tournament_by_id(data.tournament_id);
            if (!response)
                throw new Error(`${response.status}  ${response.statusText}`);
            const url = new URL(HOST + "/Tournament/" + response.tournament_id);
            router.handleRoute(url.pathname);
        });

        const actionsContainer = document.createElement("div");
        actionsContainer.className = "actions";
        const currentPlayerId = await getCurrentPlayerId();
        if (data.owner.id != currentPlayerId)
            actionsContainer.appendChild(exitButton);

        actionsContainer.appendChild(displayButton);

        actions.appendChild(actionsContainer);

        tr.appendChild(actions);
    }
    return tr;
}
