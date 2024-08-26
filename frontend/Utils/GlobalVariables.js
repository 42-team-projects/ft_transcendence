// export const playerId = JSON.parse(localStorage.getItem('loggedInUser')).id;
export const playerId = 2;
// export const apiUrl = 'http://127.0.0.1:8000/tournament/';
export const apiUrl = 'http://127.0.0.1:8000/tournament/'
export const wsUrl = 'ws://127.0.0.1:8000/';

// set acsses token in local storage
localStorage.setItem('accessToken', 'token');
// get acsses token in local storage
export const accessToken = localStorage.getItem('accessToken');
console.log(accessToken);