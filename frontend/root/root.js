import { ProfileComponent } from "../Components/Profile/ProfileComponent.js";
import { ChatComponent } from "../Components/Chat/ChatComponent.js";
import { TournamentComponent } from "../Components/Tournament/TournamentComponent.js";
import { SettingsComponent } from "../Components/Settings/SettingsComponent.js";
import { NotificationsList } from "../Components/Notification/NotificationsList.js";
import { MessageNotification } from "../Components/Notification/templates/MessageNotification.js";
import { NewFriendNotification } from "../Components/Notification/templates/NewFriendNotification.js";
import { getCurrentPlayerData } from "../Utils/GlobalVariables.js";
import { createWebSocketsForTournaments } from "../Utils/TournamentWebSocketManager.js";
import { isTokenValid } from "./fetchWithToken.js";
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
            await createWebSocketsForTournaments();
        }
    }
}
customElements.define("root-content", Root)
