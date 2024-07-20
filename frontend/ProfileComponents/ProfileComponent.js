var fakeData;

const APIUrl = "http://localhost:8080/api/v1/profile";

function getLeagueColor(league) {
    const leagueColors = new Map();
    leagueColors.set("bronze", "#B54C1E");
    leagueColors.set("silver", "#C0C0C0");
    leagueColors.set("gold", "#EB9A45");
    leagueColors.set("platinum", "#459BEB");
    leagueColors.set("legendary", "#EB4545");
    return leagueColors.get(league.toLowerCase());
}

const emptyGraph = [{label: "", value: 0}];

export class ProfileComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }
    

    setUpLinks() {
        const linksContainer = this.shadowRoot.getElementById("links");
        linksContainer.innerHTML = "";
        fakeData.links.forEach( (link) => {
            const linkComponent = document.createElement("link-component");
            linkComponent.link = link.url;
            linkComponent.textContent = link.title;
            linksContainer.appendChild(linkComponent);
        });
    }

    setUpAchievements() {
        const achievements = this.shadowRoot.getElementById("achievements");
        const achievementsContainer = document.createElement("div");
        achievementsContainer.className = "flexClass";
        fakeData.achievements.forEach( (achievement) => {
            const achievementComponent = document.createElement("achievement-component");
            achievementComponent.icon = achievement.img;
            achievementComponent.league = achievement.name;
            achievementsContainer.appendChild(achievementComponent);
        });
        achievements.appendChild(achievementsContainer);
    }

    setUpGraph() {
        const graph = this.shadowRoot.getElementById("graph");
        graph.dataObject = (fakeData.stats.graph) ? fakeData.stats.graph : emptyGraph;
    }

    setUpUserInfo() {
        const userInfo = this.shadowRoot.getElementById("userInfo");
        userInfo.innerHTML = "";
        const userInfoContainer = document.createElement("div");
        userInfoContainer.className = "gridClass";
        const UserKeys = ["fullName", "userName", "email", "phone", "gender", "birthday"];
        for (let key of UserKeys) {
            if (!fakeData[key])
                    continue ;
            const userInfoComponent = document.createElement("user-info-component");
            userInfoComponent.label = key.toUpperCase();
            userInfoComponent.value = fakeData[key];
            userInfoContainer.appendChild(userInfoComponent);
        }
        userInfo.appendChild(userInfoContainer);

    }

    async connectedCallback(){
        try {
            const response = await fetch(APIUrl);
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            if (json.length)
                fakeData = json[0];
        } catch (error) {
            console.error(error.message);
        }

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/frontend/ProfileComponents/ProfileComponent.css">
        <page-name width="17%">
            <div slot="text" class="pageNameText">
                <h1>PROFILE</h1>
            </div>
        </page-name>
        <div class="main-profile-container">
            <div class="profile-rank-2">
                <user-rank bcolor="${getLeagueColor(fakeData.stats.league)}" height="140px">
                    <div class="rank-label">
                        <h5> RANK </h5>
                        <h1> 2 </h1>
                    </div>
                </user-rank>
            </div>
            <cover-component src="${fakeData.cover}"></cover-component>
            <div class="profile-data">
                <div class="profile-data-infos">
                    <profile-info-component src="${fakeData.profileImage}" username="${fakeData.userName}" joindate="${fakeData.joinDate}" league="${fakeData.stats.league}" ${fakeData.active && "active" } ${fakeData.friend && "friend"}></profile-info-component>

                    <div class="profile-data-infos-container">

                        <user-info-container id="userInfo" label="Account Information" icon="assets/profile-assets/account-icon.svg"></user-info-container>
                            
                        <user-info-container id="links" label="Links" icon="assets/profile-assets/chain-for-links.svg"></user-info-container>

                        <user-info-container id="achievements" label="Achievements" icon="assets/profile-assets/trophy.svg"> </user-info-container>
                        
                    </div>
                </div>

                <div class="profile-data-stats">
                    <stats-container>
                        <div class="league-bar" slot="league-bar">
                            <league-info>
                                <league-item slot="current-rank" title="current rank" league="${fakeData.stats.league}" color="#EB9A45">
                                    <h1 class="league-rank">${fakeData.stats.rank}</h1>
                                </league-item>
                                <div class="league-logo" slot="league-logo">
                                    <img class="current-league-logo" src="assets/profile-assets/gold_league.svg">
                                </div>
                                <league-item slot="next-league" title="next league" league="${fakeData.stats.nextLeague}" color="rgb(85, 146, 226)">
                                    <img class="next-league-logo" src="assets/profile-assets/platinum_league.svg">
                                </league-item>
                            </league-info>
                            <custom-progress-bar></custom-progress-bar>
                        </div>
                        <div class="match-record" slot="match-record">
                            <record-component win="${fakeData.stats.win}" loss="${fakeData.stats.loss}" winrate="${(100 * fakeData.stats.win) / (fakeData.stats.win + fakeData.stats.loss)}" ></record-component>
                        </div>
                    </stats-container>
                    <custom-graph id="graph">
                    </custom-graph>
                    <custom-table></custom-table>
                </div>
            </div>
        </div>
`;

        this.setUpUserInfo();

        this.setUpGraph();

        this.setUpLinks();

        this.setUpAchievements();


    }


    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }
}