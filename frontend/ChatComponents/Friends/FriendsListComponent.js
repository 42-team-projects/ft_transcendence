const APIUrl = "http://localhost:8080/api/v1/users/all";
let fakeData = [];
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

    renderFriendsList() {
        const listContaier = this.shadowRoot.querySelector(".friends-list-container");
        fakeData.forEach(item => {
            const friendItem = document.createElement("friend-item");
            if (item.stats)
                friendItem.league = item.stats.league;
            friendItem.profileImage = item.profileImage;
            friendItem.status = item.active;
            friendItem.userName = item.userName;
            listContaier.appendChild(friendItem);
        });
    }

    async connectedCallback() {
        try {
            const response = await fetch(APIUrl);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            fakeData = json;
            this.renderFriendsList();
        } catch (error) {
            console.error(error.message);
        }
        

    }
}

const cssContent = /*css*/`

    :host {
        flex: 1.5;
        height: 100%;
        max-height: 1000px;
        color: white;
        background-color: #d9d9d920;
    }
    
    h1 {
        padding: 0px 20px;
    }

    .friends-list-container {
        padding: 0px 20px;
        max-height: 920px;
        display: flex;
        gap: 10px;
        height: min-content;
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