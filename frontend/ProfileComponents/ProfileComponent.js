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
                    <h1 >PROFILE</h1>
                </div>
            </page-name>
            <div class="main-profile-container">
                <!-- <page-name width="200px"><p slot="text">PROFILE</p></page-name> -->
                <div class="profile-rank-2"></div>
                <div class="profile-cover"></div>
                <div class="profile-data">
                    <div class="profile-data-infos">
                        <div class="profile-image">
                            <!-- <img src="assets/profile-assets/profile-image.svg" width="250px"/> -->
                            <c-hexagon width="250px" height="250px" apply="true" Bcolor="#EB9A45">
                                <img slot="content" draggable="false" src="./images/svg-header/profile.jpeg">
                            </c-hexagon>
                            <div class="name">
                                <div class="name-and-online">
                                    <p>ESALIM</p>
                                    <div class="online-logo"></div>
                                </div>
                                <div class="joined-date">
                                    <img src="images/Chat.svg" width="20px"/>
                                    <p class="joined-text">joined:</p>
                                    <p class="joined-date-text">27 JUL 2024</p>
                                </div>
                            </div>
                        </div>
                        <div class="profile-data-infos-container">
                            <div class="profile-data-infos-container-item">
                                <div class="title">
                                    <img src="assets/profile-assets/account-icon.svg" width="32">
                                    <p>Account Information</p>
                                </div>
                                <div class="profile-data-infos-container-item-content">
                                    <div class="content">
                                        <div class="content-label">
                                            <p>Full Name</p>
                                            <p class="content-value">SALIM ELMEHDI</p>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="content-label">
                                            <p>User Name</p>
                                            <p class="content-value">@esalim</p>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="content-label">
                                            <p>Email</p>
                                            <p class="content-value">esalim@mehdi.com</p>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="content-label">
                                            <p>Phone</p>
                                            <p class="content-value">+212612345678</p>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="content-label">
                                            <p>Gender</p>
                                            <p class="content-value">Male</p>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="content-label">
                                            <p>Birthday</p>
                                            <p class="content-value">23 JUL 2023</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="profile-data-infos-container-item">
                                <div class="title">
                                    <img src="assets/profile-assets/chain-for-links.svg" width="32">
                                    <p>Links</p>
                                </div>
                                <div class="profile-data-infos-container-item-content">
                                    <div class="content">
                                        <div class="content-label">
                                            <div class="content-links">
                                                <a href="https://www.google.com/search">https://www.google.com/search</a>
                                                <img src="assets/profile-assets/expand-icon.svg" width="16">
                                            </div>
                                            <div class="content-links">
                                                <a href="https://www.google.com/search">https://www.google.com/search</a>
                                                <img src="assets/profile-assets/expand-icon.svg" width="16">
                                            </div>
                                            <div class="content-links">
                                                <a href="https://www.google.com/search">https://www.google.com/search</a>
                                                <img src="assets/profile-assets/expand-icon.svg" width="16">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="profile-data-infos-container-item">
                                <div class="title">
                                    <img src="assets/profile-assets/trophy.svg" width="32">
                                    <p>League Achieves</p>
                                </div>
                                <div class="profile-data-infos-container-item-content">
                                    <div class="content">
                                        <div class="content-label">
                                            <div class="content-league">
                                                <img src="assets/profile-assets/GOLD-LEAGUE.svg" width="80">
                                                <img src="assets/profile-assets/GOLD-LEAGUE.svg" width="80">
                                                <img src="assets/profile-assets/GOLD-LEAGUE.svg" width="80">
                                                <img src="assets/profile-assets/GOLD-LEAGUE.svg" width="80">
                                                <img src="assets/profile-assets/GOLD-LEAGUE.svg" width="80">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="profile-data-stats">
                        <stats-container>
                            <div class="league-bar" slot="league-bar">
                                <league-info>
                                    <league-item slot="current-rank" title="current rank" league="GOLD" color="#EB9A45">
                                        <h1 class="league-rank">254</h1>
                                    </league-item>
                                    <div class="league-logo" slot="league-logo">
                                        <img class="current-league-logo" src="assets/profile-assets/gold_league.svg">
                                    </div>
                                    <league-item slot="next-league" title="next league" league="PLATINUM" color="rgb(85, 146, 226)">
                                        <img class="next-league-logo" src="assets/profile-assets/platinum_league.svg">
                                    </league-item>
                                </league-info>
                                <custom-progress-bar></custom-progress-bar>
                            </div>


                            <div class="match-record" slot="match-record">
                                <p class="match-record-text">MATCH RECORD</p>
                                <div class="match-record-stats">
                                    <div class="match-record-stats-box">
                                        <p class="match-record-stats-box-title">WIN</p>
                                        <p class="match-record-stats-box-value">56</p>
                                    </div>
                                    <div class="match-record-stats-box">
                                        <p class="match-record-stats-box-title">LOSS</p>
                                        <p class="match-record-stats-box-value">14</p>
                                    </div>
                                    <div class="match-record-stats-box">
                                        <hr>
                                    </div>
                                    <div class="match-record-stats-box">
                                        <p class="match-record-stats-box-title">WIN RATE</p>
                                        <p class="match-record-stats-box-value">78%</p>
                                    </div>
                                </div>
                                <!-- <button class="match-record-button">PLAY NOW</button> -->
                            </div>

                        </stats-container>
                        <custom-graph></custom-graph>
                        <custom-table></custom-table>
                    </div>
                </div>
            </div>
`;