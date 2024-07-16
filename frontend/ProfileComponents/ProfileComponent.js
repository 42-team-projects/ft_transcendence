const fakeData = {
    id: 1,
    userName: "Esalim",
    joinDate: "27 JUL 2058",
    active: true,
    profileImage: "./images/svg-header/profile.jpeg",
    cover: "/frontend/images/xxxxxx.png",
    league: "gold",
    rank: 200,
    nextLeague: "paltinum",
    fullName: "mehdi salim",
    email: "mehdi@salim.com",
    phone: "+212612345678",
    gender: "Male",
    birthday: "23 JUL 2087",
    win: 89,
    loss: 11
};

export class ProfileComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.shadowRoot.innerHTML = htmlContent;
    }
}

const htmlContent = `
            <link rel="stylesheet" href="/frontend/ProfileComponents/ProfileComponent.css">
            <page-name width="17%">
                <div slot="text" class="pageNameText">
                    <h1>PROFILE</h1>
                </div>
            </page-name>
            <div class="main-profile-container">
                <div class="profile-rank-2"></div>
                <cover-component src="${fakeData.cover}"></cover-component>
                <div class="profile-data">
                    <div class="profile-data-infos">
                        <profile-info-component src="${fakeData.profileImage}" username="${fakeData.userName}" joindate="${fakeData.joinDate}" league="${fakeData.league}" ${fakeData.active ? "active" : "" }></profile-info-component>

                        <div class="profile-data-infos-container">

                            <user-info-container label="Account Information" icon="assets/profile-assets/account-icon.svg">

                                <div class="gridClass">
                                    <user-info-component label="FULL NAME" value="${fakeData.fullName}"></user-info-component>
                                    <user-info-component label="USERNAME" value="@${fakeData.userName}"></user-info-component>
                                    <user-info-component label="EMAIL" value="${fakeData.email}"></user-info-component>
                                    <user-info-component label="PHONE" value="${fakeData.phone}"></user-info-component>
                                    <user-info-component label="GENDER" value="${fakeData.gender}"></user-info-component>
                                    <user-info-component label="BIRTHDAY" value="${fakeData.birthday}"></user-info-component>
                                </div>
                            </user-info-container>
                                
                            <user-info-container label="Links" icon="assets/profile-assets/chain-for-links.svg">
                                <link-component link="https://www.google.com/search">Google</link-component>
                                <link-component link="https://www.google.com/search">Facebook</link-component>
                                <link-component link="https://www.google.com/search">Instagram</link-component>
                            </user-info-container>

                            <user-info-container label="Achievements" icon="assets/profile-assets/trophy.svg">
                                <div class="flexClass">
                                    <achievement-component icon="/frontend/assets/profile-assets/GOLD-LEAGUE.svg" league="bronze"></achievement-component>
                                    <achievement-component icon="/frontend/assets/profile-assets/gold_league.svg" league="gold"></achievement-component>
                                    <achievement-component icon="/frontend/assets/profile-assets/platinum_league.svg" league="Platinum"></achievement-component>
                                </div>
                            </user-info-container>
                            
                        </div>
                    </div>

                    <div class="profile-data-stats">
                        <stats-container>
                            <div class="league-bar" slot="league-bar">
                                <league-info>
                                    <league-item slot="current-rank" title="current rank" league="${fakeData.league}" color="#EB9A45">
                                        <h1 class="league-rank">${fakeData.rank}</h1>
                                    </league-item>
                                    <div class="league-logo" slot="league-logo">
                                        <img class="current-league-logo" src="assets/profile-assets/gold_league.svg">
                                    </div>
                                    <league-item slot="next-league" title="next league" league="${fakeData.nextLeague}" color="rgb(85, 146, 226)">
                                        <img class="next-league-logo" src="assets/profile-assets/platinum_league.svg">
                                    </league-item>
                                </league-info>
                                <custom-progress-bar></custom-progress-bar>
                            </div>
                            <div class="match-record" slot="match-record">
                                <record-component win="${fakeData.win}" loss="${fakeData.loss}" winrate="${(100 * fakeData.win) / (fakeData.win + fakeData.loss)}" ></record-component>
                            </div>
                        </stats-container>
                        <custom-graph></custom-graph>
                        <custom-table></custom-table>
                    </div>
                </div>
            </div>
`;