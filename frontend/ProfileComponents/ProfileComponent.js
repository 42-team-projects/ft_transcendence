import { getLeagueColor, getLeagueImage } from "../Utils/LeaguesData.js";

let fakeData = {
    id: 1,
    userName: "Esalim",
    joinDate: "27 JUL 2058",
    active: true,
    friend: false,
    profileImage: "./images/svg-header/profile.jpeg",
    cover: "./images/xxxxxx.png",
    stats: {
        win: 89,
        loss: 11,
        rank: 200,
        league: "gold",
        nextLeague: "platinum",
        progressBar: 89,
        graph: [
            {
                label: "win",
                value: 89
            },
            {
                label: "loss",
                value: 11
            },
            {
                label: "draw",
                value: 5
            },
            {
                label: "max-score",
                value: 90
            }
        ]
    },
    links: [
        {
            title: "Twitter",
            url: "https://www.google.com/search"
        },
        {
            title: "Youtube",
            url: "https://www.youtube.com/search"
        },
        {
            title: "Twitch",
            url: "https://www.Facebook.com/search"
        },
        {
            title: "Instagram",
            url: "https://www.Instagram.com/search"
        }
    ],
    achievements: [
        {
            name: "Bronze",
            img: "./assets/leagues-logo/bronze-league.svg"
        },
        {
            name: "Silver",
            img: "./assets/leagues-logo/silver-league.svg"
        },
        {
            name: "Gold",
            img: "./assets/leagues-logo/gold-league.svg"
        },
        {
            name: "Platinum",
            img: "./assets/leagues-logo/platinum-league.svg"
        }
    ],
    history: {
        srcUser: 1,
        targetUser: 78
    }
};

const APIUrl = "http://localhost:8080/api/v1/users/4";
const emptyGraph = [{ label: "", value: 0 }];

