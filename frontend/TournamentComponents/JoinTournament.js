import { apiUrl, playerId } from "../Utils/GlobalVariables.js";
import { calculateTimeDifferents } from "../Utils/DateUtils.js";

const forms = `
<div class="mainHeader">
<img src="../assets/icons/back-icon.svg" id="back"/>
<div class="tournament-search" style="border: none;">
    <h2>Private Tournament</h2>
</div>
<div></div>
</div>
<div class="join-form">
<div class="tournamentId">
    <h2>Tournament ID:</h2>
    <input id="tournamentId" type="text" placeholder="Enter Tournament Id"/>
</div>
<div class="password">
    <h2>Password:</h2>
    <input id="tournamentPassword" type="password" placeholder="Enter Password"/>
</div>
</div>
<button class="join-private-tournament">JOIN</button>
`;

const list = `
        <div class="mainHeader">
            <img id="close-button" src="../assets/icons/close-x-icon.svg"/>
            <div class="tournament-search">
                <input type="text" placeholder="Tournament Name"/>
                <img src="../images/svg-header/search.svg">
            </div>
            <img id="private-tournament" src="../assets/icons/key-icon.svg">
        </div>
        <div class="line">
            <img class="separator" src="../assets/login-assets/separator.svg"/>
        </div>
        <div class="tournaments-list">
            <h1 style="color: #d9d9d950; margin: 50px; text-align: center; display: none;">No Tournament Available Right Now</h1>
        </div>
`;
export class JoinTournament extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="box">
                <div class="mainContainer">
                    ${list}
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
                <h5 class="deadline"></h5>
                <button class="join-button"/>
            </div>
        `;
        const deadline = tournamentItem.querySelector(".deadline");
        setInterval(() => {
            deadline.textContent = calculateTimeDifferents(tournamentData.created_at);
        }, 1000);
        const joinButton = tournamentItem.querySelector(".join-button");
        joinButton.id = tournamentData.id;
        if (tournamentData.is_accessible == false)
            joinButton.className = "lock-button";
        joinButton.addEventListener("click", async () => {
            if (joinButton.className == "lock-button") {
                this.joinToPrivateTournament(tournamentData);
            }
            else {
                await this.player_join_tournament(tournamentData.id);
                const tournamentsList = this.shadowRoot.querySelector(".tournaments-list");
                tournamentsList.removeChild(this.shadowRoot.getElementById(tournamentData.id));
            }
        });
        return tournamentItem;
    }

    joinToPrivateTournament(tournamentData) {
        const mainContainer = this.shadowRoot.querySelector(".mainContainer");
        mainContainer.innerHTML = forms;
        mainContainer.querySelector("#back").addEventListener("click", () => {
            mainContainer.innerHTML = list;
            this.bindingApiDataIntoComponents();
        });
        const tournamentId = mainContainer.querySelector(".tournamentId #tournamentId");
        const tournamentPassword = mainContainer.querySelector(".password #tournamentPassword");
        if (tournamentData) {
            tournamentId.value = tournamentData.tournament_id;
            tournamentId.setAttribute("readonly", true);
        }
        console.log("tournamentPassword: ", tournamentPassword.value);
        mainContainer.querySelector(".join-private-tournament").addEventListener("click", () => {
            if (tournamentPassword.value != "12345678") {
                tournamentPassword.style.border = "1px solid red";
                console.log("ERROR: wrong password !!!");
            }
            else {
                tournamentPassword.style.border = "1px solid aqua";
                console.log("join successfully to the tournament => ", tournamentId.value);
            }

        });
    }

    async bindingApiDataIntoComponents() {
        const privateTournament = this.shadowRoot.getElementById("private-tournament");
        privateTournament.addEventListener("click", () => {
            this.joinToPrivateTournament(null);
        });
        const closeButton = this.shadowRoot.getElementById("close-button");
        closeButton.addEventListener("click", () => {
            this.remove();
            return ;
        });

        const tournamentsList = this.shadowRoot.querySelector(".tournaments-list");
        tournamentsList.innerHTML = '';
        const tournaments = await this.get_Available_Tournaments();
        for (let index = tournaments.length - 1; index >= 0; index--) {
            const element = tournaments[index];
            if (!element.players.some(e => e.id == playerId))
                tournamentsList.appendChild(this.createTournamentItem(element));
            
        }
    }

    connectedCallback() {
        this.bindingApiDataIntoComponents();
        this.setParentStatus();
    }

    setParentStatus(value) {
        const parent = this.closest('tournaments-table');
        console.log("parent: ", parent);
        if (parent) {
            parent.status = value;
        }
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
        height: 102%;
        background-color: #124B6C75;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;

    }
    .box {
        width: 45%;
        height: 90%;
        min-width: 500px;
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
        position: relative;
        justify-content: space-between;
        margin: 2px;
    }


    h1 {
        margin-top: 20px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
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
        min-width: 200px;
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
        border: none;
    }

    .lock-button {
        width: 24px;
        height: 27px;
        background: url("../assets/icons/lock-icon.svg");
        background-repeat: no-repeat;
        background-size: cover;
        outline: none;
        border: none;
    }


    .line > img {
        height: 12px;
        margin: 20px;
    }

    .join-form {
        height: calc(100% - 80px);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-top: 50px;
        margin-bottom: 20px;
    }

    .tournamentId,
    .password {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .tournamentId input,
    .password input {
        height: 40px;
        width: 50%;
        border: 1px solid aqua;
        border-radius: 10px;
        outline: none;
        font-family: 'Sansation Bold';
        color: #ffffff;
        background-color: transparent;
        padding-left: 10px;
    }

    .tournamentId h2,
    .password h2 {
        width: 50%;
        text-align: left;
        margin-bottom: 4px; 
    }

    .join-private-tournament {
        background: transparent;
        height: 64px;
        border: none;
        outline: none;
        color: white;
        font-family: 'Sansation bold';
        font-size: 28px;
        margin-bottom: 30px;

    }

`;


customElements.define("join-tournament", JoinTournament);