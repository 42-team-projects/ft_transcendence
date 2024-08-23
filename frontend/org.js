import { Lobby } from "./Game/GamePlay/Lobby.js";
import "./app.js";
let tournamentId = 1;

    // Retrieve user data from local storage
const user = JSON.parse(localStorage.getItem('loggedInUser'));
const id = user.id;

if (user) {
    document.getElementById('user-info').innerHTML = `
        <h2>player id = ${user.id}</h2>`;
} else {
    document.getElementById('user-info').innerHTML = `
        <p>No user is logged in.</p>`;
}

// Get the modal
var modal = document.getElementById("tournamentModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// Open the modal when WebSocket message is received
function showTournamentModal() {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
// Add event listener for Play button
document.getElementById("playBtn").addEventListener("click", async function() {
    modal.style.display = "none";
    const start_date = await get_start_date();
    console.log(start_date);
    // console.log(tournamentId);
    const currentDate = new Date();
    
    const parsedStartDate = new Date(start_date);
    // Calculate the difference in milliseconds
    const timeDifference = currentDate - parsedStartDate;
    console.log("Current date:", currentDate);
    console.log("parsedStartDate date:", parsedStartDate);
    // Convert the difference from milliseconds to seconds
    let timespent = Math.floor(timeDifference / 1000);
    console.log("timespent:    ", timespent);
    const totalCountdownTime = 60; // 1 minutes in seconds
    const timeLeft = totalCountdownTime - timespent;
    //
    const playerIds = await get_players_ids();
    const totalPlayers = playerIds.length;
    const playerId = id;
    const opponentId = findOpponentId(playerId, playerIds, totalPlayers);
    if (opponentId) {
        console.log("playerID:     ", playerId, "opponentId:    ", opponentId);
        // alert(`playerID:      ${playerId}   opponentId:     ${opponentId}`);
        // lobby(playerId, opponentId);
    } else {
        console.log('No opponent found or already paired.');
    }
    // store the player id in the local storage
    localStorage.setItem('userId', playerId);
    const lobby = new Lobby(opponentId);
    document.body.innerHTML = '';
    document.body.appendChild(lobby);
    startCountdown(timeLeft);

    // Here you can add logic to start the game or redirect to the game page
    // Here i need page of counter start with 2 minutes and decrement if 2 minutes is ended tournment is started
    // like that tournament starts in : 01:59
});

async function get_start_date() {
    try {
        console.log(tournamentId);
        const response = await fetch(`${httpUrl}tournament/${tournamentId}/`);
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

function startCountdown(timeLeft) {
    const countdownElement = document.createElement('h2');
    document.body.appendChild(countdownElement);
    
    // Apply styles to the countdown element
    countdownElement.style.position = 'fixed';
    countdownElement.style.top = '50%';
    countdownElement.style.left = '50%';
    countdownElement.style.transform = 'translate(-50%, -50%)';
    countdownElement.style.fontSize = '48px';
    countdownElement.style.color = '#FFFFFF';
    countdownElement.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.7)';
    countdownElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    countdownElement.style.padding = '20px';
    countdownElement.style.borderRadius = '10px';
    countdownElement.style.border = '3px solid #4CAF50';
    countdownElement.style.textAlign = 'center';
    countdownElement.style.fontFamily = 'Arial, sans-serif';
    countdownElement.style.zIndex = '9999';

    
    const countdownInterval = setInterval(function() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        countdownElement.innerHTML = `Tournament starts in: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "Tournament has started!";
            // Add logic to start the tournament here
        }
        timeLeft--;
    }, 1000);
}

// Add event listener for Cancel button
document.getElementById("cancelBtn").addEventListener("click", function() {
    alert("You have canceled your participation in the tournament.");
    modal.style.display = "none";
    // Here you can add logic to handle cancellation
    // call endpoint of player leave tournament 
});

const httpUrl = 'http://127.0.0.1:8000/tournament/'
const wsUrl = 'ws://127.0.0.1:8000/';

async function List_Tournaments() {
    try {
        const List_Tournament = "list_tournaments/";
        const response = await fetch(`${httpUrl}${List_Tournament}`);
        if (!response.ok) {
            throw new Error(`${response.status}  ${response.statusText}`);
        }
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch(error) {
        console.error('Error of tournament list: ', error);
    }
}
async function Join_Tournament() {
    try {
        tournamentId = 1;
        const playerId = id;
        const response = await fetch(`${httpUrl}tournament/${tournamentId}/player/${playerId}/`, {
            method: 'POST'
        });
        if (!response.ok) {
            const data = await response.json();
            console.log(JSON.stringify(data, null, 2));
            throw new Error(`${response.status}  ${data.statusText}`);
        }
        const data = await response.json();
        // console.log(JSON.stringify(data, null, 2));
        useWebsocket(data);
    } catch(error) {
        console.error('Error of player join tournament: ', error);
    }
}
function useWebsocket(data) {
    const tournament_id = data.tournament_id;
    const tournamentSocket = new WebSocket(`${wsUrl}tournament/` + tournament_id + '/');
    tournamentSocket.onopen = function() {
        console.log('WebSocket connection of Tournament is opened');
        if(data.number_of_players == data.players.length)
        {
            update_start_date();
            tournamentSocket.send(JSON.stringify({'type': 'play_cancel','message': 'Tournament is starting in 2 minutes'}));
        }
    };
    tournamentSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        console.log(data);
        showTournamentModal();
    };
    tournamentSocket.onclose = function() {
        console.log('WebSocket connection of tournament closed');
    };
    tournamentSocket.onerror = function(error) {
        console.error('WebSocket tournament error:', error);
    };
}

async function update_start_date() {
    try {
        // const tournamentId = data.tournament_id;
        const now = new Date();
        // console.log(now);
        // console.log("\n===\n");
        const start_date = now.toISOString().replace('T', ' ').substring(0, 19); // Converts to YYYY-MM-DD HH:MM:SS
        // console.log(start_date);
        const Tournament = {
            tournamentId : tournamentId,
            start_date : start_date,
        }
        const response = await fetch(`${httpUrl}SetStartDate/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Tournament),
        });
        if (!response.ok) {
            const data = await response.json();
            console.log(JSON.stringify(data, null, 2));
            throw new Error(`${response.status}  ${data.statusText}`);
        }
        const data = await response.json();
        // console.log(JSON.stringify(data, null, 2));
    } catch(error) {
        console.error('Error of update start date: ', error);
    }
}