export class ProfileComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
                <style>
                    ${cssContent}
                </style>
                <page-name width="17%">
                    <div slot="text" class="pageNameText">
                        <h1>PROFILE</h1>
                    </div>
                </page-name>
                <div class="main-profile-container">
                    <div class="profile-rank-2">
                        <user-rank id="user-rank" bcolor="bronze" height="140px">
                            <div class="rank-label">
                                <h5> RANK </h5>
                                <h1> </h1>
                            </div>
                        </user-rank>
                    </div>
                    <cover-component ></cover-component>
                    <div class="profile-data">
                        <div class="profile-data-infos">
                            <profile-info-component></profile-info-component>

                            <div class="profile-data-infos-container">
                                <user-info-container id="userInfo" label="Account Information" icon="assets/profile-assets/account-icon.svg"></user-info-container>
                                <user-info-container id="links" label="Links" icon="assets/profile-assets/chain-for-links.svg"></user-info-container>
                                <user-info-container id="achievements" label="Achievements" icon="assets/profile-assets/trophy.svg"> </user-info-container>
                            </div>

                        </div>

                        <div class="profile-data-stats">
                            <stats-container>
                                <div class="league-bar" slot="league-bar"></div>
                                <div class="match-record" slot="match-record"></div>
                            </stats-container>
                            <custom-graph id="graph"></custom-graph>
                            <custom-table></custom-table>
                        </div>
                    </div>
                </div>
            `;
    }

    setUpLinks() {
        const linksContainer = this.shadowRoot.getElementById("links");
        linksContainer.innerHTML = "";
        if (fakeData.links) {
            fakeData.links.forEach((link) => {
                const linkComponent = document.createElement("link-component");
                linkComponent.link = link.url;
                linkComponent.textContent = link.title;
                linksContainer.appendChild(linkComponent);
            });
        }
        else
            linksContainer.remove();
    }

    setUpAchievements() {
        const achievements = this.shadowRoot.getElementById("achievements");
        if (fakeData.achievements) {
            const achievementsContainer = document.createElement("div");
            achievementsContainer.className = "flexClass";
            fakeData.achievements.forEach((achievement) => {
                const achievementComponent = document.createElement("achievement-component");
                achievementComponent.icon = achievement.img;
                achievementComponent.league = achievement.name;
                achievementsContainer.appendChild(achievementComponent);
            });
            achievements.appendChild(achievementsContainer);
        }
        else
            achievements.remove();
    }

    setUpGraph() {
        const graph = this.shadowRoot.getElementById("graph");
        if (fakeData.stats)
            graph.dataObject = (fakeData.stats.graph) ? fakeData.stats.graph : emptyGraph;
        else
            graph.remove();

    }

    setUpUserInfo() {
        const userInfo = this.shadowRoot.getElementById("userInfo");
        userInfo.innerHTML = "";
        const userInfoContainer = document.createElement("div");
        userInfoContainer.className = "gridClass";
        const UserKeys = ["fullName", "userName", "email", "phone", "gender", "birthday"];
        for (let key of UserKeys) {
            if (!fakeData[key])
                continue;
            const userInfoComponent = document.createElement("user-info-component");
            userInfoComponent.label = key.toUpperCase();
            userInfoComponent.value = fakeData[key];
            userInfoContainer.appendChild(userInfoComponent);
        }
        userInfo.appendChild(userInfoContainer);

    }

    async connectedCallback() {

        try {
            const response = await fetch(APIUrl);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            fakeData = json;
        } catch (error) {
            console.error(error.message);
        }

        this.setUpProfileInfo();

        this.setUpUserInfo();

        this.setUpLinks();

        this.setUpAchievements();

        this.setUpStats();

        this.setUpGraph();
    }

    setUpProfileInfo() {
        const coverComponent = this.shadowRoot.querySelector("cover-component");
        coverComponent.src = fakeData.cover || "./images/xxxxxx.png";

        const profileInfoComponent = this.shadowRoot.querySelector("profile-info-component");
        if (fakeData.stats)
            profileInfoComponent.league = fakeData.stats.league;
        profileInfoComponent.username = fakeData.userName || "unknown";
        profileInfoComponent.src = fakeData.profileImage || "./images/svg-header/profile.jpeg";
        profileInfoComponent.joindate = fakeData.joinDate.split(" ")[0] || "01 MAY 2000";
        profileInfoComponent.active = fakeData.active;
        profileInfoComponent.friend = fakeData.friend;
    }

    setUpStats() {
        
        if (!fakeData.stats)
        {
            this.shadowRoot.querySelector("stats-container").remove();
            this.shadowRoot.querySelector(".profile-rank-2").remove();
            return ;
        }

        const userRank = this.shadowRoot.querySelector("user-rank");
        const leagueBar = this.shadowRoot.querySelector(".league-bar");
        userRank.bcolor = getLeagueColor(fakeData.stats.league);
        const rank = userRank.querySelector("h1");
        rank.textContent = fakeData.stats.rank;


        const leagueInfo = document.createElement("league-info");
        const leagueItem1 = document.createElement("league-item");
        leagueItem1.slot = "current-rank";
        leagueItem1.title = "current rank";
        leagueItem1.league = fakeData.stats.league;
        leagueItem1.color = getLeagueColor(fakeData.stats.league);
        const h1 = document.createElement("h1");
        h1.style.margin = 0;
        h1.className = "league-rank";
        h1.textContent = fakeData.stats.rank;
        leagueItem1.appendChild(h1);
        leagueInfo.appendChild(leagueItem1);

        const div = document.createElement("div");
        div.className = "league-logo";
        div.slot = "league-logo";

        const img1 = document.createElement("img");
        img1.style.margin = 0;
        img1.width = 150;
        img1.className = "current-league-logo";
        img1.src = getLeagueImage(fakeData.stats.league);
        div.appendChild(img1);
        leagueInfo.appendChild(div);

        const leagueItem2 = document.createElement("league-item");
        leagueItem2.slot = "next-league";
        leagueItem2.title = "next league";
        leagueItem2.league = fakeData.stats.nextLeague;
        leagueItem2.color = getLeagueColor(fakeData.stats.nextLeague);
        const img2 = document.createElement("img");
        img2.style.margin = 0;
        img2.width = 48;
        img2.className = "next-league-logo";
        img2.src = getLeagueImage(fakeData.stats.nextLeague);
        leagueItem2.appendChild(img2);
        leagueInfo.appendChild(leagueItem2);

        leagueBar.appendChild(leagueInfo);
        const progressBar = document.createElement("custom-progress-bar");
        progressBar.value = fakeData.stats.progressBar;
        progressBar.color = getLeagueColor(fakeData.stats.league);
        leagueBar.appendChild(progressBar);

        const recordComponent = document.createElement("record-component");
        recordComponent.loss = fakeData.stats.loss;
        recordComponent.win = fakeData.stats.win;
        this.shadowRoot.querySelector(".match-record").appendChild(recordComponent);

    }

    attributeChangedCallback(name, oldValue, newValue) {
    }
}

const cssContent = /*css*/`

