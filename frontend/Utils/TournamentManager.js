import { createTournamentWebSocket, update_start_date } from "./TournamentWebSocketManager.js";

export async function checkIsTournamentFull(data, tournamentWebSocket) {
    let t = 86400;
    if (data.number_of_players == data.players.length) {
        t = 0;
        tournamentWebSocket.send(JSON.stringify({'type': 'play_cancel', 'message': 'Tournament is starting in 2 minutes'}));
    }
    await update_start_date(data, t);
}


export async function initTournamentWebSocket(newTournamentData) {
    let tournamentSocket = await createTournamentWebSocket(newTournamentData.tournament_id, newTournamentData);
    let timeAppend = 86400;
    if (newTournamentData.number_of_players % newTournamentData.players.length == 0)
    {
        timeAppend = 0;
        tournamentSocket.send(JSON.stringify({'type': 'play_cancel', 'message': 'Tournament is starting in 2 minutes'}));
    }
    await update_start_date(newTournamentData, timeAppend);
}
