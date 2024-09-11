import { TOURNAMENT_API_URL } from "/Utils/GlobalVariables.js";
import { createApiData, getApiData } from "/Utils/APIManager.js";
import { hashPassword } from "/Utils/Hasher.js";


export async function get_tournaments_by_player_id() {
    try {
        const response = await getApiData(TOURNAMENT_API_URL + "player/");
        return response;
    } catch (error) {
        console.error('Error of tournament list: ', error);
        return null;
    }
}

/**
 * 
 * @author rida
 */

export async function createTournament(data) {

    try {
        const Tournament = {
            tournament_name: data.name,
            number_of_players: data.num_players,
            is_accessible: data.access.toLowerCase() == "public" ? true : false,
            access_password: await hashPassword(data.password),
            owner: null
            
        }
        const create_tournament = "create/player/";
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${TOURNAMENT_API_URL}${create_tournament}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
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
        const response = await createApiData(`${TOURNAMENT_API_URL}tournament/${tournamentId}/player/leave/`, "");
        console.log("response: ", response);
        // handle response message
    } catch (error) {
        console.error('Error of player leave tournament: ', error);
    }
}

export async function get_tournament_by_id(id) {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${TOURNAMENT_API_URL}${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok)
            throw new Error(`${response.status}  ${response.statusText}`);
        return await response.json();
    } catch(error) {
        console.error('Error of tournament list: ', error);
    }
}


export async function get_Available_Tournaments(queries) {
    try {
        let Available_Tournaments = "available_tournaments?" + (queries || "");
        return await getApiData(`${TOURNAMENT_API_URL}${Available_Tournaments}`);
    } catch(error) {
        console.error('Error of tournament list: ', error);
    }
}

/**
 * 
 * @author rida
 */
export async function player_join_tournament(tournamentId)
{
    try {
        const response = await createApiData(`${TOURNAMENT_API_URL}tournament/${tournamentId}/player/`, "");
        console.log("response: ", response);
        return response;
    } catch(error) {
        console.log('You already join to this tournament : ', error);
    }
}