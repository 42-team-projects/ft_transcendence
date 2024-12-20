import { calculateTimeDifferents } from "/Utils/DateUtils.js";
import { getCurrentPlayerId, wsUrl, PROFILE_API_URL } from "/Utils/GlobalVariables.js";
import { hashPassword } from "/Utils/Hasher.js";
import { CustomSelect } from "/Components/CustomElements/CustomSelect.js";
import { get_Available_Tournaments, player_join_tournament, get_tournament_by_id } from "/Components/Tournament/configs/TournamentAPIConfigs.js";
import { createRow } from "/Components/Tournament/configs/TournamentUtils.js";
import { createTournamentWebSocket } from "/Utils/TournamentWebSocketManager.js";
import { checkIsTournamentFull } from "/Utils/TournamentManager.js";
import { createApiData } from "/Utils/APIManager.js";

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
    deadlineInterval;

    createTournamentItem(tournamentData) {
        const tournamentItem = document.createElement("div");
        tournamentItem.className = "tournament-item";
        tournamentItem.id = "id_" + tournamentData.id;
        tournamentItem.innerHTML = `
            <div class="leftContainer">
                <h2 class="tournament-name">${tournamentData.tournament_name}</h2>
                <div class="tournament-info">
                    <div>
                        <p>OWNER: </p>
                        <p class="tournament-owner">${tournamentData.owner.user.username}</p>
                    </div>
                    <p class="number-of-players">${tournamentData.players.length + " / " + tournamentData.number_of_players}</p>
                </div>
            </div>
            <div class="rightContainer">
                <h5 class="deadline"></h5>
                <button class="join-button"/>
            </div>
        `;
        const deadline = tournamentItem.querySelector(".deadline");
        this.deadlineInterval = setInterval(() => {
            deadline.textContent = calculateTimeDifferents(tournamentData.created_at);
        }, 1000);
        const joinButton = tournamentItem.querySelector(".join-button");
        joinButton.id = tournamentData.id;
        if (tournamentData.is_accessible == false)
            joinButton.className = "lock-button";
        joinButton.addEventListener("click", async () => {

            if (joinButton.className == "lock-button") 
                this.joinToPrivateTournament(tournamentData);
            else {
                this.displayNicknameAlert(tournamentData);
            }
        });
        return tournamentItem;
    }


    displayNicknameAlert(tournamentData) {
        const tbody = this.parentElement.querySelector("tbody");
        const alertsConrtainer = window.document.querySelector("body .alerts");
        if (!alertsConrtainer)
            return;
        alertsConrtainer.innerHTML = '';
        alertsConrtainer.style.display = "flex";
        const nicknameContainer = document.createElement("div");
        nicknameContainer.className = "nickname-container"
        nicknameContainer.innerHTML = `
            <style>
                .nickname-container {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 50px;
                    background: #00142b;
                    border: 1px solid aqua;
                    padding: 20px;
                    border-radius: 10px;
                }

                .close-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 16px;
                    height: 16px;
                }
            </style>
            <img class="close-button" src="/assets/icons/close-x-icon.svg" width="16px" ></img>
            <custom-select id="nickname" label="Nickname"></custom-select>
            <custom-button class="save-button" width="200px" height="48px">Save</custom-button>
        `;
        nicknameContainer.querySelector(".close-button").addEventListener("click", () => {
            nicknameContainer.remove();
            alertsConrtainer.style.display = "none";
        });
        nicknameContainer.querySelector(".save-button").addEventListener("click", async () => {
            const value = nicknameContainer.querySelector("custom-select").value;
            if (value && value.length > 1) {
                const setNicknameResponse = await createApiData(PROFILE_API_URL + "setNickname/", JSON.stringify({"nickname": value, "tournament_id": tournamentData.tournament_id}));
                if (setNicknameResponse.ok) {
                    alertsConrtainer.style.display = "none";
                    await this.addPlayerToTournament(tournamentData, tbody);
                }
            }
        });
        alertsConrtainer.appendChild(nicknameContainer)
    }

    async initTournamentSocket(tournamentData) {
        const ws = await createTournamentWebSocket(tournamentData.tournament_id, tournamentData);
        await checkIsTournamentFull(tournamentData, ws);
    }

