let fakeData = {
    id: 1,
    userName: "Esalim",
    joinDate: "27 JUL 2058",
    active: true,
    friend: false,
    profileImage: "./images/svg-header/profile.jpeg",
    cover: "/frontend/images/xxxxxx.png",
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
            img: "/frontend/assets/leagues-logo/bronze-league.svg"
        },
        {
            name: "Silver",
            img: "/frontend/assets/leagues-logo/silver-league.svg"
        },
        {
            name: "Gold",
            img: "/frontend/assets/leagues-logo/gold-league.svg"
        },
        {
            name: "Platinum",
            img: "/frontend/assets/leagues-logo/platinum-league.svg"
        }
    ],
    history: {
        srcUser: 1,
        targetUser: 78
    }
};

const APIUrl = "http://localhost:8080/api/v1/users/1";

function getLeagueColor(league) {
    const leagueColors = new Map();
    leagueColors.set("bronze", "#B54C1E");
    leagueColors.set("silver", "#C0C0C0");
    leagueColors.set("gold", "#EB9A45");
    leagueColors.set("platinum", "#459BEB");
    leagueColors.set("legendary", "#EB4545");
    return leagueColors.get(league.toLowerCase());
}

function getLeagueImage(league) {
    const leagueColors = new Map();
    leagueColors.set("bronze", "/frontend/assets/leagues-logo/bronze-league.svg");
    leagueColors.set("silver", "/frontend/assets/leagues-logo/silver-league.svg");
    leagueColors.set("gold", "/frontend/assets/leagues-logo/gold-league.svg");
    leagueColors.set("platinum", "/frontend/assets/leagues-logo/platinum-league.svg");
    leagueColors.set("legendary", "/frontend/assets/leagues-logo/legendary-league.svg");
    return leagueColors.get(league.toLowerCase());
}

const emptyGraph = [{ label: "", value: 0 }];

export class ProfileComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

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
        console.log(achievements);
        if (fakeData.achievements) {
            console.log("hello");
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
        console.log(fakeData);

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/frontend/ProfileComponents/ProfileComponent.css">
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
            <cover-component src="${fakeData.cover || "/frontend/images/xxxxxx.png"}"></cover-component>
            <div class="profile-data">
                <div class="profile-data-infos">
                    <profile-info-component src="${fakeData.profileImage || "./images/svg-header/profile.jpeg"}" username="${fakeData.userName || "unknown"}" joindate="${fakeData.joinDate || "01 MAY 2000"} " league="bronze" ${fakeData.active && "active"} ${fakeData.friend && "friend"}></profile-info-component>

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

        this.setUpUserInfo();

        this.setUpLinks();

        this.setUpAchievements();

        this.setUpStats();

        this.setUpGraph();
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
        const profileInfoComponent = this.shadowRoot.querySelector("profile-info-component");
        profileInfoComponent.setAttribute("league", fakeData.stats.league);



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
        leagueBar.appendChild(progressBar);

        const recordComponent = document.createElement("record-component");
        recordComponent.loss = fakeData.stats.loss;
        recordComponent.win = fakeData.stats.win;
        recordComponent.winrate = Math.round((100 * fakeData.stats.win) / (fakeData.stats.win + fakeData.stats.loss) * 10) / 10;
        this.shadowRoot.querySelector(".match-record").appendChild(recordComponent);

    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }
}