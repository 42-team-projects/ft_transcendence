export function goNextStage(playerState, tournament_id) {
    if (playerState == 'lose')
    {
        // call endpoint of erase player
        // closeAndRemovePlayerFromTournament(data);
        console.log("you are lose !!!!: ", tournament_id);
        // alert("you are lose !!!!: " + tournament_id);
        
    }
    else {
        console.log("you are win !!!!: ", tournament_id);
        // alert("you are win !!!!: " + tournament_id);
        // const data = gettournamentnyId(tournament_id);
        // CheckTournamentStages(data)
    }
}