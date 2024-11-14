import { CustomAlert } from "/Components/Alert/CustomAlert.js";
import { get_tournaments_by_player_id, player_leave_tournament } from "/Components/Tournament/configs/TournamentAPIConfigs.js";
import { getCurrentPlayerId, wsUrl, HOST } from "/Utils/GlobalVariables.js";
import { Lobby } from "/Components/Game/GamePlay/Lobby.js";

let countdownInterval = -1;

let webSocketIdQueue = [];
let webSocketQueue = [];
let timeLeft = 0;


export function createTournamentWebSocket(tournament_id, data) {
    return new Promise((resolve, reject) => {
        const tournamentSocket = new WebSocket(`${wsUrl}tournament/` + tournament_id + '/');
        
        tournamentSocket.onopen = () => {
            resolve(tournamentSocket);  // Resolve the promise when the connection is opened
        };

        tournamentSocket.onmessage = async (e) => { 
            const lobby = document.querySelector("root-content #tournament_lobby");
            if (!lobby) {
                const response = await JSON.parse(e.data);
                displayAlert(response.message, data);
            }
        };

        tournamentSocket.onclose = () => {
            console.log('WebSocket connection of tournament closed'); 
        };

        tournamentSocket.onerror = (error) => {
            console.error('WebSocket tournament error:', error);
            reject(error);  // Reject the promise if there's an error
        };

        webSocketIdQueue.push(tournament_id);
        webSocketQueue.push(tournamentSocket);
    });
}



export async function createWebSocketsForTournaments() {
    const tournamentsAPIData = await get_tournaments_by_player_id();
    if (!tournamentsAPIData)
        return;
    for (let index = tournamentsAPIData.length - 1; index >= 0; index--)
    {
        if (!webSocketIdQueue.includes(tournamentsAPIData[index].tournament_id)) {
            initWebSocket(tournamentsAPIData[index]);
        }
    }
}

export async function initWebSocket(data) {

    if (!webSocketIdQueue.includes(data.tournament_id))
    {
        const ws = createTournamentWebSocket(data.tournament_id, data);
        webSocketIdQueue.push(data.tournament_id);
        webSocketQueue.push(ws);
    }
}

