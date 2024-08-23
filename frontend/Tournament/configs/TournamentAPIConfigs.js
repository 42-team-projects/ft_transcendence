import { apiUrl, playerId } from "../../Utils/GlobalVariables.js";


export async function get_tournaments_by_player_id() {
    try {
        const player = "player/";
        const response = await fetch(`${apiUrl}${player}${playerId}/`);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Error of tournament list: ', error);
        return null;
    }
}

export async function createTournament(data) {
    try {
        const Tournament = {
            tournament_name: data.name,
            number_of_players: data.num_players,
            is_accessible: data.access.toLowerCase() == "public" ? true : false,
            access_password: data.password,
            owner: null

        }
        const create_tournament = "create/player/";
        const response = await fetch(`${apiUrl}${create_tournament}${playerId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Tournament),
        });
        if (!response.ok)
            throw new Error(`${response.status}  ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Error creating Tournament: ', error);
    }
}



export async function player_leave_tournament(tournamentId) {
    try {
        const response = await fetch(`${apiUrl}tournament/${tournamentId}/player/${playerId}/leave/`, {
            method: 'POST'
        });
        if (!response.ok) {
            const data = await response.json();
            console.log(JSON.stringify(data, null, 2));
            throw new Error(`${response.status}  ${data.statusText}`);
        }
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error of player leave tournament: ', error);
    }
}

export async function get_tournament_by_id(id) {
    try {
        const response = await fetch(`${apiUrl}${id}`);
        if (!response.ok) {
            throw new Error(`${response.status}  ${response.statusText}`);
        }
        return await response.json();
    } catch(error) {
        console.error('Error of tournament list: ', error);
    }
}
