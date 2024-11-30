import { getApiData } from "/Utils/APIManager.js";
import { PROFILE_API_URL } from "/Utils/GlobalVariables.js";
import { LeaderboardItem } from "/Components/Home/Leaderboard/LeaderboardItem.js";
import { HOST } from "/Utils/GlobalVariables.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";
import { router } from "/root/Router.js";

export class HomePage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `    <style> ${cssContent} </style>    <div class="homeContainer">
                <div class="history">
                    <div class="stats">
                        ${glitchComponent}
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
        stats.addEventListener("click", async() => {
            const url = new URL(HOST + "/Game");
            router.handleRoute(url.pathname);
        });

        const leaderboardList = this.shadowRoot.querySelector(".body-board");
        const players = await getApiData(PROFILE_API_URL + "leaderboard/");
        if (!players)
            return;
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

const cssContent = /*css*/ `

@font-face {
    font-family: Cyber;
    src: url("https://assets.codepen.io/605876/Blender-Pro-Bold.otf");
    font-display: swap;
}

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
    background: transparent;
    border-radius: 10px;
    position: relative;
}



custom-table {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-family: 'Cyber', sans-serif;
}

`;




const glitchComponent = `
<style>


  section {
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  
  .hero {
    font-size: clamp(40px, 10vw, 100px);
    line-height: 1;
    display: inline-block;
    color: #fff;
    z-index: 2;
    letter-spacing: 10px;
  
    /* Bright things in dark environments usually cast that light, giving off a glow */
    filter: drop-shadow(0 1px 3px);
  }
  
  .demo {
    height: 100px;
    background: #fff;
  }
  
  .layers {
    position: relative;
  }
  
  .layers::before,
  .layers::after {
    content: attr(data-text);
    position: absolute;
    width: 110%;
    z-index: -1;
  }
  
  .layers::before {
    top: 10px;
    left: 15px;
    color: #e0287d;
  }
  
  .layers::after {
    top: 5px;
    left: -10px;
    color: #1bc7fb;
  }
  
  .single-path {
    clip-path: polygon(0% 12%,53% 12%,53% 26%,25% 26%,25% 86%,31% 86%,31% 0%,53% 0%,53% 84%,92% 84%,92% 82%,70% 82%,70% 29%,78% 29%,78% 65%,69% 65%,69% 66%,77% 66%,77% 45%,85% 45%,85% 26%,97% 26%,97% 28%,84% 28%,84% 34%,54% 34%,54% 89%,30% 89%,30% 58%,83% 58%,83% 5%,68% 5%,68% 36%,62% 36%,62% 1%,12% 1%,12% 34%,60% 34%,60% 57%,98% 57%,98% 83%,1% 83%,1% 53%,91% 53%,91% 84%,8% 84%,8% 83%,4% 83%
    );
  }
  
  .paths {
    animation: paths 5s step-end infinite;
  }
  
  @keyframes paths {
    0% {
      clip-path: polygon(0% 43%,83% 43%,83% 22%,23% 22%,23% 24%,91% 24%,91% 26%,18% 26%,18% 83%,29% 83%,29% 17%,41% 17%,41% 39%,18% 39%,18% 82%,54% 82%,54% 88%,19% 88%,19% 4%,39% 4%,39% 14%,76% 14%,76% 52%,23% 52%,23% 35%,19% 35%,19% 8%,36% 8%,36% 31%,73% 31%,73% 16%,1% 16%,1% 56%,50% 56%,50% 8%
      );
    }
  
    5% {
      clip-path: polygon(0% 29%,44% 29%,44% 83%,94% 83%,94% 56%,11% 56%,11% 64%,94% 64%,94% 70%,88% 70%,88% 32%,18% 32%,18% 96%,10% 96%,10% 62%,9% 62%,9% 84%,68% 84%,68% 50%,52% 50%,52% 55%,35% 55%,35% 87%,25% 87%,25% 39%,15% 39%,15% 88%,52% 88%
      );
    }
  
    30% {
      clip-path: polygon(0% 53%,93% 53%,93% 62%,68% 62%,68% 37%,97% 37%,97% 89%,13% 89%,13% 45%,51% 45%,51% 88%,17% 88%,17% 54%,81% 54%,81% 75%,79% 75%,79% 76%,38% 76%,38% 28%,61% 28%,61% 12%,55% 12%,55% 62%,68% 62%,68% 51%,0% 51%,0% 92%,63% 92%,63% 4%,65% 4%
      );
    }
  
    45% {
      clip-path: polygon(0% 33%,2% 33%,2% 69%,58% 69%,58% 94%,55% 94%,55% 25%,33% 25%,33% 85%,16% 85%,16% 19%,5% 19%,5% 20%,79% 20%,79% 96%,93% 96%,93% 50%,5% 50%,5% 74%,55% 74%,55% 57%,96% 57%,96% 59%,87% 59%,87% 65%,82% 65%,82% 39%,63% 39%,63% 92%,4% 92%,4% 36%,24% 36%,24% 70%,1% 70%,1% 43%,15% 43%,15% 28%,23% 28%,23% 71%,90% 71%,90% 86%,97% 86%,97% 1%,60% 1%,60% 67%,71% 67%,71% 91%,17% 91%,17% 14%,39% 14%,39% 30%,58% 30%,58% 11%,52% 11%,52% 83%,68% 83%
      );
    }
  
    76% {
      clip-path: polygon(0% 26%,15% 26%,15% 73%,72% 73%,72% 70%,77% 70%,77% 75%,8% 75%,8% 42%,4% 42%,4% 61%,17% 61%,17% 12%,26% 12%,26% 63%,73% 63%,73% 43%,90% 43%,90% 67%,50% 67%,50% 41%,42% 41%,42% 46%,50% 46%,50% 84%,96% 84%,96% 78%,49% 78%,49% 25%,63% 25%,63% 14%
      );
    }
  
    90% {
      clip-path: polygon(0% 41%,13% 41%,13% 6%,87% 6%,87% 93%,10% 93%,10% 13%,89% 13%,89% 6%,3% 6%,3% 8%,16% 8%,16% 79%,0% 79%,0% 99%,92% 99%,92% 90%,5% 90%,5% 60%,0% 60%,0% 48%,89% 48%,89% 13%,80% 13%,80% 43%,95% 43%,95% 19%,80% 19%,80% 85%,38% 85%,38% 62%
      );
    }
  
    1%,
    7%,
    33%,
    47%,
    78%,
    93% {
      clip-path: none;
    }
  }
  
  .movement {
    /* Normally this position would be absolute & on the layers, set to relative here so we can see it on the div */
    position: relative;
    animation: movement 8s step-end infinite;
  }
  
  @keyframes movement {
    0% {
      top: 0px;
      left: -20px;
    }
  
    15% {
      top: 10px;
      left: 10px;
    }
  
    60% {
      top: 5px;
      left: -10px;
    }
  
    75% {
      top: -5px;
      left: 20px;
    }
  
    100% {
      top: 10px;
      left: 5px;
    }
  }
  
  .opacity {
    animation: opacity 5s step-end infinite;
  }
  
  @keyframes opacity {
    0% {
      opacity: 0.1;
    }
  
    5% {
      opacity: 0.7;
    }
  
    30% {
      opacity: 0.4;
    }
  
    45% {
      opacity: 0.6;
    }
  
    76% {
      opacity: 0.4;
    }
  
    90% {
      opacity: 0.8;
    }
  
    1%,
    7%,
    33%,
    47%,
    78%,
    93% {
      opacity: 0;
    }
  }
  
  .font {
    animation: font 7s step-end infinite;
  }
  
  @keyframes font {
    0% {
      font-weight: 100;
      color: #e0287d;
      filter: blur(3px);
    }
  
    20% {
      font-weight: 500;
      color: #fff;
      filter: blur(0);
    }
  
    50% {
      font-weight: 300;
      color: #1bc7fb;
      filter: blur(2px);
    }
  
    60% {
      font-weight: 700;
      color: #fff;
      filter: blur(0);
    }
  
    90% {
      font-weight: 500;
      color: #e0287d;
      filter: blur(6px);
    }
  }
  
  .glitch span {
    animation: paths 5s step-end infinite;
  }
  
  .glitch::before {
    animation: paths 5s step-end infinite, opacity 5s step-end infinite,
      font 8s step-end infinite, movement 10s step-end infinite;
  }
  
  .glitch::after {
    animation: paths 5s step-end infinite, opacity 5s step-end infinite,
      font 7s step-end infinite, movement 8s step-end infinite;
  }
  
  .hero-container {
    position: relative;
    padding: 200px 0;
    text-align: center;
  }
  
  .environment {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.3;
    filter: blur(5px);
    background: url(https://images.unsplash.com/photo-1602136773736-34d445b989cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80)
      center no-repeat;
    background-size: cover;
  }
  
</style>


<section>
  <div class="hero-container">
    <div class="environment"></div>
    <h2 class="hero glitch layers" data-text="FT_TRANSENDENCE"><span>FT_TRANSENDENCE</span></h2>
  </div>
</section>

`;