import { getCurrentPlayerData } from "/Utils/GlobalVariables.js";
import { router } from "/root/Router.js";
import { HOST } from "/Utils/APIUrls.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";

const ProfileTemplate =  document.createElement('template');


ProfileTemplate.innerHTML = /*html*/`
    <style>
        a{
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .c-hexagon-content {
            width: 100%;
            height: 100%;
        }
    
    </style>
    <a href="/Profile/me">
        <c-hexagon width="110px" height="110px" apply="true" >
            <div slot="content" class="c-hexagon-content"></div>
        </c-hexagon>
        <user-rank> 
            <h2> 2 </h2>
        </user-rank>
    </a>
`
export class Profile extends HTMLElement{  
    constructor(){
        super();
        this.appendChild(ProfileTemplate.content.cloneNode(true))
        this.querySelector('a').addEventListener('click', (event)=>{
            console.log(this.querySelector('a').href)
            event.preventDefault()
            const url = new URL(this.querySelector('a').href)
            router.handleRoute(url.pathname)
        })
    }

    async connectedCallback() {
        const currentPlayer = await getCurrentPlayerData();
        const profileImage = this.querySelector("c-hexagon");
        const element = this.querySelector(".c-hexagon-content");
        element.style.background = "url(" + HOST + currentPlayer.user.avatar + ") center / cover no-repeat";
        profileImage.bcolor = getLeagueColor(currentPlayer.stats.league);
        const userRank = this.querySelector("user-rank");
        userRank.querySelector("h2").textContent = currentPlayer.stats.rank;
        userRank.bcolor = profileImage.bcolor;
    }

    disconnectedCallback() {

    }

}

