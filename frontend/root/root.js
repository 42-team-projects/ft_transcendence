import { ProfileComponent } from "/Components/Profile/ProfileComponent.js";
import { ChatComponent } from "/Components/Chat/ChatComponent.js";
import { TournamentComponent } from "/Components/Tournament/TournamentComponent.js";
import { SettingsComponent } from "/Components/Settings/SettingsComponent.js";
import { NotificationsList } from "/Components/Notification/NotificationsList.js";
import { MessageNotification } from "/Components/Notification/templates/MessageNotification.js";
import { NewFriendNotification } from "/Components/Notification/templates/NewFriendNotification.js";
import { getCurrentPlayerData } from "/Utils/GlobalVariables.js";
import { createNotificationWebSocket } from "/Utils/GlobalVariables.js";
import { createWebSocketsForTournaments } from "/Utils/TournamentWebSocketManager.js";
import { isTokenValid} from '/root/fetchWithToken.js'
import { updateApiData } from "/Utils/APIManager.js";
import { PROFILE_API_URL } from "/Utils/GlobalVariables.js";

const root = document.createElement('template')

root.innerHTML = /*html*/ `
`
class Root extends HTMLElement{

    constructor()
    {
        super();
        this.appendChild(root.content.cloneNode(true))
    }
    async connectedCallback() {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && isTokenValid(accessToken))
        {
            await getCurrentPlayerData();
            const res = await updateApiData(PROFILE_API_URL + "online/", "");
            console.log("res: ", res);
            await createWebSocketsForTournaments();
            await createNotificationWebSocket();
        }
    }
    
    async disconnectedCallback() {
        const res = await updateApiData(PROFILE_API_URL + "offline/", "");
        console.log("res: ", res);
    }
}
customElements.define("root-content", Root)
