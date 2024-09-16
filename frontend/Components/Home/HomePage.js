import { getApiData } from "/Utils/APIManager.js";
import { PROFILE_API_URL } from "/Utils/GlobalVariables.js";
import { LeaderboardItem } from "/Components/Home/Leaderboard/LeaderboardItem.js";
import { HOST } from "/Utils/GlobalVariables.js";
import { getAbi } from "/blockchain/blockchain.js";

export class HomePage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="homeContainer">
                <div class="history">
                    <div class="stats">
                        <h1>PLAY NOW</h1>
                    </div>
                    <custom-table username="me"></custom-table>
                </div>
                <div class="leaderboard">
                    <page-name width="35%">
                        <div slot="text" class="pageNameText">
                            <h2>Leaderboard</h2>
                        </div>
                    </page-name>
                    <div class="leaderboard-content">
                        <div class="top-board">
                            <div class="second-place">
                                <c-hexagon width="110px" height="110px" apply="true" >
                                    <div slot="content" class="c-hexagon-content"></div>
                                </c-hexagon>
                                <user-rank width="80px" height="110px"> 
                                    <h2> 2 </h2>
                                </user-rank>
                            </div>
                            <div class="first-place">
                                <c-hexagon width="130px" height="130px" apply="true" >
                                    <div slot="content" class="c-hexagon-content"></div>
                                </c-hexagon>
                                <user-rank width="90px" height="130px"> 
                                    <h2> 2 </h2>
                                </user-rank>
                            </div>
                            <div class="third-place">
                                <c-hexagon width="90px" height="90px" apply="true" >
                                    <div slot="content" class="c-hexagon-content"></div>
                                </c-hexagon>
                                <user-rank width="60px" height="90px"> 
                                    <h2> 2 </h2>
                                </user-rank>
                            </div>
                        </div>


                        <div class="body-board"></div>


                    </div>
                </div>
            </div>
        `;
    }
    async connectedCallback() {

        const stats = this.shadowRoot.querySelector(".stats");
        stats.addEventListener("click", async () => {
            const abi = await getAbi();
            console.log('abi: ' ,abi);
            // await leaveTournamentAndStoreScore(tournament_id, opponent_id, opponent_score, user_id, user_score, abi);
        });

        const leaderboardList = this.shadowRoot.querySelector(".body-board");
        const players = await getApiData(PROFILE_API_URL + "leaderboard/");
        if (!players)
            return ;
        for (let index = 0; index < players.length; index++) {
            const element = players[index];
            const result = this.createNewPlayerItem(index + 1, element);
            leaderboardList.appendChild(result);
        }
    }


    createNewPlayerItem(rank, player) {
        const newItem = new LeaderboardItem();
        newItem.rank = rank;
        newItem.username = player.user.username;
        newItem.profile = HOST + player.user.avatar;
        newItem.league = player.stats.league;
        newItem.total_win = player.stats.total_win;
        return newItem;
    }
}

customElements.define("home-page", HomePage);

const cssContent = /*css*/`

* {
    margin: 0;
    padding: 0;
}

:host {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: scroll;
}

.homeContainer {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    min-width: 400px;
    gap: 50px;
}

.history {
    flex: 2.5;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
}

.leaderboard {
    flex: 1;
    height: 100%;
    min-width: 400px;
    position: relative;
    background: #d9d9d910;
    border-radius: 10px;
}

.leaderboard-content {
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 80px;
    gap: 30px;
}

*::-webkit-scrollbar {
    display: none;
}

.top-board {
    width: 80%;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
}

.first-place,
.second-place,
.third-place {
    display: flex;
    justify-content: center;
    flex: 1;
    height: 100%;
    position: relative;
}

.third-place user-rank {
    margin-top: 60px;
}
.second-place user-rank {
    margin-top: 70px;
    
}
.first-place user-rank {
    margin-top: 80px;
}

.body-board {
    width: 100%;
    flex: 2.5;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    overflow: scroll;

}

leaderboard-item {
    width: 100%;
    height: 96px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.leaderboard-item-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 10px;
}

.stats {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url("/assets/images/home/banner-image.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    opacity: 0.5;
    position: relative;
}
.stats:hover {
    opacity: 1;
}

.stats h1 {
    position: absolute;
    bottom: 20px;
    right: 30px;
}

.stats h2 {
    position: absolute;
    top: 20px;
    left: 30px;
    font-size: 30px;
    max-width: 400px;
}

custom-table {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}

`;