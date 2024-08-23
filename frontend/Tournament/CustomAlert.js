import { playerId } from "../Utils/GlobalVariables.js";

export class CustomAlert extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="alertContainer">
                <img class="closeButton" src="./assets/icons/close-x-icon.svg"></img>
                <div class="alertHeader">
                    <slot name="header"></slot>
                </div>
                <div class="line"></div>
                <div class="alertBody">
                    <slot name="body"></slot>
                </div>
                <div class="line"></div>
                <div class="alertActions">
                    <slot name="footer"></slot>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        // Get the <span> element that closes the modal
        const closeButton = this.shadowRoot.querySelector(".closeButton");
        closeButton.addEventListener("click", () => {
            this.remove();
            const alertsConrtainer = window.document.querySelector("body .alerts");
            if (!alertsConrtainer.childElementCount)
                alertsConrtainer.style.display = "none";

        });

        // this.shadowRoot.querySelector("#playBtn").addEventListener("click", async function() {
        //     this.remove();
        //     const start_date = await this.get_start_date();
        //     console.log(start_date);
        //     // console.log(tournamentId);
        //     const currentDate = new Date();
            
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
            // const playerIds = playerId;
            // const totalPlayers = playerIds.length;
            // const pId = id;
            // const opponentId = this.findOpponentId(pId, playerIds, totalPlayers);
            // if (opponentId) {
            //     console.log("playerID:     ", pId, "opponentId:    ", opponentId);
            //     // alert(`playerID:      ${playerId}   opponentId:     ${opponentId}`);
            //     // lobby(playerId, opponentId);
            // } else {
            //     console.log('No opponent found or already paired.');
            // }
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

        // // Add event listener for Cancel button
        // this.shadowRoot.querySelector("#cancelBtn").addEventListener("click", () => {
        //     alert("You have canceled your participation in the tournament.");
        //     this.remove();
        //     // Here you can add logic to handle cancellation
        //     // call endpoint of player leave tournament 
        // });
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



    // findOpponentId(pId, playerIds, totalPlayers) {
    //     const pairing_sum = totalPlayers - 1;
    //     const index = playerIds.indexOf(pId);
    //     if (index === -1) return null; // Player ID not found in the list
    //     // Calculate the index for the opponent
    //     const opponentIndex = pairing_sum - index; // Subtract 1 for zero-based index
    //     return playerIds[opponentIndex];
    // }


    startCountdown(timeLeft) {
        const countDown = this.querySelector(".countDown");

        
        const countdownInterval = setInterval(function() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;

            countDown.innerHTML = `Tournament starts in: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                countDown.innerHTML = "Tournament has started!";
                // Add logic to start the tournament here
            }
            timeLeft--;
        }, 1000);
    }


}

customElements.define("custom-alert", CustomAlert)

const cssContent = /*css*/`
:host {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
}

.alertContainer {
    position: relative;
    width: 800px;
    height: 400px;
    background: #00142b;
    border: 1px solid #00fffc80;
    display: flex;
    flex-direction: column;
}


.closeButton {
    position: absolute;
    width: 16px;
    height: 16px;
    right: 9px;
    top: 14px;
    color: white;
}


.alertHeader {
    width: 100%;
    height: 40px;
    clip-path: polygon(100% 7px, 100% 0px, 0px 0px, 0px 100%, calc(100% - (40px + 40px)) 100%, calc(100% - (20px + 40px)) 7.5px, calc(100% - (10px + 40px)) 7.5px, calc(100% - (30px + 40px)) 100%, calc(100% - (20px + 40px)) 100%, calc(100% - 40px) 8px, 100% 7px);
    background: rgb(12,176,176);
    background: linear-gradient(90deg, rgba(12,176,176,1) 36%, rgba(68,223,223,1) 99%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Sansation bold';
}

.alertBody {
    width: 100%;
    float: bottom;
    height: calc(100% - 130px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    font-family: 'Sansation';
}

.alertActions,
.alertActions ::slotted(div) {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    font-family: 'Sansation bold';

}

.line {
    width: 100%;
    height: 2px;
    margin-top: 10px;
    background-color: #00fffc30;
}
`;
