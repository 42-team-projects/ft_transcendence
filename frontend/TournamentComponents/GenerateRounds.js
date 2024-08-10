
/*

<div class="addPlayerContainer" >
    <div class="friendsList">
        <h2>YOUR FRIENDS</h2>
        <div class="line">
            <img class="separator" src="../assets/login-assets/separator.svg"/>
        </div>
        <div class="friends">
            <div class="friend-item">
                <c-hexagon class="profile" width="78px" height="77px" apply="true" bcolor="aqua">
                    <div slot="content" class="c-hexagon-content"></div>
                </c-hexagon>
                <div class="text-content">
                    <h1>ESALIM</h1>
                    <h6>online</h6>
                </div>
                <img src="../assets/profile-assets/add-friends-icon.svg"/>
            </div>
        </div>
    </div>
</div>

*/

import { AddPlayerComponent } from "./AddPlayerComponent.js";

export class GenerateRounds extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="container"></div>
        `;
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

    getPlayerInfo(PlayerName, slot, nextRounds) {
        const player = document.createElement("div");
        player.slot = slot;
        if (nextRounds)
            return player;
        if (PlayerName)
            player.innerHTML = `
                    <c-hexagon class="${slot}" width="32px" height="32px" apply="true" bcolor="aqua">
                        <div slot="content" class="c-hexagon-content" style="background: url(../assets/profile-assets/tanjuro.jpg) center / cover no-repeat;"></div>
                    </c-hexagon>
                    <h4>${PlayerName}</h4>
                `;
        else
            player.innerHTML = `<img class="addPlayer" src="../assets/profile-assets/add-friends-icon.svg" width="24px"/>`;
        return player;
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
        console.log(players);
    
        const numberOfPlayers = players.length;
        let middle = Math.floor(numberOfPlayers / 2);
    
        // If the number of players is odd, we increment the middle index
        if (numberOfPlayers % 2 !== 0) {
            middle++;
        }
    
        for (let index = 0; index < players.length; index += 2) {
            let element = {firstPlayer: null, secondPlayer: null};
            if (players[index])
                element.firstPlayer = players[index].username;
            if (players[index + 1])
                element.secondPlayer =  players[index + 1].username;
            rounds.push(element);
        }
        return rounds;
    }

    structuringRounds(leftRounds, rightRounds) {
        const container = this.shadowRoot.querySelector(".container");
        container.innerHTML = '';
        const left = this.numberOfPlayers / 2;
        const right = this.numberOfPlayers / 2;
        console.log("rightRounds.length : ", rightRounds.length);
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

    connectedCallback() {
    }

    disconnectedCallback() {

    }

    set numberOfPlayers(value) {
        this.setAttribute("number-of-players", value);
    }

    get numberOfPlayers() { return this.getAttribute("number-of-players");}

    set players(val) {
        this.generateRoundsGraph(this.convertPlayersDataIntoRounds(val));
        this.addPlayerEventListener();
    };
    
    addPlayerEventListener() {
        const newPlayer = this.shadowRoot.querySelectorAll(".addPlayer");
        newPlayer.forEach( elem => {
            elem.addEventListener("click", () => {
                const container = this.shadowRoot.querySelector(".container");
                container.style.opacity = 0.5;
                const addPlayerContainer = document.createElement("div");
                addPlayerContainer.className = "addPlayerContainer";
                addPlayerContainer.innerHTML = `
                    <div class="friendsList">
                        <img class="closeButton" src="../assets/icons/close-x-icon.svg"/>
                        <h2>YOUR FRIENDS</h2>
                        <div class="line">
                            <img class="separator" src="../assets/login-assets/separator.svg"/>
                        </div>
                        <add-player-component></add-player-component>
                    </div>
                `;
                addPlayerContainer.querySelector(".closeButton").addEventListener("click", () => {
                    container.style.opacity = 1;
                    this.shadowRoot.removeChild(addPlayerContainer);
                });
                this.shadowRoot.appendChild(addPlayerContainer);
            });
        });
    }

    get players() {
        return this.getAttribute("players");
    };

    static observedAttributes = ["players"];

    attributeChangedCallback(attrName, oldVdalue, newValue) {
        // if (attrName == "players")
        //     this.generateRoundsGraph(JSON.stringify(newValue));
    }

}

const cssContent = /*css*/`
    * {
        margin: 0;
        padding: 0;

    }

    :host {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
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

    .friendsList {
        width: 30%;
        height: 95%;
        background-color: #124B6C;
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 600px;
        position: relative;
    }


    .closeButton {
        position: absolute;
        right: 10px;
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