export async function closeWebSocket(socketId) {
    const index = webSocketIdQueue.indexOf(socketId);
    
    if (index !== -1) {
        const ws = webSocketQueue[index]; // Get the WebSocket at the index
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close(); // Close the WebSocket if it's open
            console.log("Disconnected from socket: ", socketId);
        } else {
            console.log("WebSocket already closed or invalid: ", socketId);
        }
        
        // Remove WebSocket and its ID from the respective queues
        webSocketIdQueue.splice(index, 1);
        webSocketQueue.splice(index, 1);
    } else {
        console.warn(`No WebSocket found for socketId: ${socketId}`);
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

 
let totalCountdownTime = 30;

 export async function countDownTimer(start_date, cDownContainer, tournament_id) {
    const currentDate = new Date();
     
    const parsedStartDate = new Date(start_date);
    // Calculate the difference in milliseconds
    const timeDifference = currentDate - parsedStartDate;
    // Convert the difference from milliseconds to seconds
    let timespent = Math.floor(timeDifference / 1000);
    timeLeft = totalCountdownTime - timespent;
    if (timeLeft < 0) {
        countdownInterval = -1;
        return ;
    }
    startCountdown(cDownContainer, tournament_id);
}

async function displayAlert(message, data) {
    data = await getTournamentData(data.tournament_id); // use uuid instead of primary id key

    const alertsConrtainer = window.document.querySelector("body .alerts");
    if (!alertsConrtainer)
        return;

    alertsConrtainer.style.display = "flex";
    const oldAlert = alertsConrtainer.querySelector(".id_" + data.tournament_id);
    if (oldAlert)
        oldAlert.remove();
    const customAlert = new CustomAlert();
    customAlert.className = "id_" + data.tournament_id;
    customAlert.innerHTML = `
        <h2 slot="header"> Tournament Alert</h2>
        <div slot="body" class="alert-footer">
            <h2> ${data.tournament_name} Tournament will start soon</h2>
            <h4> ${message} </h4>
            <h1 class="countDown"></h1>
        </div>
        <div slot="footer" class="alert-footer buttons">
            <custom-button id="playBtn" width="160px" height="48px" reverse>PLAY</custom-button>
            <custom-button id="cancelBtn" width="160px" height="48px" reverse>CANCEL</custom-button>
        </div>
    `;
    const start_date = await get_start_date(data.tournament_id);
    const cDownContainer = customAlert.querySelector(".countDown");
    countDownTimer(start_date, cDownContainer, data.tournament_id);
    if (countdownInterval == -1)
    {
        closeAndRemovePlayerFromTournament(data.tournament_id);
        customAlert.remove();
        alertsConrtainer.style.display = "none";
        alertsConrtainer.innerHTML = '';
    }

    customAlert.querySelector("#playBtn").addEventListener("click", async () => {
        const playerIds = data.players.map(player => player.id);
        const totalPlayers = playerIds.length;
        const pId = await getCurrentPlayerId();

        
        const opponentId = findOpponentId(pId, playerIds, totalPlayers);

        /* -------   start call nordine code here -------- */
        if (opponentId) {
            clearInterval(countdownInterval);
            const lobby = new Lobby(opponentId, timeLeft, data.tournament_id);
            lobby.id = "tournament_lobby";
            lobby.tournament_id = data.tournament_id;

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
    console.log("response of player leave tournament");
    try {
        console.log("response of player leave tournament 2 ");
        const res = await player_leave_tournament(tournament_id);
        console.log("response of player leave tournament: ", res);
        await closeWebSocket(tournament_id);
    } catch (error) {
        console.error('Error of player leave tournament: ', error);
    }
}

 export async function update_start_date(data, timeAppend) {
    try {
        const tournamentId = data.id;
        let now = new Date();
        now.setSeconds(now.getSeconds() + timeAppend);
        const start_date = now.toISOString().replace('T', ' ').substring(0, 19); // Converts to YYYY-MM-DD HH:MM:SS
        const Tournament = {
            tournamentId: tournamentId,
            start_date: start_date,
        }
        const response = await fetch(`${HOST}/tournament/SetStartDate/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Tournament),
        });
        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(`${response.status}  ${responseData.statusText}`);
        }
    } catch(error) {
        console.error('Error of update start date: ', error);
    }
}



async function get_start_date(tournamentId) {
    try {
        const response = await fetch(`${HOST}/tournament/${tournamentId}/`);
        if (!response.ok) {
            throw new Error(`${response.status}  ${response.statusText}`);
        }
        const data = await response.json();
        return data.start_date;
    } catch(error) {
        console.error('Error of tournament list: ', error);
    }
}


async function getTournamentData(tournament_id) {
    try {
        const response = await fetch(`${HOST}/tournament/${tournament_id}/`);
        if (!response.ok) {
            throw new Error(`${response.status}  ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch(error) {
        console.error('Error of tournament list: ', error);
    }
}

function findOpponentId(playerId, playerIds, totalPlayers)
{
    const pairing_sum = totalPlayers - 1;
    const index = playerIds.indexOf(playerId);
    if (index === -1) return null; // Player ID not found in the list
    // Calculate the index for the opponent
    const opponentIndex = pairing_sum - index; // Subtract 1 for zero-based index
    return playerIds[opponentIndex];
}


function startCountdown(cDownContainer, tournament_id) {
    if (countdownInterval)
        clearInterval(countdownInterval);
    countdownInterval = setInterval(function() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        cDownContainer.innerHTML = `${minutes} : ${seconds < 10 ? '0' + seconds : seconds}`;

        if (timeLeft <= 10) {
            const alertsConrtainer = window.document.querySelector("body .alerts");
            if (alertsConrtainer)
                alertsConrtainer.style.display = "flex";
        }

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = -1;
            closeAndRemovePlayerFromTournament(tournament_id);
            const alertsConrtainer = window.document.querySelector("body .alerts");
            if (alertsConrtainer) {
                alertsConrtainer.style.display = "none";
                alertsConrtainer.innerHTML = '';
            }
        }
        timeLeft--;
    }, 1000);
}