async function get_players_ids() {
    const tournamentData = await getTournamentData(); // Function to get tournament data
    console.log(JSON.stringify(tournamentData, null, 2));

    const playerIds = tournamentData.players.map(player => player.id); // Extract sorted player IDs
    console.log(playerIds);
    return playerIds;
}

async function getTournamentData() {
    try {
        const id = "1/";
        const response = await fetch(`${httpUrl}tournament/${tournamentId}/`);
        if (!response.ok) {
            throw new Error(`${response.status}  ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch(error) {
        console.error('Error of tournament list: ', error);
    }
}

function findOpponentId(playerId, playerIds, totalPlayers) {
    const pairing_sum = totalPlayers - 1;
    const index = playerIds.indexOf(playerId);
    if (index === -1) return null; // Player ID not found in the list
    // Calculate the index for the opponent
    const opponentIndex = pairing_sum - index; // Subtract 1 for zero-based index
    return playerIds[opponentIndex];
}


addEventListener('DOMContentLoaded', async () => {
    document.getElementById("btn1").addEventListener("click", function() {
        Join_Tournament();
    });

    // List_Tournaments();

    document.getElementById("btn2").addEventListener("click", function() {
        List_Tournaments();
    });

    // update_start_date();

    document.getElementById("btn3").addEventListener("click", function() {
        update_start_date();
    });

    // get_start_date();

    document.getElementById("btn4").addEventListener("click", function() {
        get_start_date();
    });

    // get_players_ids();

    document.getElementById("btn5").addEventListener("click", function() {
        get_players_ids();
    });

});
