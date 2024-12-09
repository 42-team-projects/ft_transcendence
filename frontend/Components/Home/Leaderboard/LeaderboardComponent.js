import { LeaderboardItem } from "/Components/Home/Leaderboard/LeaderboardItem.js";

export class LeaderboardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
                <style> ${cssContent} </style>
                <div class="leaderboard">

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
                        <div class="body-board">
                            <leaderboard-item></leaderboard-item>
                            <leaderboard-item></leaderboard-item>
                            <leaderboard-item></leaderboard-item>
                            <leaderboard-item></leaderboard-item>
                            <leaderboard-item></leaderboard-item>
                            <leaderboard-item></leaderboard-item>
                        </div>
                    </div>
                </div>
        `;
    }

    connectedCallback() {
        // console.log("welcome to leaderboard component !!");
    }

}

customElements.define("leaderboard-component", LeaderboardComponent);


const cssContent = /*css*/ `
:host {
    flex: 1;
    height: 100%;
    min-width: 400px;
    position: relative;
    border-radius: 10px;

}

.leaderboard {
    position: relative;
    border-radius: 10px;
    width: 100%;
    height: 100%;
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

`;