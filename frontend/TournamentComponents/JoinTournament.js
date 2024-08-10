import { apiUrl, playerId } from "../Utils/GlobalVariables.js";
import { calculateTimeDifferents } from "../Utils/DateUtils.js";

export class JoinTournament extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="box">
                <div class="mainContainer">
                    <div class="mainHeader">
                        <img src="../assets/icons/close-x-icon.svg"/>
                        <div class="tournament-search">
                            <input type="text" placeholder="Tournament Name"/>
                            <img src="../images/svg-header/search.svg">
                        </div>
                        <img src="../assets/icons/key-icon.svg">
                    </div>
                    <div class="line">
                        <img class="separator" src="../assets/login-assets/separator.svg"/>
                    </div>
                    <div class="tournaments-list">
                        <h1 style="color: #d9d9d950; margin: 50px; text-align: center; display: none;">No Tournament Available Right Now</h1>
                    </div>
                </div>
            </div>
        `;
    }

    createTournamentItem(tournamentData) {
        const tournamentItem = document.createElement("div");
        tournamentItem.className = "tournament-item";
        tournamentItem.id = tournamentData.id;
        tournamentItem.innerHTML = `
            <div class="leftContainer">
                <h1 class="tournament-name">${tournamentData.tournament_name.toUpperCase()}</h1>
                <div class="tournament-info">
                    <div>
                        <p>OWNER: </p>
                        <p class="tournament-owner">${tournamentData.players.length != 0 && tournamentData.players[0].username}</p>
                    </div>
                    <p class="number-of-players">${tournamentData.players.length} / ${tournamentData.number_of_players}</p>
                </div>
            </div>
            <div class="rightContainer">
                <h5 class="deadline">${calculateTimeDifferents(tournamentData.created_at)}</h5>
                <button class="join-button"/>
            </div>
        `;
        const joinButton = tournamentItem.querySelector(".join-button");
        joinButton.id = tournamentData.id;
        if (tournamentData.is_accessible == false)
            joinButton.className = "lock-button";
        joinButton.addEventListener("click", async () => {
            if (joinButton.className == "lock-button") {

            }
            else {
                await this.player_join_tournament(joinButton.id);
                const tournamentsList = this.shadowRoot.querySelector(".tournaments-list");
                tournamentsList.removeChild(this.shadowRoot.getElementById(joinButton.id));
            }
        });
        return tournamentItem;
    }

    async bindingApiDataIntoComponents() {
        const tournamentsList = this.shadowRoot.querySelector(".tournaments-list");
        tournamentsList.innerHTML = '';
        const tournaments = await this.get_Available_Tournaments();
        tournaments.forEach(element => {
            if (!element.players.some(e => e.id == playerId))
                tournamentsList.appendChild(this.createTournamentItem(element));
        });
    }

    connectedCallback() {
        this.bindingApiDataIntoComponents();
    }

    async get_Available_Tournaments() {
        try {
            const Available_Tournaments = "available_tournaments/";
            const response = await fetch(`${apiUrl}${Available_Tournaments}`);
            if (!response.ok) {
                throw new Error(`${response.status}  ${response.statusText}`);
            }
            return await response.json();
        } catch(error) {
            console.error('Error of tournament list: ', error);
        }
    }

    async player_join_tournament(tournamentId)
    {
        try {
            // const playerId = document.getElementById("playerId").value;
            const response = await fetch(`${apiUrl}tournament/${tournamentId}/player/${playerId}/`, {
                method: 'POST'
            });
            if (!response.ok) {
                const data = await response.json();
                console.log(JSON.stringify(data, null, 2));
                throw new Error(`${response.status}  ${data.statusText}`);
            }
            const data = await response.json();
            console.log(JSON.stringify(data, null, 2));
            if(data.success.Winner) {
                console.log(`Player with name ${data.success.Winner} is the winner.`);
                alert(`Player with name ${data.success.Winner} is the winner.`);
            }
        } catch(error) {
            console.error('Error of player join tournament: ', error);
        }
    }
    
    


}









const cssContent = /*css*/`
    * {
        margin: 0;
        padding: 0;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    :host {
        width: 100%;
        height: 100%;
        background-color: #124B6C50;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .box {
        width: 40%;
        height: 90%;
        display: flex;
        flex-direction: column;
        clip-path: polygon(0 0, calc(100% - 30px) 0%, 100% 30px, 100% 100%, 30px 100%, 0% calc(100% - 30px));
        background-color: aqua; 
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .mainContainer {
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        display: flex;
        flex-direction: column;
        clip-path: polygon(0 0, calc(100% - 30px) 0%, 100% 30px, 100% 100%, 30px 100%, 0% calc(100% - 30px));
        background-color: #124B6C; 
        align-items: center;
        justify-content: center;
        position: relative;
        margin: 2px;   
    }


    h1 {
        margin-top: 20px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .line > img {
        height: 12px;
        margin: 20px;
    }

    h3 {
        margin-bottom: 4px; 
    }

    .tournamentId {
        width: 100%;
        height: 80px;
    }

    .mainHeader {
        display: flex;
        width: calc(100% - 60px);
        height: 40px;
        justify-content: space-between;
        margin: 10px 30px;
    }

    .mainHeader > img {
        width: 20px;
        height: 100%;
        margin: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }


    .tournament-search {
        height: 40px;
        width: 60%;
        border-radius: 7px;
        border: 1px solid aqua;
        padding-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0;
    }

    .tournament-search input {
        height: 100%;
        width: calc(100% - 32px);
        border: none;
        outline: none;
        font-family: 'Sansation Bold';
        color: #ffffff;
        background-color: transparent;
    }

    .tournament-search img {
        width: 20px;
    }



    .tournaments-list {
        height: calc(100% - 10px);
        width: calc(100% - 80px);
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 40px;
        margin-bottom: 10px;
        gap: 24px;
        overflow-y: scroll;
    }


    .tournament-item {
        padding: 0 10px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .leftContainer {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .tournament-name {
        margin: 0;
    }

    .tournament-info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }

    .tournament-info div {
        display: inherit;
        gap: 4px;
    }

    p {
        font-size: 10px;
    }


    .rightContainer {
        min-width: 300px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    h5 {
        color: #ccc;
    }

    .join-button {
        width: 24px;
        height: 24px;
        background: url("../assets/icons/join-icon.svg");
        background-repeat: no-repeat;
        background-size: cover;
    }
    .lock-button {
        width: 24px;
        background: url("../assets/icons/lock-icon.svg");
        background-repeat: no-repeat;
    }













    .isPrivate {
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        position: relative;
    }

    .privateCheckBox {
        width: 48px;
        height: 24px;
        background-color: #d9d9d950;
        position: absolute;
        right: 40px;
        border-radius: 100px;
    }

    .circle {
        height: 24px;
        width: 24px;
        border-radius: 100%;
        background-color: #d9d9d9;

    }

    .password {
        width: 100%;
        height: 80px;
    }

    button {
        font-size: 26px;
        font-family: 'Sansation Bold';
        height: 64px;
        background-color: transparent;
        border: none;
        color: white;
        margin: 20px;
    }

`;


customElements.define("join-tournament", JoinTournament);