/**
 * 
 * @author rida
 */
    async updateTournamentsTable(tournamentData, tbody) {
        await this.initTournamentSocket(tournamentData);
        const row = await createRow(this, tournamentData);
        tbody.prepend(row);
        
    }

    async addPlayerToTournament(tournamentData, tbody) {
        const data = await player_join_tournament(tournamentData.tournament_id);
        if (data)
        {
            const deadlineTimeNodes = tbody.querySelectorAll(".deadLineTime");
            const unfinishedTournament = Array.from(deadlineTimeNodes).filter((time) => time.textContent !== "finished");
            await this.updateTournamentsTable(data, tbody);
            unfinishedTournament.forEach((time) => {
                time.textContent = calculateTimeDifferents(time.dataset.createdAt);
            });
            const elem = this.shadowRoot.getElementById("id_" + data.id);
            if (elem)
                elem.remove();
            if (data.number_of_players == data.players.length)
                this.remove();
        }
    }

    async joinToPrivateTournament(tournamentData) {
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
        mainContainer.querySelector(".join-private-tournament").addEventListener("click", async () => {
            if (!tournamentData) {
                tournamentData = await get_tournament_by_id(tournamentId.value);
                if (!tournamentData)
                    return ;
            }
            const passValue = await hashPassword(tournamentPassword.value);
            if (tournamentData && passValue == tournamentData.access_password) {
                tournamentPassword.style.border = "1px solid aqua";
                mainContainer.innerHTML = list;
                // await this.addPlayerToTournament(tournamentData);
                this.displayNicknameAlert(tournamentData);
                this.remove();
            }
            else {
                tournamentPassword.style.border = "1px solid red";
                console.log("OPPPPS!!!: wrong password !!!");
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
        const tournaments = await get_Available_Tournaments();
        for (let index = tournaments.length - 1; index >= 0; index--) {
            const element = tournaments[index];
            const player_id = await getCurrentPlayerId();
            if (element.players.length && !Array.from(element.players).find( p => p.id == player_id))
                tournamentsList.appendChild(this.createTournamentItem(element));
            
        }
    }

    getQueryStatement(input, searchBy, players, accessible) {
        let statement = "?" + searchBy.value + "=" + input.value;
        if (players.length > 0 && players.length < 3)
        {
            statement += "&number_of_player=";
            for (let index = 0; index < players.length; index++) {
                statement += players[index].id;
                if (index + 1 != players.length)
                    statement += "_";
            }
        }
        if (accessible.length == 1)
            statement += "&accessible=" + accessible[0].id;
        return statement;
    }


    searchInterval;
    async connectedCallback() {

        this.bindingApiDataIntoComponents();

        const tournamentSearch = this.shadowRoot.querySelector(".tournament-search");
        const tournamentsList = this.shadowRoot.querySelector(".tournaments-list");
        
        this.createWebSocket(tournamentsList);

        const player_id = await getCurrentPlayerId();

        const input = tournamentSearch.querySelector("input");
        let searchDefaultValue;
        let storeFilterValues = {searchBy: "name", players: 0, accessible: 0};
        const searchBy = this.shadowRoot.querySelector("select");
        tournamentSearch.addEventListener("click", () => {
            let checker = false;
            this.searchInterval = setInterval(async () => {
                const players = this.shadowRoot.querySelectorAll(".aqua");
                const accessible = this.shadowRoot.querySelectorAll(".aqua-border");
                if (input.value && 
                        (searchDefaultValue != input.value || 
                        storeFilterValues.searchBy != searchBy.value ||
                        storeFilterValues.players != players.length ||
                        storeFilterValues.accessible != accessible.length)
                    ) {

                    tournamentsList.innerHTML = '';
                    const query = this.getQueryStatement(input, searchBy, players, accessible);
                    const tournaments = await get_Available_Tournaments(query);
                    for (let index = tournaments.length - 1; index >= 0; index--) {
                        const element = tournaments[index];
                        if (element.players.length && !Array.from(element.players).find( p => p.id == player_id))
                            tournamentsList.appendChild(this.createTournamentItem(element));
                    }

                    storeFilterValues.searchBy = searchBy.value;
                    storeFilterValues.players = players.length;
                    storeFilterValues.accessible = accessible.length;

                    searchDefaultValue = input.value;
                    checker = true;
                }
                else if (!input.value && checker) {
                    tournamentsList.innerHTML = '';
                    const tournaments = await get_Available_Tournaments();
                    for (let index = tournaments.length - 1; index >= 0; index--) {
                        const element = tournaments[index];
                        if (element.players.length && !Array.from(element.players).find( p => p.id == player_id))
                            tournamentsList.appendChild(this.createTournamentItem(element));
                    }
                    checker = false;
                }

            }, 700); 
        });

        this.setUpFilterOptions();

        const filterButton = this.shadowRoot.getElementById("filter-tournaments");
        filterButton.addEventListener("click", () => {
            const filterContainer = this.shadowRoot.querySelector(".filterContainer");
            if (filterContainer.style.display == "none") {
                filterContainer.style.display = "flex";
                filterButton.src = "/assets/icons/close-x-icon.svg";
            }
            else {
                filterContainer.style.display = "none";
                filterButton.src = "/assets/icons/filter-icon.svg";
            }


        });

    }
    tournamentSocket;
    createWebSocket(tournamentsList) {
        const tournament_name = "Tournament";
        this.tournamentSocket = new WebSocket(`${wsUrl}tournament/sync/` + tournament_name + '/');
        this.tournamentSocket.onopen = function () {
            console.log('WebSocket connection of Tournament is opened !!!!!!!!!!!!!!!!!!!!');
        };
        this.tournamentSocket.onmessage = async (e) => {
            const newData = JSON.parse(e.data);
            const newTournament = newData.dataTest;
            const player_id = await getCurrentPlayerId();
            if (newTournament.players.length && !Array.from(newTournament.players).find(p => p.id == player_id))
                tournamentsList.prepend(this.createTournamentItem(newTournament));
            // here get data of tournament for update because A new tournament has been created
        };
        this.tournamentSocket.onclose = function () {
            console.log('WebSocket connection of tournament closed');
        };
        this.tournamentSocket.onerror = function (error) {
            console.error('WebSocket tournament error:', error);
        };
    }

    setUpFilterOptions() {
        this.shadowRoot.querySelectorAll(".chooseContainer").forEach(elem => {
            elem.addEventListener("click", e => {
                this.playersOptions(elem);
                this.accessibilityOptions(elem);
            });
        });
    }

    playersOptions(elem) {
        if (!elem.querySelector(".choice"))
            return ;
        if (elem.querySelector(".aqua"))
            elem.querySelector(".choice").className = "choice";
        else
            elem.querySelector(".choice").className = "choice aqua";
    }

    accessibilityOptions(elem) {
        if (!elem.querySelector(".checkbox"))
            return;
        if (elem.querySelector(".aqua-border"))
            elem.querySelector(".checkbox").className = "checkbox";
        else
            elem.querySelector(".checkbox").className = "checkbox aqua-border";
    }

    disconnectedCallback() {
        clearInterval(this.searchInterval);
        clearInterval(this.deadlineInterval);
        this.tournamentSocket.close();
    }

}


const forms = `
<div class="mainHeader">
<img src="/assets/icons/back-icon.svg" id="back"/>
<div class="tournament-search" style="border: none;">
    <h2>Private Tournament</h2>
</div>
<div></div>
</div>
<div class="join-form">
<div class="tournamentId">
    <h2>Tournament ID:</h2>
    <input id="tournamentId" type="numric" placeholder="Enter Tournament Id"/>
</div>
<div class="password">
    <h2>Password:</h2>
    <input id="tournamentPassword" type="password" placeholder="Enter Password"/>
</div>
</div>
<button class="join-private-tournament">JOIN</button>
`;


const filterContent = `
    <div class="filterContainer">
        <div class="filterSection">
            <div class="searchBySection">
                <h3>Search By:</h3>
                <div class="options">
                    <select name="searchLabel" id="searchLabel">
                        <option value="tournament_name">Tournament Name</option>
                        <option value="tournament_id">Tournament Id</option>
                    </select>
                </div>
            </div>
            <div class="playersSection">
                <h3>Players:</h3>
                <div class="options">
                    <div class="chooseContainer" id="4">
                        <div id="4" class="choice">
                        </div>
                        <p>4</p>
                    </div>
                    <div class="chooseContainer" id="8">
                        <div id="8" class="choice">
                        </div>
                        <p>8</p>
                    </div>
                    <div class="chooseContainer" id="16">
                        <div id="16" class="choice">
                        </div>
                        <p>16</p>
                    </div>
                </div>
            </div>
            <div class="accessibleSection">
                <h3>Accessible:</h3>
                <div class="options">
                    <div class="chooseContainer" id="public">
                        <div id="public" class="checkbox"></div>
                        <p>Public</p>
                    </div>
                    <div class="chooseContainer" id="private">
                        <div id="private" class="checkbox"></div>
                        <p>Private</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

const list = `
        <div class="mainHeader">
            <img id="close-button" src="/assets/icons/close-x-icon.svg"/>
            <div class="searchAndFilterContainer">
                <div class="tournament-search">
                    <input type="text" placeholder="Tournament Name"/>
                    <img src="/images/svg-header/search.svg">
                </div>
                <img id="filter-tournaments" src="/assets/icons/filter-icon.svg">
            </div>
            <img id="private-tournament" src="/assets/icons/lock-icon.svg">
        </div>
        ${filterContent}
        <div class="line">
            <img class="separator" src="/assets/images/tournament/separator.svg"/>
        </div>
        <div class="tournaments-list">
            <h1 style="color: #d9d9d950; margin: 50px; text-align: center; display: none;">No Tournament Available Right Now</h1>
        </div>
`;


const cssContent = /*css*/`


    * {
        margin: 0;
        padding: 0;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    *::-webkit-scrollbar {
        display: none;
    }

    :host {
        width: 100%;
        height: 100%;
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
        height: 85%;
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
        gap: 15px;
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
        justify-content: space-between;
        width: calc(100% - 60px);
        height: 40px;
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

    .searchAndFilterContainer {
        width: 65%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        margin: 10px 0;
    }

    #filter-tournaments {
        display: flex;
        width: 28px;
        height: 24px;
        align-items: start;
        justify-content: center;
        margin: 10px;
    }

    .filterbox {
        display: flex;
        flex-direction: column;
        width: 28px;
        height: 24px;
        align-items: start;
        justify-content: center;
        margin: 10px;
        position: relative;
    }

    .tournament-search {
        height: 40px;
        width: calc(100% - 40px);
        border-radius: 7px;
        border: 1px solid aqua;
        padding-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
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
        margin-bottom: 10px;
        gap: 24px;
        overflow-y: scroll;
    }


    .tournament-item {
     width: 100%;
     min-width: 200px;
     display: flex;
     align-items: center;
    }

    .leftContainer {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
        align-items: start;
    }

    .tournament-name {
        margin: 0;
    }

    .tournament-info {
        width: 100%;
        display: flex;
        justify-content: start;
        gap: 30px;

    }

    .tournament-info div {
        display: inherit;
        gap: 4px;
    }

    p {
        font-size: 10px;
    }


    .rightContainer {
        flex: 1;
        min-width: 150px;
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
        background: url("/assets/icons/join-icon.svg");
        background-repeat: no-repeat;
        background-size: cover;
        border: none;
    }

    .lock-button {
        width: 24px;
        height: 27px;
        background: url("/assets/icons/lock-icon.svg");
        background-repeat: no-repeat;
        background-size: cover;
        outline: none;
        border: none;
    }


    .line > img {
        height: 12px;
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


    .filterContainer {
        width: 85%;
        display: none;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }

    .filterSection {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        gap: 20px;
        align-items: center;
        justify-content: space-around;
    }

    .searchBySection,
    .playersSection,
    .accessibleSection {
        gap: 20px;
        display: flex;
        align-items: center;
    }

    .options {
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 10px;
    }

    .filterSection h3 {
        width: 100%;

    }


    select {
        width: 150px;
        background: transparent;
        border: 1.5px solid aqua;
        border-radius: 5px;
        height: 100%;
        color: white;
        font-size: 12px;
    }

    .doneButton {
        background-color: transparent;
        color: white;
        width: 60px;
        height: 24px;
        border: 1.5px solid aqua;
        border-radius: 5px;
    }









    .chooseContainer {
        display: flex;
        gap: 5px;
        height: 16px;
        font-size: 16px;
        align-items: center;
        
    }
    
    
    .checkbox {
        width: 16px;
        height: 16px;
        border: 2px solid #cccccc60;
        border-radius: 4px;
    }
    
    
    .aqua-border {
        border: 2px solid aqua;
        display: flex;
        border-radius: 5px;
        align-items: center;
        justify-content: center;
        background: url("/assets/icons/checked-icon.svg");
        background-repeat: no-repeat;
        background-size: cover;
    }

    .choice {
        width: 17px;
        height: 17px;
        border-radius: 100px;
        background: #cccccc60;
    }
    
    .aqua {
        background: aqua;
    }

`;


customElements.define("join-tournament", JoinTournament);