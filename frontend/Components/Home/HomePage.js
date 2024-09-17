import { getApiData } from "/Utils/APIManager.js";
import { PROFILE_API_URL } from "/Utils/GlobalVariables.js";
import { LeaderboardItem } from "/Components/Home/Leaderboard/LeaderboardItem.js";
import { HOST } from "/Utils/GlobalVariables.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";
import { router } from "/root/Router.js";

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
                            <div class="second-place"></div>
                            <div class="first-place"></div>
                            <div class="third-place"></div>
                        </div>


                        <div class="body-board"></div>


                    </div>
                </div>
            </div>
        `;
    }

    createFirstPlaceItem(playerData) {
        const div = this.shadowRoot.querySelector(".first-place");
        div.innerHTML = `
            <c-hexagon width="130px" height="130px" apply="true" bcolor="${getLeagueColor(playerData.stats.league)}">
                <div slot="content" class="c-hexagon-content" style="background: url('${HOST + playerData.user.avatar}') center / cover no-repeat"></div>
            </c-hexagon>
            <user-rank width="90px" height="130px" bcolor="${getLeagueColor(playerData.stats.league)}"> 
                <h2> ${playerData.stats.rank} </h2>
            </user-rank>
        `;

        div.querySelector("c-hexagon").addEventListener("click", () => {
            const url = new URL(HOST + "/Profile/" + playerData.user.username);
            router.handleRoute(url.pathname);
        });
    }

    createSecondPlaceItem(playerData) {
        const div = this.shadowRoot.querySelector(".second-place");
        div.innerHTML = `
            <c-hexagon width="110px" height="110px" apply="true" bcolor="${getLeagueColor(playerData.stats.league)}">
                <div slot="content" class="c-hexagon-content" style="background: url('${HOST + playerData.user.avatar}') center / cover no-repeat"></div>
            </c-hexagon>
            <user-rank width="80px" height="110px" bcolor="${getLeagueColor(playerData.stats.league)}"> 
                <h2> ${playerData.stats.rank} </h2>
            </user-rank>
        `;
        div.querySelector("c-hexagon").addEventListener("click", () => {
            const url = new URL(HOST + "/Profile/" + playerData.user.username);
            router.handleRoute(url.pathname);
        });
    }

    createThirdPlaceItem(playerData) {
        const div = this.shadowRoot.querySelector(".third-place");
        div.innerHTML = `
            <c-hexagon width="90px" height="90px" apply="true" bcolor="${getLeagueColor(playerData.stats.league)}">
                <div slot="content" class="c-hexagon-content" style="background: url('${HOST + playerData.user.avatar}') center / cover no-repeat;"></div>
            </c-hexagon>
            <user-rank width="60px" height="90px" bcolor="${getLeagueColor(playerData.stats.league)}"> 
                <h2> ${playerData.stats.rank} </h2>
            </user-rank>
        `;
        div.querySelector("c-hexagon").addEventListener("click", () => {
            const url = new URL(HOST + "/Profile/" + playerData.user.username);
            router.handleRoute(url.pathname);
        });
    }

    async connectedCallback() {

        const stats = this.shadowRoot.querySelector(".stats");
        stats.addEventListener("click", async () => {
            // const abi = await getAbi();
            // console.log('abi: ' ,abi);
            // // await leaveTournamentAndStoreScore(tournament_id, opponent_id, opponent_score, user_id, user_score, abi);
        });

        const leaderboardList = this.shadowRoot.querySelector(".body-board");
        const players = await getApiData(PROFILE_API_URL + "leaderboard/");
        if (!players)
            return ;
        if (players.length > 1)
            this.createSecondPlaceItem(players[1]);
        if (players.length > 0)
            this.createFirstPlaceItem(players[0]);
        if (players.length > 2)
            this.createThirdPlaceItem(players[2]);
        for (let index = 3; index < players.length; index++) {
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
        newItem.total_win = player.stats.xp;
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
    justify-content: center;
    gap: 10px;
}

.first-place,
.second-place,
.third-place {
    display: flex;
    justify-content: center;
    flex: 1;
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