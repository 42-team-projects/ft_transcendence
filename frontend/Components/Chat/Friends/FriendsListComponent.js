import { HOST, PROFILE_API_URL } from "/Utils/GlobalVariables.js";
import { FriendItemComponent } from "/Components/Chat/Friends/FriendItemComponent.js";
import { getApiData } from "/Utils/APIManager.js";
import { router } from "/root/Router.js";

export class FriendsListComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
        <style>
            ${cssContent}
        </style>
        <h1>FRIENDS</h1>
        <div class="friends-list-container"></div>
    `;
    }

    async renderFriendsList() {
        const listContaier = this.shadowRoot.querySelector(".friends-list-container");
        const friends = await getApiData(HOST + "/friend/friends/");
        if (!friends.response.friends || friends.response.friends === undefined)
            return ;
        Array.from(friends.response.friends).forEach(async (item) => {
            const playerData = await getApiData(PROFILE_API_URL + item.username);
            const friendItem = document.createElement("friend-item");
            friendItem.league = playerData.stats.league;
            friendItem.profileImage = HOST + playerData.user.avatar;
            friendItem.status = playerData.active;
            friendItem.userName = playerData.user.username;
            friendItem.addEventListener("click", (event) => {
                event.preventDefault();
                const url = new URL(HOST + "/Chat/" + playerData.user.username);
                router.handleRoute(url.pathname);
            });
            listContaier.appendChild(friendItem);
        });
    }

    async connectedCallback() {        
        this.renderFriendsList();
    }
}

customElements.define("friends-list", FriendsListComponent);

const cssContent = /*css*/`

    :host {
        flex: 1;
        height: 100%;
        color: white;
        background-color: #d9d9d920;
    }
    
    h1 {
        padding: 0px 20px;
        height: 32px;
    }

    .friends-list-container {
        padding: 0px 20px;
        display: flex;
        gap: 10px;
        height: calc(100% - 80px);
        flex-direction: column;
        overflow-y: scroll;
    }
    

    .friends-list-container::-webkit-scrollbar {
        opacity: 0.7;
        background-color: transparent;
        width: 1px;
    }
    
    .friends-list-container::-webkit-scrollbar-track {
        opacity: 0.7;
        border-radius: 100px;
    }
    
    .friends-list-container::-webkit-scrollbar-thumb {
        opacity: 0.7;
        background-color: aqua;
        border-radius: 100px;
    }
    
`;