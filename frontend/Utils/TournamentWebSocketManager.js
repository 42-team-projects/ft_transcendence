import { CustomAlert } from "/Components/Alert/CustomAlert.js";
import { get_tournaments_by_player_id, player_leave_tournament } from "/Components/Tournament/configs/TournamentAPIConfigs.js";
import { apiUrl, getCurrentPlayerData, getCurrentPlayerId, wsUrl } from "/Utils/GlobalVariables.js";
import { Lobby } from "/Components/Game/GamePlay/Lobby.js";

let countdownInterval = -1;

let webSocketIdQueue = [];
let webSocketQueue = [];
let timeLeft = 0;

export async function createWebSocketsForTournaments() {
    const tournamentsAPIData = await get_tournaments_by_player_id();
    // console.log("tournamentsAPIData: ", tournamentsAPIData);
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
        console.log("disconnected from socket: ", socketId);
        webSocketQueue.splice(index, 1);
    }
}


export function getWebSocketByTournamentId(tournament_id) {
    if (webSocketIdQueue.includes(tournament_id))
    {
        const index = webSocketIdQueue.indexOf(tournament_id);
        return webSocketQueue[index];
    }
    return null;
}

 // 2 minutes in seconds

 
let totalCountdownTime = 30;

 export async function countDownTimer(start_date, cDownContainer) {
    const currentDate = new Date();
     
    const parsedStartDate = new Date(start_date);
    // Calculate the difference in milliseconds
    const timeDifference = currentDate - parsedStartDate;
    console.log("Current date:", currentDate);
    console.log("parsedStartDate date:", parsedStartDate);
    // Convert the difference from milliseconds to seconds
    let timespent = Math.floor(timeDifference / 1000);
    console.log("\ntimespent:    ", timespent);
    // 60  + 10
    timeLeft = totalCountdownTime - timespent;
    console.log("\ntimeLeft ===>    ", timeLeft);
    if (timeLeft < 0) {
        countdownInterval = -1;
        return ;
    }
    startCountdown(cDownContainer);
}

async function displayAlert(e, data) {
    const response = await JSON.parse(e.data);
    data = await getTournamentData(data.tournament_id); // use uuid instead of primary id key
    
    // console.log("tournamentSocket.onmessage.data : ", response);

    const alertsConrtainer = window.document.querySelector("body .alerts");
    alertsConrtainer.style.display = "flex";
    const oldAlert = alertsConrtainer.querySelector(".id_" + data.tournament_id);
    if (oldAlert)
        oldAlert.remove();
    console.log("\nhelloo test\n");
    const customAlert = new CustomAlert();
    customAlert.className = "id_" + data.tournament_id;
    customAlert.innerHTML = `
    <h2 slot="header"> Tournament Alert</h2>
    <div slot="body" class="alert-footer">
    <h2> ${data.tournament_name} Tournament will start soon</h2>
    <h4> ${response.message} </h4>
    <h1 class="countDown"></h1>
    </div>
    <div slot="footer" class="alert-footer buttons">
    <custom-button id="playBtn" width="160px" height="48px" reverse>PLAY</custom-button>
    <custom-button id="cancelBtn" width="160px" height="48px" reverse>CANCEL</custom-button>
    </div>
    `;
    const start_date = await get_start_date(data.tournament_id);
    console.log("data: ", data);
    console.log("start_date: ", start_date);
    const cDownContainer = customAlert.querySelector(".countDown");
    countDownTimer(start_date, cDownContainer);
    console.log("countdownInterval: ", countdownInterval);
    if (countdownInterval == -1)
    {
        closeAndRemovePlayerFromTournament(data.tournament_id);
        customAlert.remove();
        alertsConrtainer.style.display = "none";
        alertsConrtainer.innerHTML = '';
    }
    // let timeLeft = await countDownTimer(start_date);
    customAlert.querySelector("#playBtn").addEventListener("click", async () => {
        // console.log("\ntimeLeft in playBtn ===>    ", timeLeft);
        // console.log("\ndata ==>  ", data);
        const playerIds = data.players.map(player => player.id);
        // console.log("\nplayerIds ==> ", playerIds);
        const totalPlayers = playerIds.length;
        const pId = await getCurrentPlayerId();
        // console.log("\npId ==> ", pId);

        
        const opponentId = findOpponentId(pId, playerIds, totalPlayers);
        // console.log("opponentId:    ", opponentId);
        // console.log("playertId:    ", pId);

        /* -------   start call nordine code here -------- */
        if (opponentId) {
            // closeWebSocket(data.tournament_id); // new
            clearInterval(countdownInterval);

            console.log("\n============\n");
            console.log("\nplayerID:     ", pId, "opponentId:    ", opponentId);
            console.log("\n============\n");

            console.log("time ===> ", timeLeft);
            const lobby = new Lobby(opponentId, timeLeft);
            lobby.id = "tournament_lobby";
            lobby.tournament_id = data.tournament_id;
            document.body.querySelector('root-content').innerHTML = '';
            document.body.querySelector('root-content').appendChild(lobby);

            alertsConrtainer.innerHTML = '';
            alertsConrtainer.style.display = "none";
        } else {
            console.log('No opponent found or already paired.');
        }
        /* -------  end  call nordine code here -------- */
    });
    
    
    customAlert.querySelector("#cancelBtn").addEventListener("click", async () => {
        if(confirm("You have canceled your participation in the tournament."))
        {
            closeAndRemovePlayerFromTournament(data.tournament_id);
            customAlert.remove();
            if (!alertsConrtainer.childElementCount)
                alertsConrtainer.remove();
        }
    });
    alertsConrtainer.appendChild(customAlert);
    
}


