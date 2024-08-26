export const playerId = JSON.parse(localStorage.getItem('loggedInUser')).id;
// export const playerId = 2;
// export const apiUrl = 'http://127.0.0.1:8000/tournament/';
export const apiUrl = 'http://127.0.0.1:8000/tournament/'
export const wsUrl = 'ws://127.0.0.1:8000/';

export const ip = '10.11.3.7';
const config = {
    serverIP: ip,
};

export default config;