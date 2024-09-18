import { HOST } from "/Utils/GlobalVariables.js";

// this function will called in loser player check 

export async function leaveTournamentAndStoreScore(tournamentId, winnerId, winnerIdScore, loserId, loserIdScore, abi) {
    const apiUrl = HOST + '/tournament/StoreScore/';
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Attach the access token in the Authorization header
            },
            body: JSON.stringify({
                tournamentId: tournamentId,
                winnerId: winnerId,
                winnerIdScore: winnerIdScore,
                loserId: loserId,
                loserIdScore: loserIdScore,
                abi: abi, // Send the ABI from the frontend
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Response:', data);
            alert('Score stored and tournament left successfully!');
        } else {
            const errorData = await response.json();
            console.error('Error data:', errorData);
            alert('Error storing score or leaving tournament: ' + errorData.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        // alert('An error occurred while leaving tournament and storing score.');
    }
}

export async function getAbi() {
    const Response = await fetch('/usr/share/nginx/html/artifacts/contracts/TournamentScores.sol/TournamentScores.json');

    const json = await Response.json();
    const ABI = json.abi;
    return ABI;
}
