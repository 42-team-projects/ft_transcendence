import { playerId } from "../../Utils/GlobalVariables.js";

export class TournamentAlert extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
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
    }

    connectedCallback() {
        var modal = this.shadowRoot.querySelector("#tournamentModal");
        // Get the <span> element that closes the modal
        var span = this.shadowRoot.querySelector(".close");
        span.onclick = function() {
            modal.style.display = "none";
        }

        this.shadowRoot.querySelector("#playBtn").addEventListener("click", async function() {
            modal.style.display = "none";
            const start_date = await this.get_start_date();
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
            const playerIds = playerId;
            const totalPlayers = playerIds.length;
            const pId = id;
            const opponentId = this.findOpponentId(pId, playerIds, totalPlayers);
            if (opponentId) {
                console.log("playerID:     ", pId, "opponentId:    ", opponentId);
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
            this.startCountdown(timeLeft);
    
            // Here you can add logic to start the game or redirect to the game page
            // Here i need page of counter start with 2 minutes and decrement if 2 minutes is ended tournment is started
            // like that tournament starts in : 01:59
        });

        // Add event listener for Cancel button
        this.shadowRoot.querySelector("#cancelBtn").addEventListener("click", function() {
            alert("You have canceled your participation in the tournament.");
            modal.style.display = "none";
            // Here you can add logic to handle cancellation
            // call endpoint of player leave tournament 
        });
        modal.style.display = "block";
    }

    /* ----*/

    // async get_players_ids() {
    //     const tournamentData = await getTournamentData(); // Function to get tournament data
    //     console.log(JSON.stringify(tournamentData, null, 2));

    //     const playerIds = tournamentData.players.map(player => player.id); // Extract sorted player IDs
    //     console.log(playerIds);
    //     return playerIds;
    // }


    async get_start_date() {
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



    findOpponentId(pId, playerIds, totalPlayers) {
        const pairing_sum = totalPlayers - 1;
        const index = playerIds.indexOf(pId);
        if (index === -1) return null; // Player ID not found in the list
        // Calculate the index for the opponent
        const opponentIndex = pairing_sum - index; // Subtract 1 for zero-based index
        return playerIds[opponentIndex];
    }


    startCountdown(timeLeft) {
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


}



customElements.define("tournament-alert", TournamentAlert)