import { CustomAlert } from "../Tournament/CustomAlert.js";
import { get_tournaments_by_player_id } from "../Tournament/configs/TournamentAPIConfigs.js";
import { apiUrl, wsUrl } from "./GlobalVariables.js";

let webSocketIdQueue = [];
let webSocketQueue = [];

export async function createWebSocketsForTournaments() {
    const tournamentsAPIData = await get_tournaments_by_player_id();
    if (!tournamentsAPIData)
        return;
    for (let index = tournamentsAPIData.length - 1; index >= 0; index--)
    {
        console.log("tournamentsAPIData[index].tournament_id : ", tournamentsAPIData[index].tournament_id);
        if (!webSocketIdQueue.includes(tournamentsAPIData[index].tournament_id))
        {
            const ws = useWebsocket(tournamentsAPIData[index]);
            webSocketIdQueue.push(tournamentsAPIData[index].tournament_id);
            webSocketQueue.push(ws);
        }
    }
}

export async function initWebSocket(data) {

    if (!webSocketIdQueue.includes(data.tournament_id))
    {
        const ws = useWebsocket(data);
        webSocketIdQueue.push(data.tournament_id);
        webSocketQueue.push(ws);
    }
}

export async function closeWebSocket(socketId) {
    const index = webSocketIdQueue.indexOf(socketId);
    if (index != -1)
    {
        webSocketIdQueue.splice(index, 1);
        webSocketQueue[index].close();
        webSocketQueue.splice(index, 1);
        console.log(webSocketQueue);
    }
}

export function useWebsocket(data) {
    // TODO: Tournament Alert
    const tournament_id = data.tournament_id;
    const tournamentSocket = new WebSocket(`${wsUrl}tournament/` + tournament_id + '/');
    tournamentSocket.onopen = async () => {
        console.log('WebSocket connection of Tournament is opened');
        if(data.number_of_players == data.players.length)
        {
            // await update_start_date(data);
            console.log(data.tournament_name);
            tournamentSocket.send(JSON.stringify({'type': 'play_cancel','message': 'Tournament is starting in 2 minutes'}));
        }
    };
    tournamentSocket.onmessage = (e) => {
        const response = JSON.parse(e.data);
        const alertsConrtainer = window.document.querySelector("body .alerts");
        alertsConrtainer.style.display = "flex";
        if (!alertsConrtainer.querySelector(".id_" + data.tournament_id))
        {
            const alert = new CustomAlert();
            alert.className = "id_" + data.tournament_id;
            alert.innerHTML = `
                <h2 slot="header"> Tournament Alert</h2>
                <h2 slot="body"> ${data.tournament_name} Tournament will start soon</h2>
                <div slot="footer" class="alert-footer">
                    <custom-button id="playBtn" width="160px" height="48px" reverse>PLAY</custom-button>
                    <custom-button id="cancelBtn" width="160px" height="48px" reverse>CANCEL</custom-button>
                </div>
            `;
            // alert.querySelector("#cancelBtn").addEventListener("click", async function() {
            //     alert("You have canceled your participation in the tournament.");
            
            //     try {
            //         const response = await fetch(`${httpUrl}tournament/${data.tournament_id}/player/${id}/leave/`, {
            //             method: 'POST'
            //         });
            //         if (!response.ok) {
            //             const responseData = await response.json();
            //             console.log(JSON.stringify(responseData, null, 2));
            //             throw new Error(`${response.status}  ${responseData.statusText}`);
            //         }
            
            //         // Close the WebSocket connection
            //         closeWebSocket(data.tournament_id)
            
            //     } catch (error) {
            //         console.error('Error of player leave tournament: ', error);
            //     }
            // });
            alertsConrtainer.appendChild(alert);
        }
        console.log("tournamentSocket.onmessage.data : ", response);

    };
    tournamentSocket.onclose = () => {
        console.log('WebSocket connection of tournament closed');
    };
    tournamentSocket.onerror = (error) => {
        console.error('WebSocket tournament error:', error);
    };
    return tournamentSocket;
}

//  export async function update_start_date(data) {
//     try {
//         const tournamentId = data.tournament_id;
//         const now = new Date();
//         // console.log(now);
//         // console.log("\n===\n");
//         const start_date = now.toISOString().replace('T', ' ').substring(0, 19); // Converts to YYYY-MM-DD HH:MM:SS
//         // console.log(start_date);
//         const Tournament = {
//             tournamentId : tournamentId,
//             start_date : start_date,
//         }
//         const response = await fetch(`${apiUrl}SetStartDate/`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(Tournament),
//         });
//         if (!response.ok) {
//             const data = await response.json();
//             console.log(JSON.stringify(data, null, 2));
//             throw new Error(`${response.status}  ${data.statusText}`);
//         }
//         // const data = await response.json();
//         // console.log(JSON.stringify(data, null, 2));
//     } catch(error) {
//         console.error('Error of update start date: ', error);
//     }
// }
