import { getLeagueColor, getLeagueImage, getNextLeague } from "/Utils/LeaguesData.js";
import { CoverComponent } from "/Components/Profile/CoverComponent.js";
import { ProfileInfoComponent } from "/Components/Profile/UserInfosComponents/ProfileInfoComponent.js";
import { UserInfoContainerComponent } from "/Components/Profile/UserInfosComponents/UserInfoContainerComponent.js";
import { UserInfoComponent } from "/Components/Profile/UserInfosComponents/UserInfoComponent.js";
import { LinkComponent } from "/Components/Profile/UserInfosComponents/LinkComponent.js";
import { AchievementComponent } from "/Components/Profile/UserInfosComponents/AchievementComponent.js";
import { CustomTable } from "/Components/Profile/TableComponents/CustomTable.js";
import { StatsContainer } from "/Components/Profile/StatsComponents/StatsContainer.js";
import { CustomGraph } from "/Components/Profile/GraphComponent/CustomGraph.js";
import { getApiData } from "/Utils/APIManager.js";
import { PROFILE_API_URL, HOST } from "/Utils/APIUrls.js";


const htmlContent = `
<div class="profile-rank-2"></div>
<cover-component ></cover-component>
<div class="profile-data">
    <div class="profile-info-component-container">
        <profile-info-component></profile-info-component>

        <div class="profile-data-infos-container">
            <user-info-container id="userInfo" label="Account Information" icon="/assets/images/profile/account-icon.svg"></user-info-container>
            <user-info-container id="links" label="Links" icon="/assets/images/profile/chain-for-links.svg"></user-info-container>
            <user-info-container id="achievements" label="Achievements" icon="/assets/images/profile/trophy.svg"> </user-info-container>
        </div>

    </div>

    <div class="profile-data-stats">
        <div class="statsClass">
            <stats-container>
                <div class="league-bar" slot="league-bar"></div>
                <div class="match-record" slot="match-record"></div>
            </stats-container>
            <div class="graphClass">
                <custom-graph id="graph"></custom-graph>
            </div>
        </div>
        <custom-table></custom-table>
    </div>
</div>
`;

export class ProfileComponent extends HTMLElement {
    APIData;
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
                    ${htmlContent}
                </div>
            `;
    }

    setUpLinks() {
        const linksContainer = this.shadowRoot.getElementById("links");
        linksContainer.innerHTML = "";
        if (this.APIData.links) {
            this.APIData.links.forEach((link) => {
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
        if (this.APIData.achievements) {
            const achievementsContainer = document.createElement("div");
            achievementsContainer.className = "flexClass";
            this.APIData.achievements.forEach((achievement) => {
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
        if (this.APIData.stats)
            graph.dataObject = this.APIData.stats.graph;
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
            if (!this.APIData[key])
                continue;
            const userInfoComponent = document.createElement("user-info-component");
            userInfoComponent.label = key.toUpperCase();
            userInfoComponent.value = this.APIData[key];
            userInfoContainer.appendChild(userInfoComponent);
        }
        userInfo.appendChild(userInfoContainer);

    }

    async connectedCallback() {
        const playerName = window.location.pathname.substring(9);
        this.renderProfilePage(playerName);
    }

    async renderProfilePage(username) {
        this.APIData = await getApiData(PROFILE_API_URL + username + "/");
        this.setUpProfileInfo();

        this.setUpUserInfo();

        this.setUpLinks();

        this.setUpAchievements();

        this.setUpStats();

        this.setUpGraph();
    }

    setUpProfileInfo() {
        const coverComponent = this.shadowRoot.querySelector("cover-component");
        if (this.APIData.cover)
            coverComponent.src = (HOST + this.APIData.cover) || "/images/xxxxxx.png";

        const profileInfoComponent = this.shadowRoot.querySelector("profile-info-component");
        profileInfoComponent.league = this.APIData.stats.league;
        profileInfoComponent.username = this.APIData.user.username;
        profileInfoComponent.src = (HOST + this.APIData.user.avatar);
        profileInfoComponent.joindate = this.APIData.joinDate;
        profileInfoComponent.active = this.APIData.active;
    }

    setUpStats() {
        
        if (!this.APIData.stats)
        {
            this.shadowRoot.querySelector("stats-container").remove();
            this.shadowRoot.querySelector(".profile-rank-2").remove();
            return ;
        }

        const user_rank = this.shadowRoot.querySelector(".profile-rank-2");
        const userRank = document.createElement("user-rank");
        userRank.bcolor = getLeagueColor(this.APIData.stats.league);
        userRank.id = "user-rank";
        userRank.style.height = "140px";
        userRank.innerHTML = `
            <div class="rank-label">
                <h5> RANK </h5>
                <h1>${this.APIData.stats.rank}</h1>
            </div>
        `;
        user_rank.append(userRank);

        const leagueBar = this.shadowRoot.querySelector(".league-bar");
        leagueBar.innerHTML = '';


        const leagueInfo = document.createElement("league-info");
        const leagueItem1 = document.createElement("league-item");
        leagueItem1.slot = "current-rank";
        leagueItem1.title = "current rank";
        leagueItem1.league = this.APIData.stats.league;
        leagueItem1.color = getLeagueColor(this.APIData.stats.league);
        const h1 = document.createElement("h1");
        h1.style.margin = 0;
        h1.className = "league-rank";
        h1.textContent = this.APIData.stats.rank;
        leagueItem1.appendChild(h1);
        leagueInfo.appendChild(leagueItem1);

        const div = document.createElement("div");
        div.className = "league-logo";
        div.slot = "league-logo";

        const img1 = document.createElement("img");
        img1.style.margin = 0;
        img1.width = 150;
        img1.className = "current-league-logo";
        img1.src = getLeagueImage(this.APIData.stats.league);
        div.appendChild(img1);
        leagueInfo.appendChild(div);

        const leagueItem2 = document.createElement("league-item");
        leagueItem2.slot = "next-league";
        leagueItem2.title = "next league";
        leagueItem2.league = getNextLeague(this.APIData.stats.league);
        leagueItem2.color = getLeagueColor(leagueItem2.league);
        const img2 = document.createElement("img");
        img2.style.margin = 0;
        img2.width = 48;
        img2.className = "next-league-logo";
        img2.src = getLeagueImage(leagueItem2.league);
        leagueItem2.appendChild(img2);
        leagueInfo.appendChild(leagueItem2);

        leagueBar.appendChild(leagueInfo);
        const progressBar = document.createElement("custom-progress-bar");
        progressBar.value = this.APIData.stats.progress_bar;
        progressBar.color = getLeagueColor(this.APIData.stats.league);
        leagueBar.appendChild(progressBar);

        const recordComponent = document.createElement("record-component");
        recordComponent.loss = this.APIData.stats.loss;
        recordComponent.win = this.APIData.stats.win;
        const matchRecord = this.shadowRoot.querySelector(".match-record");
        matchRecord.innerHTML = '';
        matchRecord.appendChild(recordComponent);

    }

    static observedAttributes = [];

    attributeChangedCallback(attrName, oldValue, newValue) {
    }
}

customElements.define("profile-component", ProfileComponent);

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
        font-family: 'Sansation Bold';
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

    .profile-data
    {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
        width: 100%;
        flex: 1;
    }


    .profile-info-component-container {
        flex: 1;
    }

    .profile-data-stats
    {
        flex: 3;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 5px;

    }

    .statsClass {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
    }

    .graphClass {
        flex: 2;
        width: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .profile-data-stats::-webkit-scrollbar { 
        display: none;
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



    /* Profile data infos container */

    .profile-data-infos-container {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding-bottom: 20px;
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