:host {
    width: 100%;
    height: 100%;
    position: relative;
    margin-right: 50px;
    margin-left: 50px;
    font-family: 'Sansation Bold', 'Sansation';
    background-color: #00ffff10;
    border-radius: 5px;
}

:host * {
    margin: 0;
}

.child{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: aqua;
    clip-path: polygon(13% 30%, 50% 6%, 87% 30%, 87% 70%, 50% 94%, 13% 70%);
}

.main-profile-container::-webkit-scrollbar { 
    display: none;
}


.main-profile-container
{
    scrollbar-width:none;
    scroll-behavior: smooth;
    scrollbar-color: #003347 transparent;
    display: flex;
    position: relative;
    flex-direction: column;
    /* border: 1px solid red; */
    overflow-y: scroll;
    width: 100%;
    height: 100%;
}

.profile-rank-2 {
    position: absolute;
    width: 80px;
    top: -3px;
    right: -8px;
    margin: 0;
    padding: 0;
    z-index: 99;
}

.rank-label {
    padding-top: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.rank-label h1 {
    width: 100%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
}

page-name {
    z-index: 30;
}


.profile-cover
{
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 35%;
    min-height: 300px;
    max-height: 600px;
    color: white;
    /* border: 1px solid white; */
    background-image: url(./images/xxxxxx.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
    background-attachment: local;
    opacity: 0.7;
    z-index: 1;
}
.profile-data
{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
    width: 100%;
    flex: 1;
    height: 100%;
}

.profile-data-infos
{
    flex: 1;
    height: 100%;
    min-width: 400px;
}

.profile-data-stats
{
    flex: 3;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-gap: 5px;
    min-width: 900px;
    max-height: 700px;
}

.profile-data-stats::-webkit-scrollbar { 
    display: none;
}


custom-graph
{
    grid-area: 1 / 5 / 5 / -1;
}

@media only screen and (max-width: 1600px) {

    .profile-data-stats {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, 100%);
        min-width: 600px;
        height: 100%;
    }
    stats-container { grid-area: 1 / 1 / 2 / 2; max-height: 100%;}    
    custom-graph { grid-area: 2 / 1 / 3 / 2; max-width: 100%;}
    custom-table { grid-area: 3 / 1 / 4 / 2; max-width: 100%;}

}


/* ================= profile data stats league section ===================== */

.league-bar {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #d9d9d910;
    flex: 2;
    gap: 15px;
    padding: 40px 0;
    justify-content: center;
}


.match-record {
    padding: 20px 0;
    margin-top: 20px;
    position: relative;
    width: 100%;
    gap: 40px;
    font-family: 'Sansation Bold', 'Sansation';
    background-color: #d9d9d920;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}



custom-graph {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: 0;
}




/* Profile data infos container */

.profile-data-infos-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-bottom: 20px;
    width: 100%;

}


.gridClass {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 20px;
}

.flexClass {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-right: 70px;
    
}

`;