import { NotificationComponent } from "../Components/Notification/NotificationComponent.js";
import { displayNotification } from "../Components/Notification/NotificationUtils.js";
import { SearchBarComponent } from "../Components/Search/SearchBarComponent.js";

const HeaderTemplate =  document.createElement('template');

HeaderTemplate.innerHTML = /*html*/`
    <link rel="stylesheet" href="./Header/header.css">
    <div id="pingpong-logo">
        <img loading="lazy" draggable="false" src="./images/svg-header/pingpong-icon.svg" alt="pingpong">
    </div>
    <div class="notification-search">
        <div class="search-box">
            <search-bar-component></search-bar-component>
            <div class="notification-icon" >
                <img loading="lazy" draggable="false" src="./images/svg-header/alarm.svg" alt="notification">
                <div class="number-of-notifications">99</div>
            </div>
        </div>
        <div class="notification-container">
        </div>
    </div>
    <c-profile></c-profile>
`

        
export class HeaderBar extends HTMLElement{
    constructor(){
        super();
        // this.attachShadow({mode : 'open'})
        this.appendChild(HeaderTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        const notificationIcon = this.querySelector(".notification-icon");
        let checker = true;
        notificationIcon.addEventListener("click", () => {
            displayNotification("<new-friend-notification></new-friend-notification>");
            const notificationsBar = window.document.querySelector("notifications-list");
            const headerBar = window.document.querySelector("header-bar");
            const rootContent = window.document.querySelector("root-content");
            if (checker)
            {
                headerBar.style.marginRight = "15%";
                rootContent.style.marginRight = "15%";
                notificationsBar.style.display = "flex";
            }
            else {
                headerBar.style.marginRight = "0";
                rootContent.style.marginRight = "0";
                notificationsBar.style.display = "none";
            }
            checker = !checker;
        });
    }
}

