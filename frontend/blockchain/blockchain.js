// this function will called in loser player check 

async function leaveTournamentAndStoreScore(tournamentId, winnerId, winnerIdScore, loserId, loserIdScore, abi) {
    const apiUrl = 'https://127.0.0.1:8000/tournament/StoreScore/';
    // const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${accessToken}`, // Attach the access token in the Authorization header
                // 'X-CSRFToken': getCsrfToken(), // Ensure CSRF protection for Django
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

const abi = [
	{
		"inputs": [],
		"name": "getAllTournamentIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tournamentId",
				"type": "uint256"
			}
		],
		"name": "getScores",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "tournamentId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "winnerId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "winnerIdScore",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "loserId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "loserIdScore",
						"type": "uint256"
					}
				],
				"internalType": "struct TournamentScores.Score[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tournamentId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_winnerId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_winnerIdScore",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_loserId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_loserIdScore",
				"type": "uint256"
			}
		],
		"name": "storeScore",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const tournamentId = 11000;
const winnerId = 2000;
const winnerIdScore = 2000;
const loserId = 2000;
const loserIdScore = 2000;

document.getElementById('leaveAndStoreScoreButton').addEventListener('click', () => {
    leaveTournamentAndStoreScore(tournamentId, winnerId, winnerIdScore, loserId, loserIdScore, abi);
});