import { apiUrl, playerId } from "../Utils/GlobalVariables.js";
import { GenerateRounds } from "./GenerateRounds.js";
import { JoinTournament } from "./JoinTournament.js";

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


        `;
    }

    async connectedCallback() {
        const mainContainer = this.shadowRoot.querySelector(".mainContainer");
        let tournamentsTable = document.createElement("tournaments-table");
        tournamentsTable.style.width = "100%";
        mainContainer.appendChild(tournamentsTable);
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
        height: calc(100% - 80px);
    }


`;