export async function closeAndRemovePlayerFromTournament(tournament_id) {
    try {
        await player_leave_tournament(tournament_id);
        // Close the WebSocket connection
        closeWebSocket(tournament_id);
    } catch (error) {
        console.error('Error of player leave tournament: ', error);
    }
}

/**
 * 
 * @author rida
 */

export async function CheckTournamentStages(data, tournamentSocket)
{
    if(data.number_of_players == data.players.length || !data.can_join)
    {
        let nextStage = false;
        if (data.number_of_players != data.players.length && data.number_of_players % data.players.length == 0)
            nextStage = true;
        await update_start_date(data, nextStage);
        tournamentSocket.send(JSON.stringify({'type': 'play_cancel', 'message': 'Tournament is starting in 2 minutes'}));
    }
}

export function useWebsocket(data) {
    // TODO: Tournament Alert
    const tournament_id = data.tournament_id;
    const tournamentSocket = new WebSocket(`${wsUrl}tournament/` + tournament_id + '/');
    tournamentSocket.onopen = async () => {
        console.log('WebSocket connection of Tournament is opened');
        await CheckTournamentStages(data, tournamentSocket);
    };

    tournamentSocket.onmessage = (e) => { 
        const lobby = document.querySelector("root-content #tournament_lobby");
        if (!lobby)
            displayAlert(e, data);
    };

    tournamentSocket.onclose = () => { console.log('WebSocket connection of tournament closed'); };

    tournamentSocket.onerror = (error) => {console.error('WebSocket tournament error:', error);};

    return tournamentSocket;
}

 export async function update_start_date(data, nextStage) {
    try {
        const tournamentId = data.id;
        const now = new Date();

        const start_date = now.toISOString().replace('T', ' ').substring(0, 19); // Converts to YYYY-MM-DD HH:MM:SS
        console.log("start_date: ", start_date);
        const Tournament = {
            tournamentId: tournamentId,
            start_date: start_date,
            next_stage: nextStage
        }
        const response = await fetch(`${apiUrl}SetStartDate/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Tournament),
        });
        if (!response.ok) {
            const responseData = await response.json();
            console.log(JSON.stringify(responseData, null, 2));
            throw new Error(`${response.status}  ${responseData.statusText}`);
        }
        // const responseData = await response.json();
        // console.log("responseData: ", responseData);
    } catch(error) {
        console.error('Error of update start date: ', error);
    }
}



async function get_start_date(tournamentId) {
    try {
        const response = await fetch(`${apiUrl}${tournamentId}/`);
        if (!response.ok) {
            throw new Error(`${response.status}  ${response.statusText}`);
        }
        const data = await response.json();
        // console.log(data.start_date);
        // console.log(JSON.stringify(data, null, 2));
        return data.start_date;
    } catch(error) {
        console.error('Error of tournament list: ', error);
    }
}


async function getTournamentData(tournament_id) {
    try {
        const response = await fetch(`${apiUrl}${tournament_id}/`);
        if (!response.ok) {
            throw new Error(`${response.status}  ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch(error) {
        console.error('Error of tournament list: ', error);
    }
}

// async function get_players_ids(tournament_id) {

//     const tournamentData = await getTournamentData(); // Function to get tournament data
//     console.log(JSON.stringify(tournamentData, null, 2));

//     const playerIds = tournamentData.players.map(player => player.id); // Extract sorted player IDs
//     console.log(playerIds);
//     return playerIds;
// }

function findOpponentId(playerId, playerIds, totalPlayers)
{
    // 3 - 1 => 2   | 2 => [1] ==> 2 - 1 = [1]
    console.log("\nplayerIds ==> ", playerIds);
    console.log("\ntotalPlayers ==> ", totalPlayers);
    console.log("\nplayerId ==> ", playerId);
    const pairing_sum = totalPlayers - 1;
    const index = playerIds.indexOf(playerId);
    if (index === -1) return null; // Player ID not found in the list
    // Calculate the index for the opponent
    const opponentIndex = pairing_sum - index; // Subtract 1 for zero-based index
    return playerIds[opponentIndex];
}


function startCountdown(cDownContainer) {
    if (countdownInterval)
        clearInterval(countdownInterval);
    countdownInterval = setInterval(function() {
        // console.log("timeLeft in startCountdown function: ", timeLeft);
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        cDownContainer.innerHTML = `${minutes} : ${seconds < 10 ? '0' + seconds : seconds}`;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = -1;
            const alertsConrtainer = window.document.querySelector("body .alerts");
            alertsConrtainer.style.display = "none";
            alertsConrtainer.innerHTML = '';
            // Add logic to start the tournament here
        }
        timeLeft--;
    }, 1000);
}
