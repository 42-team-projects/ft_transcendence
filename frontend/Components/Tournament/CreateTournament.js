import { PlayersAndStages } from "/Components/Tournament/PlayersAndStages.js";
import { TournamentRules } from "/Components/Tournament/TournamentRules.js";
import { Visibility } from "/Components/Tournament/VisibillitySettings.js";
import { CustomSelect } from "/Components/CustomElements/CustomSelect.js";

export class CreateTournament extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="settings-section">

                <div class="itemContainer">

                    <div class="item">
                        <custom-select id="nickname" label="Nickname"></custom-select>
                    </div>
                    <div style="height: 50px;"></div>
                    <div class="item">
                        <h2>Tournament Name</h2>
                        <div class="settingsform">
                            <input type="text" placeholder="Tournament Name...">
                        </div>
                    </div>
                </div>

                <players-and-stages></players-and-stages>

                <visibillity-settings></visibillity-settings>

            </div>
            <tournament-rules></tournament-rules>
        `;
    }
        
        // <qrcode-component></qrcode-component>


    connectedCallback() {
    }

    disconnectedCallback() {

    }


    get data() {
        let apiData = {nickname: null, name: null, num_players: 0, access: false, password: null, owner: null};

        const name = this.shadowRoot.querySelector(".item .settingsform input");
        if (name)
        {
            if (name.value.length < 3 || name.value.length > 24)
            {
                name.style.border = "1px solid red";
                return null;
            }
            name.style.border = "1px solid aqua";
            apiData.name = name.value;
        }
        const nickname = this.shadowRoot.querySelector("custom-select");
        if (nickname)
            apiData.nickname = nickname.value;

        apiData.access = this.shadowRoot.querySelector("visibillity-settings").access;
        if (!apiData.access)
            return null;
        apiData.password = this.shadowRoot.querySelector("visibillity-settings").password;
        if (apiData.access.toLowerCase() == "private" && !apiData.password)
            return null;
        apiData.num_players = this.shadowRoot.querySelector("players-and-stages").selectItemId;
        if (!apiData.num_players)
            return null;
        return apiData;
    };

    static observedAttributes = [];

    attributeChangedCallback(attrName, oldVdalue, newValue) {}

}

customElements.define("create-tournament", CreateTournament);

const cssContent = /*css*/`

:host {
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 20px;
    flex-wrap: wrap;
    gap: 20px;
}

.settings-section {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    margin-left: 50px;
    min-width: 700px;
}

.itemContainer {

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}


.item h1 {
    min-width: 200px;
    flex: 1;
}

.item h2 {
    font-family: 'Sansation';
    flex: 1;
}


.settingsform {
    flex: 1;
    width: 300px;
    height: 40px;
    display: flex;
    gap: 20px;
}

.settingsform input {
    height: 100%;
    border-radius: 10px;
    border: 1.5px solid aqua;
    width: 50%;
    background-color: transparent;
    font-family: 'Sansation Bold';
    color: #ffffff;
    margin-left: 10px;
    padding-left: 20px;
    outline: none;
}

.chooseContainer {
    display: flex;
    gap: 10px;
    height: 26px;
    font-size: 16px;
    align-items: center;
    
}


.checkbox {
    width: 26px;
    height: 26px;
    border: 2px solid #cccccc60;
    border-radius: 5px;
}


.aqua-border {
    border: 2px solid aqua;
    display: flex;
    border-radius: 7px;
    align-items: center;
    justify-content: center;
    background: url("/assets/icons/checked-icon.svg");
    background-repeat: no-repeat;
    background-size: cover;
}

`;