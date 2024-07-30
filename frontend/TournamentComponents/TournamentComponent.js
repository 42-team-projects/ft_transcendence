
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
            <div class="mainContainer">
                <create-tournament></create-tournament>
            </div>
            <div class="tournament-actions">
                <custom-button width="300px">
                    <h3>JOIN TOURNAMENT</h3>
                </custom-button>
                <custom-button width="300px" background-color="#0C9BA3" reflect>
                    <h3>CREATE TOURNAMENT</h3>
                </custom-button>
            </div>

        `;
    }

    connectedCallback() {

    }




    disconnectedCallback() {

    }

    static observedAttributes = [];

    attributeChangedCallback(attrName, oldVdalue, newValue) {

    }
}

