
const fakePlayers = [
    {
        firstPlayer: "mehdi",
        secondPlayer: "salim"
    },
    {
        firstPlayer: "omar",
        secondPlayer: "khalid"
    },
    {
        firstPlayer: "yassine",
        secondPlayer: "ali"
    },
    {
        firstPlayer: "asdf",
        secondPlayer: "avfdli"
    },
    {
        firstPlayer: "qwe",
        secondPlayer: "awerli"
    },
    {
        firstPlayer: "qqqqq"
    }
];

export class TournamentComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <page-name width="23%">
                <h2 slot="text">TOURNAMENTS LIST</h2>
            </page-name>
            <div style="height:62px; width:100%;"></div>

            <div class="mainContainer"></div>

            <div class="tournament-actions">
                <custom-button id="firstButton" width="300px">
                    <h3>JOIN TOURNAMENT</h3>
                </custom-button>
                <custom-button id="secondButton" width="300px" background-color="#0C9BA3" reverse>
                    <h3>CREATE TOURNAMENT</h3>
                </custom-button>
            </div>

        `;
    }

        
    finalStage(firstPlayer, secondPlayer) {
        const _final = document.createElement("div");
        _final.className = "final";
        _final.innerHTML = `
            <custom-button>
                <c-hexagon class="firstPlayer" width="32px" height="32px" apply="true" bcolor="aqua">
                    <div slot="content" class="c-hexagon-content" style="background: url(/frontend/assets/profile-assets/tanjuro.jpg) center / cover no-repeat;"></div>
                </c-hexagon>
                <h4>${firstPlayer}</h4>
            </custom-button>
            <h1> VS </h1>
            <custom-button reverse>
                <c-hexagon class="firstPlayer" width="32px" height="32px" apply="true" bcolor="aqua">
                    <div slot="content" class="c-hexagon-content" style="background: url(/frontend/assets/profile-assets/tanjuro.jpg) center / cover no-repeat;"></div>
                </c-hexagon>
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
                        <div slot="content" class="c-hexagon-content" style="background: url(/frontend/assets/profile-assets/tanjuro.jpg) center / cover no-repeat;"></div>
                    </c-hexagon>
                    <h4>${PlayerName}</h4>
                `;
        else
            player.innerHTML = `<img src="/frontend/assets/profile-assets/add-friends-icon.svg" width="24px"/>`;
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
    
    generateRoundsGraph(mainContainer, players) {
        const leftRounds = players.slice(0, players.length / 2);
        const rightRounds = players.slice(players.length / 2);
        mainContainer.innerHTML = '';
        this.shadowRoot.querySelector(".tournament-actions").innerHTML = '';
        mainContainer.appendChild(this.generateRounds(8, leftRounds, null, null));
        mainContainer.appendChild(this.generateRounds(4, [], true, null));
        mainContainer.appendChild(this.generateRounds(2, [], true, null));
        mainContainer.appendChild(this.finalStage("", ""));
        mainContainer.appendChild(this.generateRounds(2, [], true, true));
        mainContainer.appendChild(this.generateRounds(4, [], true, true));
        mainContainer.appendChild(this.generateRounds(8, rightRounds, null, true));
    }

    connectedCallback() {
        const mainContainer = this.shadowRoot.querySelector(".mainContainer");
        let tournamentsTable = document.createElement("tournaments-table");
        tournamentsTable.style.width = "100%";
        mainContainer.appendChild(tournamentsTable);
        const firstButton = this.shadowRoot.getElementById("firstButton");
        const secondButton = this.shadowRoot.getElementById("secondButton");
        firstButton.addEventListener("click", () => {
            const buttonValue = firstButton.querySelector("h3");
            if (buttonValue.textContent == "CANCEL") {
                mainContainer.innerHTML = '';
                tournamentsTable = document.createElement("tournaments-table");
                tournamentsTable.style.width = "100%";
                mainContainer.appendChild(tournamentsTable);
                buttonValue.textContent = "JOIN TOURNAMENT";
                secondButton.querySelector("h3").textContent = "CREATE TOURNAMENT";
            }
            else {

            }
        });
        secondButton.addEventListener("click", () => {
            const buttonValue = secondButton.querySelector("h3");
            if (buttonValue.textContent == "GENERATE") {
                const value = this.shadowRoot.querySelector("create-tournament").data;
                if (value)
                    this.generateRoundsGraph(mainContainer, fakePlayers);
                else
                    console.log("Please fill all inputs field!!");
            }
            else
            {
                mainContainer.innerHTML = '';
                mainContainer.appendChild(document.createElement("create-tournament"));
                buttonValue.textContent = "GENERATE";
                firstButton.querySelector("h3").textContent = "CANCEL";
            }
        });
    }




    disconnectedCallback() {

    }

    static observedAttributes = [];

    attributeChangedCallback(attrName, oldVdalue, newValue) {

    }
}


const cssContent = /*css*/`
    :host {
        font-family: 'Sansation Bold', 'Sansation';
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        padding-top: 80px;
        background-color: #d9d9d920;
        color: white;
    }

    .mainContainer {
        display: flex;
        width: 100%;
        height: calc(100% - 60px);
        overflow-y: scroll;
    }

    h2 {
        margin: 0;
    }

    .mainContainer::-webkit-scrollbar {
        opacity: 0.7;
        background-color: transparent;
        width: 2px;
    }

    .mainContainer::-webkit-scrollbar-track {
        opacity: 0.7;
        border-radius: 100px;
    }

    .mainContainer::-webkit-scrollbar-thumb {
        opacity: 0.7;
        background-color: aqua;
        border-radius: 100px;
    }
    


    .tournament-actions {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 40px;
        padding: 5px;
    }

    .settingsContainer {
        width: 100%;
        height: 100%;
        background: green;
        display: flex;
    }
    .settings-section {
        flex: 2;
        height: 100%;
        background: #cccc4040;
    }

    .qrcode-section {
        flex: 1;
        height: 100%;
        background: #ffffff40;
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

    h4::-webkit-scrollbar {
        display: none;
    }

`;
