import { ProfileComponent } from "../Components/Profile/ProfileComponent.js";
import { ChatComponent } from "../Components/Chat/ChatComponent.js";
import { TournamentComponent } from "../Components/Tournament/TournamentComponent.js";
import { SettingsComponent } from "../Components/Settings/SettingsComponent.js";
import { NotificationsList } from "../Components/Notification/NotificationsList.js";
import { MessageNotification } from "../Components/Notification/templates/MessageNotification.js";
import { NewFriendNotification } from "../Components/Notification/templates/NewFriendNotification.js";
const root = document.createElement('template')

root.innerHTML = /*html*/ `
`
class Root extends HTMLElement{

    constructor()
    {
        super();
        this.appendChild(root.content.cloneNode(true))
    }
}
customElements.define("root-content", Root)
