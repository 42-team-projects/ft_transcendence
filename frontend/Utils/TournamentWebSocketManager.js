import { CustomAlert } from "../Components/Alert/CustomAlert.js";
import { get_tournaments_by_player_id, player_leave_tournament } from "../Components/Tournament/configs/TournamentAPIConfigs.js";
import { apiUrl, getCurrentPlayerData, getCurrentPlayerId, wsUrl } from "./GlobalVariables.js";
import { Lobby } from "../Components/Game/GamePlay/Lobby.js";

let countdownInterval;

let webSocketIdQueue = [];
let webSocketQueue = [];
let timeLeft = 0;

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
        console.log("disconnected from socket: ", socketId);
        webSocketQueue.splice(index, 1);
    }
}

const totalCountdownTime = 10; // 2 minutes in seconds

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
    timeLeft = totalCountdownTime - timespent;
    console.log("\ntimeLeft ===>    ", timeLeft);
    startCountdown(cDownContainer);
}

async function displayAlert(e, data) {
    const response = JSON.parse(e.data);
    const alertsConrtainer = window.document.querySelector("body .alerts");
    alertsConrtainer.style.display = "flex";
    if (!alertsConrtainer.querySelector(".id_" + data.tournament_id))
    {
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
        const start_date = await get_start_date(data.id);
        console.log("data: ", data);
        console.log("start_date: ", start_date);
        const cDownContainer = customAlert.querySelector(".countDown");
        countDownTimer(start_date, cDownContainer);
        // let timeLeft = await countDownTimer(start_date);
        customAlert.querySelector("#playBtn").addEventListener("click", async () => {
            console.log("\ntimeLeft in playBtn ===>    ", timeLeft);
            // this.remove();
            // console.log(tournamentId);

            //
            // const playerIds = data.players;
            // const playerIds = await get_players_ids();
            console.log("\ndata ==>  ", data);
            const playerIds = data.players.map(player => player.id);
            console.log("\nplayerIds ==> ", playerIds);
            const totalPlayers = playerIds.length;
            const pId = await getCurrentPlayerId();
            console.log("\npId ==> ", pId);

            const opponentId = findOpponentId(pId, playerIds, totalPlayers);
            console.log("opponentId:    ", opponentId);
           
            if (opponentId) {
                clearInterval(countdownInterval);   
                console.log("playerID:     ", pId, "opponentId:    ", opponentId);
                // alert(`playerID:      ${playerId}   opponentId:     ${opponentId}`);
                console.log("time : ", timeLeft);
                const lobby = new Lobby(opponentId, timeLeft);
                document.body.querySelector('root-content').innerHTML = '';
                document.body.querySelector('root-content').appendChild(lobby);
                alertsConrtainer.innerHTML = '';
                alertsConrtainer.style.display = "none";
            } else {
                console.log('No opponent found or already paired.');
            }
            /* -------    call nordine code here -------- */
            // store the player id in the local storage
            // localStorage.setItem('userId', playerId);
            // const lobby = new Lobby(opponentId);
            // document.body.querySelector('root-content').innerHTML = '';
            // document.body.querySelector('root-content').appendChild(lobby);
            /* -------    call nordine code here -------- */
            
            customAlert.querySelector(".buttons").remove();
            
            closeWebSocket(data.tournament_id);
            // Here you can add logic to start the game or redirect to the game page
            // Here i need page of counter start with 2 minutes and decrement if 2 minutes is ended tournment is started
            // like that tournament starts in : 01:59
        });
        
        
        customAlert.querySelector("#cancelBtn").addEventListener("click", async () => {
            alert("You have canceled your participation in the tournament.");
            
            try {
                await player_leave_tournament(data.id);
                // Close the WebSocket connection
                closeWebSocket(data.tournament_id);
                customAlert.remove();
                if (!alertsConrtainer.childElementCount)
                alertsConrtainer.remove();
            
        } catch (error) {
            console.error('Error of player leave tournament: ', error);
        }
        });
        alertsConrtainer.appendChild(customAlert);
    }
    console.log("tournamentSocket.onmessage.data : ", response);
}

export function useWebsocket(data) {
    // TODO: Tournament Alert
    const tournament_id = data.tournament_id;
    const tournamentSocket = new WebSocket(`${wsUrl}tournament/` + tournament_id + '/');
    tournamentSocket.onopen = async () => {
        console.log('WebSocket connection of Tournament is opened');
        if(data.number_of_players == data.players.length || !data.can_join)
        {
            await update_start_date(data);
            tournamentSocket.send(JSON.stringify({'type': 'play_cancel', 'message': 'Tournament is starting in 2 minutes'}));
        }
    };

    tournamentSocket.onmessage = (e) => { displayAlert(e, data); };

    tournamentSocket.onclose = () => { console.log('WebSocket connection of tournament closed'); };

    tournamentSocket.onerror = (error) => {console.error('WebSocket tournament error:', error);};

    return tournamentSocket;
}

 export async function update_start_date(data) {
    try {
        const tournamentId = data.id;
        const now = new Date();
        console.log("now: ", now);
        console.log("\n===\n");
        const start_date = now.toISOString().replace('T', ' ').substring(0, 19); // Converts to YYYY-MM-DD HH:MM:SS
        console.log("start_date: ", start_date);
        const Tournament = {
            tournamentId: tournamentId,
            start_date: start_date,
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
        const responseData = await response.json();
        console.log("responseData: ", responseData);
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


// async function getTournamentData() {
//     try {
//         const id = "1/";
//         const response = await fetch(`${httpUrl}tournament/${tournamentId}/`);
//         if (!response.ok) {
//             throw new Error(`${response.status}  ${response.statusText}`);
//         }
//         const data = await response.json();
//         return data;
//     } catch(error) {
//         console.error('Error of tournament list: ', error);
//     }
// }

async function get_players_ids() {

    const tournamentData = await getTournamentData(); // Function to get tournament data
    console.log(JSON.stringify(tournamentData, null, 2));

    const playerIds = tournamentData.players.map(player => player.id); // Extract sorted player IDs
    console.log(playerIds);
    return playerIds;
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


function startCountdown(cDownContainer) {
    countdownInterval = setInterval(function() {
        console.log("timeLeft in startCountdown function: ", timeLeft);
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        cDownContainer.innerHTML = `${minutes} : ${seconds < 10 ? '0' + seconds : seconds}`;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            const alertsConrtainer = window.document.querySelector("body .alerts");
            alertsConrtainer.style.display = "none";
            alertsConrtainer.innerHTML = '';

            // Add logic to start the tournament here
        }
        timeLeft--;
        
    }, 1000);
}
