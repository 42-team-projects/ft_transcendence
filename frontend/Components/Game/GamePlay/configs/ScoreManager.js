import { initTournamentWebSocket } from "/Utils/TournamentManager.js";
import { closeAndRemovePlayerFromTournament, closeWebSocket } from "/Utils/TournamentWebSocketManager.js";
import { get_tournament_by_id } from "/Components/Tournament/configs/TournamentAPIConfigs.js";
import { leaveTournamentAndStoreScore, getAbi } from "/blockchain/blockchain.js";





export async function goNextStage(playerState, tournament_id, user_id, opponent_id, user_score, opponent_score) {
    try {
        if (playerState === 'lose') {
            console.log("you have lost: ", tournament_id);
            await closeAndRemovePlayerFromTournament(tournament_id);  // Close WebSocket and remove the player
            return ;

        } else {
            // player_leave_tournament_by_playerId(tournamentId, opponent_id)
            const interval = setInterval(async () => {
                clearInterval(interval);
                const newTournamentData = await get_tournament_by_id(tournament_id);
				closeWebSocket(tournament_id);
				
                if(newTournamentData.players.length == 1)
                {

                    const abi = await getAbi();
                    await leaveTournamentAndStoreScore(tournament_id, user_id, user_score, opponent_id, opponent_score, abi);


                    const alert = window.document.querySelector(".alerts");
                    alert.style.display = "flex";
                    alert.innerHTML = `
                        <style>
                            .winner-alert {
                                width: 30%;
                                height: 30%;
                                background: #00fffc80;
                                border-radius: 10px;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                gap: 20px;
                                color: white;
                                padding: 20px;
                            }
                            #ok-button {
                                width: 100px;
                                height: 32px;
                                background: aqua;
                                border: none;
                                border-radius: 5px;
                                font-size: 16px;
                            }
                        </style>
                        <div class="winner-alert">
                            <div style="width: 100%; display: flex; flex-direction: column; align-items: center; flex: 1; justify-content: center; gap: 20px;">
                                <div style="width: 100%; display: flex; align-items: center; justify-content: center;">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100" height="100" viewBox="0 0 256 256" xml:space="preserve">
                                        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                                            <path d="M 51.959 13.205 C 55.751 10.22 57.016 5.819 55.751 0 H 34.249 c -2.789 5.694 -2.074 10.264 3.792 13.205 H 51.959 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(233,84,84); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                            <polygon points="42.95,30.28 34.25,0 17.75,10.71 25.63,37.49 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(237,99,98); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
                                            <polygon points="64.37,37.49 72.25,10.71 55.75,0 47.06,30.28 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(237,99,98); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
                                            <path d="M 45 90 c 16.769 0 30.363 -13.594 30.363 -30.363 S 61.769 29.273 45 29.273 C 34.997 49.991 34.2 70.271 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,204,91); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                            <path d="M 45 90 c -16.769 0 -30.363 -13.594 -30.363 -30.363 S 28.231 29.273 45 29.273 v 60.696" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(253,188,75); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                            <path d="M 37.402 79.821 c -0.124 0 -0.25 -0.023 -0.372 -0.071 c -5.372 -2.129 -9.594 -6.223 -11.887 -11.527 c -2.293 -5.305 -2.384 -11.185 -0.255 -16.557 c 0.206 -0.52 0.793 -0.773 1.314 -0.568 c 0.519 0.206 0.774 0.794 0.568 1.314 c -1.93 4.87 -1.848 10.2 0.231 15.008 c 2.079 4.809 5.905 8.519 10.774 10.448 c 0.52 0.206 0.774 0.794 0.568 1.314 C 38.186 79.579 37.805 79.821 37.402 79.821 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,153,34); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                            <path d="M 64.172 68.247 c -0.125 0 -0.25 -0.023 -0.373 -0.071 c -0.52 -0.206 -0.774 -0.794 -0.568 -1.314 c 3.983 -10.052 -0.954 -21.471 -11.006 -25.455 c -0.52 -0.206 -0.774 -0.794 -0.568 -1.314 c 0.206 -0.52 0.794 -0.773 1.314 -0.568 c 11.09 4.395 16.537 16.993 12.142 28.083 C 64.956 68.005 64.574 68.247 64.172 68.247 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,153,34); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                            <path d="M 50.871 74.656 H 40.708 c -1.186 0 -2.15 -0.964 -2.15 -2.149 v -3.304 c 0 -1.186 0.964 -2.149 2.15 -2.149 h 1.129 c 0.083 0 0.15 -0.067 0.15 -0.15 V 59.2 c -0.713 0.178 -1.511 -0.034 -2.043 -0.566 l -2.336 -2.336 c -0.837 -0.838 -0.837 -2.202 0 -3.04 l 8.313 -8.313 c 0.616 -0.617 1.534 -0.8 2.342 -0.466 c 0.807 0.334 1.328 1.114 1.328 1.986 v 20.438 c 0 0.083 0.067 0.15 0.149 0.15 h 1.13 c 1.186 0 2.149 0.964 2.149 2.149 v 3.304 C 53.021 73.692 52.057 74.656 50.871 74.656 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,153,34); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                        </g>
                                    </svg>
                                </div>
                                <h1>Congratulations!</h1>
                                <p style="color: #d9d9d9;">You win the esalim tournament</p>
                            </div>
                            <button id="ok-button">OK</button>
                        </div>
                    `;
                    const ok = alert.querySelector("#ok-button");
                    ok.addEventListener("click", () => {
                        alert.innerHTML = '';
                        alert.style.display = "none";
                    });

                    return;
                }
                initTournamentWebSocket(newTournamentData);
                
            }, 5000);
        }
    } catch (error) {
        console.error('Error in goNextStage:', error);  // Catch and log any errors during the process
    }
}

