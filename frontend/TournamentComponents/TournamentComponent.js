
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
`;


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
    /*
        <div class="rounds">
            <tournament-round></tournament-round>
        </div>

        <div class="rounds">
            <custom-button></custom-button>
        </div>

    <div class="final">
        <custom-button> mehdi </custom-button>
        <h1> VS </h1>
        <custom-button reverse> esalim </custom-button>
    </div>
        
    */


        
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

    semiFinalStage() {
        const _semiFinal = document.createElement("div");
        _final.className = "rounds";

        

    }

    getTournamentRound(firstPlayer, secondPlayer, reverse) {
        const tournamentRound = document.createElement("tournament-round");
        if (reverse)
            tournamentRound.reverse = "true";
        tournamentRound.innerHTML = `
            <div slot="firstPlayer">
                <c-hexagon class="firstPlayer" width="32px" height="32px" apply="true" bcolor="aqua">
                    <div slot="content" class="c-hexagon-content" style="background: url(/frontend/assets/profile-assets/tanjuro.jpg) center / cover no-repeat;"></div>
                </c-hexagon>
                <h4>${firstPlayer}</h4>
            </div>
            <div slot="secondPlayer">
                <c-hexagon class="secondPlayer" width="32px" height="32px" apply="true" bcolor="aqua">
                    <div slot="content" class="c-hexagon-content" style="background: url(/frontend/assets/profile-assets/tanjuro.jpg) center / cover no-repeat;"></div>
                </c-hexagon>
                <h4>${secondPlayer}</h4>
            </div>
        `;
        return tournamentRound;
    }

    generateRounds(numberOfPlayers, reverse) {
        const rounds = document.createElement("div");
        rounds.className = "rounds";
        for (let index = 0; index < numberOfPlayers / 2; index++)
            rounds.appendChild(this.getTournamentRound("elmehdi", "salim", reverse));
        return rounds;
    }

    connectedCallback() {
        const mainContainer = this.shadowRoot.querySelector(".mainContainer");
        const tournamentsTable = document.createElement("tournaments-table");
        tournamentsTable.style.width = "100%";
        mainContainer.appendChild(tournamentsTable);
        const firstButton = this.shadowRoot.getElementById("firstButton");
        const secondButton = this.shadowRoot.getElementById("secondButton");
        firstButton.addEventListener("click", () => {
            const buttonValue = firstButton.querySelector("h3");
            if (buttonValue.textContent == "CANCEL") {
                mainContainer.innerHTML = '';
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
                {
                    mainContainer.innerHTML = '';
                    this.shadowRoot.querySelector(".tournament-actions").innerHTML = '';
                    mainContainer.appendChild(this.generateRounds(8, null));
                    mainContainer.appendChild(this.generateRounds(4, null));
                    mainContainer.appendChild(this.generateRounds(2, null));
                    mainContainer.appendChild(this.finalStage("elmehdi", "salim"));
                    mainContainer.appendChild(this.generateRounds(2, true));
                    mainContainer.appendChild(this.generateRounds(4, true));
                    mainContainer.appendChild(this.generateRounds(8, true));
                }
                else
                {
                    console.log("Please fill all inputs field!!");
                }
            }
            else if (buttonValue.textContent == "CONTINUE")
            {
                console.log("continue button !!");

            }
            else {
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

