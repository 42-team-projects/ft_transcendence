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

            const interval = setInterval(async () => {
                clearInterval(interval);
                const newTournamentData = await get_tournament_by_id(tournament_id);
				closeWebSocket(tournament_id);
				
                if(newTournamentData.players.length == 1)
                {

                    const abi = await getAbi();
                    console.log(tournament_id, opponent_id, opponent_score, user_id, user_score);
                    await leaveTournamentAndStoreScore(tournament_id, opponent_id, opponent_score, user_id, user_score, abi);
                    console.log("you win !!!");
                    return;
                }
                // Initialize a new WebSocket connection or re-establish if necessary
                initTournamentWebSocket(newTournamentData);
                
            }, 5000);
        }
    } catch (error) {
        console.error('Error in goNextStage:', error);  // Catch and log any errors during the process
    }
}

