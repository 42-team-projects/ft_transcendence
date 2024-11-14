export async function printAllTournaments(contract) {
    const tournamentIds = await contract.getAllTournamentIds();
    console.log("\n=======================   All Tournaments  ========================\n");
    for (let i = 0; i < tournamentIds.length; i++) {
        const tournamentId = tournamentIds[i];
        const scores = await contract.getScores(tournamentId);
        console.log(`Tournament with Id  ${tournamentId.toString()}:`);
        console.log(`  scores : [`);
        scores.forEach((score, index) => {
          console.log(`    {`);
          console.log(`       tournamentId: ${score.tournamentId.toString()},`);
          console.log(`       winnerId: ${score.winnerId.toString()},`);
          console.log(`       winnerScore: ${score.winnerIdScore.toString()},`);
          console.log(`       loserId: ${score.loserId.toString()},`);
          console.log(`       loserScore: ${score.loserIdScore.toString()}`);
          console.log(`    }${index < scores.length - 1 ? ',' : ''}`); // Add a comma if not the last item
        });
        console.log(`  ]`);
      }
  }