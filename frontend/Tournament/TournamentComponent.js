import { apiUrl, playerId } from "../Utils/GlobalVariables.js";
import { GenerateRounds } from "./GenerateRounds.js";
import { JoinTournament } from "./JoinTournament.js";

export class TournamentComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    async connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
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
                    height: calc(100% - 62px);
                }
                tournaments-table {
                    width: 100%;
                }
            </style>
            <page-name width="23%">
                <h2 slot="text">TOURNAMENTS LIST</h2>
            </page-name>
            <div style="height:62px; width:100%;"></div>
            <div class="mainContainer">
                <tournaments-table></tournaments-table>
            </div>
        `;
    }

    disconnectedCallback() {
        // Clean up if necessary
    }

    static observedAttributes = [];

    attributeChangedCallback(attrName, oldValue, newValue) {
        // Handle attribute changes if needed
    }
}

customElements.define("tournament-page", TournamentComponent);
