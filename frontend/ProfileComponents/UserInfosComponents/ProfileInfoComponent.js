/*

        <div class="profile-image">
            <c-hexagon width="250px" height="250px" apply="true" Bcolor="#EB9A45">
                <img slot="content" draggable="false" src="./images/svg-header/profile.jpeg">
            </c-hexagon>
            <div class="name">
                <div class="name-and-online">
                    <p>ESALIM</p>
                    <c-hexagon width="24px" height="24px" apply="true" Bcolor="#00ffff">
                        <div class="online-logo" slot="content"></div>
                    </c-hexagon>
                </div>
                <div class="joined-date">
                    <img src="images/Chat.svg" width="20px"/>
                    <p class="joined-text">joined:</p>
                    <p class="joined-date-text">27 JUL 2024</p>
                </div>
            </div>
        </div>

 */

export class ProfileInfoComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    get src() { return this.getAttribute("src");}
    set src(value) { this.setAttribute("src", value);}
    
    get username() { return this.getAttribute("username");}
    set username(value) { this.setAttribute("username", value);}
    
    get joindate() { return this.getAttribute("joindate");}
    set joindate(value) { this.setAttribute("joindate", value);}

    get league() { return this.getAttribute("league");}
    set league(value) { this.setAttribute("league", value);}
    

    // get active() { return this.getAttribute("active");}

    getLeagueColor(league) {
        const leagueColors = new Map();
        leagueColors.set("bronze", "#B54C1E");
        leagueColors.set("silver", "#C0C0C0");
        leagueColors.set("gold", "#EB9A45");
        leagueColors.set("platinum", "#459BEB");
        leagueColors.set("legendary", "#EB4545");
        const color = leagueColors.get(league);
        console.log("color = " + color);
        return color;
    }

    connectedCallback() {

        const active = this.hasAttribute("active") ? "#00ffff" : "#d9d9d9";

        this.shadowRoot.innerHTML = /* html */ `
            <style>${cssContent}</style>
            <div class="profile-image">
                <c-hexagon width="250px" height="250px" apply="true" Bcolor="${this.getLeagueColor(this.league)}">
                    <img slot="content" draggable="false" src="${this.src}">
                </c-hexagon>
                <div class="name">
                    <div class="name-and-online">
                        <p>${this.username}</p>
                        <c-hexagon width="24px" height="24px" apply="true" Bcolor=${active}>
                            <div style="width: 100%; height: 100%; background-color: ${active};" slot="content"></div>
                        </c-hexagon>
                    </div>
                    <div class="joined-date">
                        <img src="/frontend/assets/profile-assets/Calendar.svg" width="20px"/>
                        <p class="joined-text">joined:</p>
                        <p class="joined-date-text">${this.joindate}</p>
                    </div>
                </div>
            </div>

        `;
    }
}


const cssContent = `
   :host * {
        margin: 0;
        padding: 0;
   }

   .profile-image {
        display: flex;
        position: relative;
        margin-left: 30%;
        margin-top: -155px;
        width: 500px;
        height: 250px;
        z-index: 3;
   }

.profile-image > img {
    width: 250px;
    height: 250px;
}

.profile-image > .name {
    width: 200px;
    height: 250px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    margin-top: 60px;
}

.name-and-online {
    width: 100%;
    color: white;
    display: flex;
    gap: 10px;
    align-items: center;
}

.name-and-online > p {
    font-size: 40px;
    margin-right: 10px;
}

.joined-date {
    color: #d9d9d9;
    gap: 10px;
    display: flex;
    width: 100%;
    margin-top: 10px;
    opacity: 0.7;
}


`;