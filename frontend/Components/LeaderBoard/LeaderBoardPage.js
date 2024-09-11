export class LeaderBoardPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <page-name width="17%">
                <div slot="text" class="pageNameText">
                    <h1>LeaderBoard</h1>
                </div>
            </page-name>
            <div class="mainContainer">
            
                <div class="leagues">
                    ${leagues}
                </div>
                <div class="leaderboard-table">

                    <table>
                        <thead>
                            <tr>
                                <th class="rank">RANK</th>
                                <th class="profile">PLAYER</th>
                                <th>TOTAL GAME</th>
                                <th>TOTAL WIN</th>
                                <th>TOTAL LOSS</th>
                                <th>WIN RATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="rank">
                                    <div class="rank-value">
                                        <h1> 1 </h1>
                                    </div>
                                </td>
                                <td class="profile">
                                    <c-hexagon width="48px" height="48px" apply="true" bcolor="#B54C1E" >
                                        <div slot="content" class="c-hexagon-content"></div>
                                    </c-hexagon>
                                    <h3>esalim</h3>
                                </td>
                                <td>4571</td>
                                <td>3054</td>
                                <td>1517</td>
                                <td>78.14%</td>
                            </tr>
                            <tr>
                                <td class="rank">
                                    <div class="rank-value">
                                        <h1> 2 </h1>
                                    </div>
                                </td>
                                <td class="profile">
                                    <c-hexagon width="48px" height="48px" apply="true" bcolor="#B54C1E" >
                                        <div slot="content" class="c-hexagon-content"></div>
                                    </c-hexagon>
                                    <h3>mehdi</h3>
                                </td>
                                <td>4571</td>
                                <td>3054</td>
                                <td>1517</td>
                                <td>78.14%</td>
                            </tr>
            
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    conectedCallback() {

    }
}

customElements.define("ranking-page", LeaderBoardPage)

const cssContent = /*css*/`
    * {
        margin: 0;
        padding: 0;
    }

    h2 {
        color: white;
    }

    :host {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background: #d9d9d910;
    }


    .mainContainer {
        width: 100%;
        height: 100%;
        display: flex;
        align-items:  center;
        justify-content: center;
    }


    .leagues {
        flex: 1.2;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 50px;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .leaderboard-table {
        flex: 4;
        height: calc(100% - 80px);
        display: flex;
        margin-right: 20px;
        flex-direction: column;
        gap: 10px;
    }


    .league-container {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 20px;
    }

    .league-definition {
        flex-grow: 1;
        height: 100%;
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .league-section {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 80%;
        height: 64px;
        opacity: 0.8;
    }

    .league-section:hover {
        width: calc(80% + 20px);
        height: 74px;
        opacity: 1;
    }

    table {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    thead {
        width: 100%;
        height: 48px;
        display: flex;
        background: linear-gradient(180deg, #00fffc10 0%, #00fffc10 35%, #00fffc10 100%);
    }
    
    
    tbody {
        width: 100%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    tr {
        width: 100%;
        height: 100%;
        display: flex;
        opacity: 0.8;
    }

    tr:hover {
        opacity: 1;
    }

    th, td {
        flex: 1;
        display: flex;
        align-items: center;
        margin-left: 10px;
    }

    tbody > tr {
        display: flex;
        width: 100%;
        height: 64px;
        color: white;
        background: #EB4545;
        background: linear-gradient(90deg, rgba(208,60,60,0.5) 0%, rgba(208,60,60,0.05) 100%);
        border-left: 5px solid rgba(208,60,60, 1);
    }
    
    .rank {
        flex: 0.5;
    }
    
    .profile {
        flex: 2;
    }

    .table-body-column {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Sansation Bold';
    }
    .rank-value {
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 100%;
        height: 100%;
    }






    .legendary {
        color: rgb(208,60,60);
        background: rgb(208,60,60);
        background: linear-gradient(180deg, rgba(208,60,60,0.5) 0%, rgba(208,60,60,0.2) 35%, rgba(208,60,60,0.02) 100%);
        border-top: 5px solid #EB4545;
    }

    .platinum {
        color: #459BEB;
        background: #459BEB;
        background: linear-gradient(180deg, #459BEB50 0%, #459BEB20 35%, #459BEB00 100%);
        border-top: 5px solid #459BEB;
    }

    .gold {
        color: rgb(235,154,69);
        background: rgb(235,154,69);
        background: linear-gradient(180deg, rgba(235,154,69,0.5) 0%, rgba(235,154,69,0.2) 35%, rgba(235,154,69,0.02) 100%);
        border-top: 5px solid rgba(235,154,69,1);
    }
    
    .silver {
        color: #C0C0C0;
        background: #C0C0C0;
        background: linear-gradient(180deg, #C0C0C050 0%, #C0C0C020 35%, #C0C0C002 100%);
        border-top: 5px solid #C0C0C0;
    }
    
    .bronze {
        color: #B54C1E;
        background: #B54C1E;
        background: linear-gradient(180deg, #B54C1E50 0%, #B54C1E20 35%, #B54C1E02 100%);
        border-top: 5px solid #B54C1E;
    }
`;





const leagues = `
                    <div class="league-section">
                        <div class="league-container legendary">
                            <div class="league-definition">
                                <img src="/assets/images/leagues/legendary-league.svg" width="48px"></img>
                                <h3>LEGENDARY</h3>
                            </div>
                            <h2>457</h2>
                        </div>
                    </div>
                    <div class="league-section">
                        <div class="league-container platinum">
                            <div class="league-definition">
                                <img src="/assets/images/leagues/platinum-league.svg" width="48px"></img>
                                <h3>PLATINUM</h3>
                            </div>
                            <h2>984</h2>
                        </div>
                    </div>
                    <div class="league-section">

                        <div class="league-container gold">
                            <div class="league-definition">
                                <img src="/assets/images/leagues/gold-league.svg" width="48px"></img>
                                <h3>GOLD</h3>
                            </div>
                            <h2>548</h2>
                        </div>
                    </div>

                    <div class="league-section">

                        <div class="league-container silver">
                            <div class="league-definition">
                                <img src="/assets/images/leagues/silver-league.svg" width="48px"></img>
                                <h3>SILVER</h3>
                            </div>
                            <h2>1047</h2>
                        </div>
                    </div>
                    <div class="league-section">

                        <div class="league-container bronze">
                            <div class="league-definition">
                                <img src="/assets/images/leagues/bronze-league.svg" width="48px"></img>
                                <h3>BRONZE</h3>
                            </div>
                            <h2>814</h2>
                        </div>
                    </div>
`;