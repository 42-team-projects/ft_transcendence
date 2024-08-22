const htmlCode = `
<!-- The Modal -->
<div id="tournamentModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Tournament Starting Soon</h2>
        <p>The tournament is starting in 2 minutes.</p>
        <p> Are you ready to play?</p>
        <div class="modal-buttons">
            <button class="play-button" id="playBtn">Play Tournament</button>
            <button class="cancel-button" id="cancelBtn">Cancel</button>
        </div>
    </div>
</div>
`;



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
    /* -------    call nordine code here -------- */
    // store the player id in the local storage
    // localStorage.setItem('userId', playerId);
    // const lobby = new Lobby(opponentId);
    // document.body.innerHTML = '';
    // document.body.appendChild(lobby);
    /* -------    call nordine code here -------- */
    startCountdown(timeLeft);

    // Here you can add logic to start the game or redirect to the game page
    // Here i need page of counter start with 2 minutes and decrement if 2 minutes is ended tournment is started
    // like that tournament starts in : 01:59
});


// Add event listener for Cancel button
document.getElementById("cancelBtn").addEventListener("click", function() {
    alert("You have canceled your participation in the tournament.");
    modal.style.display = "none";
    // Here you can add logic to handle cancellation
    // call endpoint of player leave tournament 
});




/* ----*/

async function get_players_ids() {
    const tournamentData = await getTournamentData(); // Function to get tournament data
    console.log(JSON.stringify(tournamentData, null, 2));

    const playerIds = tournamentData.players.map(player => player.id); // Extract sorted player IDs
    console.log(playerIds);
    return playerIds;
}


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



function findOpponentId(playerId, playerIds, totalPlayers) {
    const pairing_sum = totalPlayers - 1;
    const index = playerIds.indexOf(playerId);
    if (index === -1) return null; // Player ID not found in the list
    // Calculate the index for the opponent
    const opponentIndex = pairing_sum - index; // Subtract 1 for zero-based index
    return playerIds[opponentIndex];
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