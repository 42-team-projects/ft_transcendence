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
                    <custom-table></custom-table>
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
                        <div class="body-board">
                            ${leaderboardItem}
                            ${leaderboardItem}
                            ${leaderboardItem}
                            ${leaderboardItem}
                            ${leaderboardItem}
                            ${leaderboardItem}
                            ${leaderboardItem}
                            ${leaderboardItem}
                            ${leaderboardItem}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    connectedCallback() {

    }
}

customElements.define("home-page", HomePage);

const leaderboardItem = `
<div class="leaderboard-item">
    <svg width="300" height="10" viewBox="0 0 405 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M195.876 1.59094L190.84 7.44064M190.84 7.44064L195.876 13.2903M190.84 7.44064H2" stroke="aqua" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M209.247 13.2903L214.283 7.44058M214.283 7.44058L209.247 1.59088M214.283 7.44058L403.123 7.44058" stroke="aqua" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="195.875" y="7.5" width="9.19239" height="9.19239" transform="rotate(-45 195.875 7.5)" fill="aqua"/>
    </svg>

    <div class="leaderboard-item-content">
        <h1>4</h1>
        <h4>esalim</h4>
        <c-hexagon class="c-hexagon-profile" width="64px" height="64px" apply="true">
            <div slot="content" class="c-hexagon-content"></div>
        </c-hexagon>
        <h4>add</h4>
        <div>
            <h3>5644</h3>
            <h4>WIN</h4>
        </div>
    </div>
</div>
`;

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

.leaderboard-item {
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