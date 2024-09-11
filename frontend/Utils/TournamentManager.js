import { createTournamentWebSocket, update_start_date } from "./TournamentWebSocketManager.js";

export async function checkIsTournamentFull(data, tournamentWebSocket) {
    console.log("data.number_of_players:    ", data.number_of_players);
    console.log("data.players.length:    ", data.players.length);
    let t = 86400;
    if (data.number_of_players == data.players.length) {
        console.log("\nhere\n");
        t = 0;
        tournamentWebSocket.send(JSON.stringify({'type': 'play_cancel', 'message': 'Tournament is starting in 2 minutes'}));
    }
    await update_start_date(data, t);
}


export async function initTournamentWebSocket(newTournamentData) {
    let tournamentSocket = await createTournamentWebSocket(newTournamentData.tournament_id, newTournamentData);
    // if(!tournamentSocket)
    //     tournamentSocket = TournamentWebSocket;
    let timeAppend = 86400;
    if (newTournamentData.number_of_players % newTournamentData.players.length == 0)
    {
        timeAppend = 0;
        tournamentSocket.send(JSON.stringify({'type': 'play_cancel', 'message': 'Tournament is starting in 2 minutes'}));
    }
    await update_start_date(newTournamentData, timeAppend);
}



// Stage Two

// if Player lose, hes web socket should be closed.
// else 