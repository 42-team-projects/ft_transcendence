import { HOST } from "/Utils/GlobalVariables.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";
import { AddPlayerComponent } from "/Components/Tournament/AddPlayerComponent.js";
import { CustomButton } from "/Components/Tournament/CustomButton.js";
import { TournamentRound } from "/Components/Tournament/TournamentRound.js";
import { router } from "/root/Router.js";
import { get_tournament_by_id } from "/Components/Tournament/configs/TournamentAPIConfigs.js";
import { getCurrentPlayerId } from "/Utils/GlobalVariables.js";

export class GenerateRounds extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="container"></div>
            <custom-button id="back-button" width="200px" height="56px">
                <h1>back</h1>
            </custom-button>
        `;

        this.shadowRoot.querySelector("#back-button").addEventListener("click", () => {
            const url = new URL(HOST + "/Tournament");
            router.handleRoute(url.pathname);
        });
    }

        
    finalStage(firstPlayer, secondPlayer) {
        const _final = document.createElement("div");
        _final.className = "final";
        _final.innerHTML = `
            <custom-button>
                <h4>${firstPlayer}</h4>
            </custom-button>
            <h1> VS </h1>
            <custom-button reverse>
                <h4>${secondPlayer}</h4>
            </custom-button>
        `;
        return _final;
    }

    getPlayerInfo(player, slot, nextRounds) {
        const playerContainer = document.createElement("div");
        playerContainer.slot = slot;
        if (nextRounds)
            return playerContainer;
        if (player)
            playerContainer.innerHTML = `
                    <c-hexagon class="${slot}" width="32px" height="32px" apply="true" bcolor="${getLeagueColor(player.stats.league)}">
                        <div slot="content" class="c-hexagon-content" style="background: url(${HOST + player.user.avatar}) center / cover no-repeat;"></div>
                    </c-hexagon>
                    <h4>${player.user.username}</h4>
                `;
        else
            playerContainer.innerHTML = `<img loading="lazy" class="addPlayer" src="/assets/images/profile/add-friends-icon.svg" width="24px"/>`;
        const hexagon = playerContainer.querySelector("c-hexagon");
        if (hexagon) {
            playerContainer.addEventListener("click", () => {
                const url = new URL(HOST + "/Profile/" + player.user.username);
                router.handleRoute(url.pathname);
            });
        }
        const addPlayer = playerContainer.querySelector(".addPlayer");
        if (addPlayer) {
            playerContainer.addEventListener("click", () => {
                const container = this.shadowRoot.querySelector(".container");
                container.style.opacity = 0.5;
                const addPlayerContainer = document.createElement("div");
                addPlayerContainer.className = "addPlayerContainer";
                addPlayerContainer.innerHTML = `
                <div class="box">
                    <div class="friendsList">
                        <img loading="lazy" class="closeButton" src="/assets/icons/close-x-icon.svg"/>
                        <h2>YOUR FRIENDS</h2>
                        <div class="line">
                            <img loading="lazy" class="separator" src="/assets/images/tournament/separator.svg"/>
                        </div>
                        <add-player-component tournament-id="${this.tournamentId}"></add-player-component>
                    </div>
                </div>
                `;
                addPlayerContainer.querySelector(".closeButton").addEventListener("click", () => {
                    container.style.opacity = 1;
                    this.shadowRoot.removeChild(addPlayerContainer);
                });
                this.shadowRoot.appendChild(addPlayerContainer);
            })
        }
    ;

        return playerContainer;
    }

    getTournamentRound(firstPlayer, secondPlayer, nextRounds, reverse) {
        const tournamentRound = document.createElement("tournament-round");
        if (reverse)
            tournamentRound.reverse = "true";


        tournamentRound.appendChild(this.getPlayerInfo(firstPlayer, "firstPlayer", nextRounds));
        tournamentRound.appendChild(this.getPlayerInfo(secondPlayer, "secondPlayer", nextRounds));

        return tournamentRound;
    }

    generateRounds(numberOfPlayers, players, nextRounds, reverse) {
        const rounds = document.createElement("div");
        rounds.className = "rounds";
        for (let index = 0; index < numberOfPlayers / 2; index++)
        {
            if (players.length > index)
            {
                const player = players[index];
                rounds.appendChild(this.getTournamentRound(player.firstPlayer, player.secondPlayer, nextRounds, reverse));
            }
            else
                rounds.appendChild(this.getTournamentRound(null, null, nextRounds, reverse));
        }
        return rounds;
    }
    
    convertPlayersDataIntoRounds(players) {
        let rounds = [];
    
        const numberOfPlayers = players.length;
        let middle = Math.floor(numberOfPlayers / 2);
    
        // If the number of players is odd, we increment the middle index
        if (numberOfPlayers % 2 !== 0) {
            middle++;
        }
    
        for (let index = 0; index < players.length; index += 2) {
            let element = {firstPlayer: null, secondPlayer: null};
            if (players[index])
                element.firstPlayer = players[index];
            if (players[index + 1])
                element.secondPlayer =  players[index + 1];
            rounds.push(element);
        }
        return rounds;
    }

    structuringRounds(leftRounds, rightRounds) {
        const container = this.shadowRoot.querySelector(".container");
        container.innerHTML = '';
        const left = this.numberOfPlayers / 2;
        const right = this.numberOfPlayers / 2;

        if (left > 4)
            container.appendChild(this.generateRounds(8, leftRounds, null, null));
        if (left > 2)
            container.appendChild(this.generateRounds(4, left > 4 ? [] : leftRounds, left > 4, null));

        container.appendChild(this.generateRounds(2, left > 2 ? [] : leftRounds, left > 2, null));

        container.appendChild(this.finalStage("", ""));

        container.appendChild(this.generateRounds(2, right > 2 ? [] : rightRounds, right > 2, true));

        if (right > 2)
            container.appendChild(this.generateRounds(4, right > 4 ? [] : rightRounds, right > 4, true));
        if (right > 4)
            container.appendChild(this.generateRounds(8, rightRounds, null, true));
    }

    generateRoundsGraph(players) {
        let middle = Math.floor(players.length / 2);
        if (players.length % 2 !== 0)
            middle++;

        const leftRounds = players.slice(0, middle);

        const rightRounds = players.slice(middle);

       this.structuringRounds(leftRounds, rightRounds);

    }
    tournamentId;
    async connectedCallback() {
        this.tournamentId = window.location.pathname.substring(12);
        if (!this.tournamentId || this.tournamentId === "")
        {
            const url = new URL(HOST + "/Tournament");
            router.handleRoute(url.pathname);
            return ;
        }

        const currentPlayerId = await getCurrentPlayerId();
        const tournamentData = await get_tournament_by_id(this.tournamentId);
        if (!tournamentData)
            return;
        const player = Array.from(tournamentData.players).find(player => player.id === currentPlayerId);
        if (!tournamentData || !player || player === 'undefined') {
            const url = new URL(HOST + "/Tournament");
            router.handleRoute(url.pathname);
            return ;
        }
        const tournamentPlayers = tournamentData.players;
        this.numberOfPlayers = tournamentData.number_of_players;
        this.generateRoundsGraph(this.convertPlayersDataIntoRounds(tournamentPlayers));

    }

    disconnectedCallback() {

    }

}

const cssContent = /*css*/`
    * {
        margin: 0;
        padding: 0;

    }

    *::-webkit-scrollbar {
        display: none;
    }
    
    :host {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: 'Sansation Bold';
    }

    .container {
        width: 100%;
        height: 100%;
        display: flex;
        opacity: 1;
    }

    h2 {
        margin: 0;
    }

    .rounds,
    .final {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .final {
        flex-direction: row;
        gap: 20px;
    }

    .rounds > tournament-round > div {
        display: flex;
        width: 100%;
        height: 100%;
        max-width: 200px;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .c-hexagon-content {
        width: 100%;
        height: 100%;
    }
    h4 {
        max-width: 90px;
        overflow-x: scroll;
    }

    .addPlayerContainer {
        width: 100%;
        height: 100%;
        background-color: #124B6C30;
        position: absolute;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
    }


    .box {
        width: 30%;
        height: 95%;
        min-width: 600px;
        display: flex;
        flex-direction: column;
        clip-path: polygon(0 0, calc(100% - 30px) 0%, 100% 30px, 100% 100%, 30px 100%, 0% calc(100% - 30px));
        background-color: aqua; 
        align-items: center;
        justify-content: center;
    }

    .friendsList {
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
        position: relative;
        gap: 10px;

    }


    .closeButton {
        position: absolute;
        left: 10px;
        top: 10px;
        width: 24px;
        height: 24px;
        opacity: 0.75;
    }

    .friendsList h2 {
        font-size: 40px;
        display: flex;
        align-items: center;
        margin: 10px;

    }

    .line {
        height: 2px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }

`;

customElements.define("generate-rounds", GenerateRounds);