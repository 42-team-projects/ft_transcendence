import { CheckTournamentStages, closeAndRemovePlayerFromTournament, getWebSocketByTournamentId } from "../../../../Utils/TournamentWebSocketManager.js";
import { get_tournament_by_id } from "../../../Tournament/configs/TournamentAPIConfigs.js";

export async function goNextStage(playerState, tournament_id) {
    if (playerState == 'lose')
    {
        // call endpoint of erase player
        // closeAndRemovePlayerFromTournament(data);
        console.log("you are lose !!!!: ", tournament_id);
        alert("you are lose !!!!: " + tournament_id);
        closeAndRemovePlayerFromTournament(tournament_id);
    }
    else {
        console.log("you are win !!!!: ", tournament_id);
        alert("you are win !!!!: " + tournament_id);
        const newTournamentData = await get_tournament_by_id(tournament_id)
        // CheckTournamentStages(data)
        if(newTournamentData.number_of_players % newTournamentData.players.length == 0)
        {
            const tournamentWebSocket = getWebSocketByTournamentId(tournament_id);
            console.log("tournamentWebSocket: ", tournamentWebSocket);
            if (tournamentWebSocket)
                CheckTournamentStages(newTournamentData, tournamentWebSocket);
        }
    }
}