import { NotificationComponent } from "/Components/Notification/NotificationComponent.js";
import { displayNotification } from "/Components/Notification/configs/NotificationUtils.js";
import { SearchBarComponent } from "/Components/Search/SearchBarComponent.js";
import { NewFriendNotification } from "/Components/Notification/templates/NewFriendNotification.js";
import { FriendRequestListComponent } from "/Components/Friends/FriendRequestListComponent.js";
import { NotificationsList } from "/Components/Notification/NotificationsList.js";
import { PROFILE_COMPONENT } from "/Utils/GlobalVariables.js";

export class HeaderBar extends HTMLElement{
    constructor(){
        super();
        // this.attachShadow({mode : 'open'})
    }
    render(){
        // this.shadowRoot.appendChild(HeaderTemplate.content.cloneNode(true));
        this.appendChild(HeaderTemplate.content.cloneNode(true));
        const notificationIcon = this.querySelector(".notification-icon");

        let notificationChecker = window.document.querySelector(".right-sidebar notifications-list");;
        let friendsChecker = window.document.querySelector(".right-sidebar friends-request-list");;
        notificationIcon.addEventListener("click", () => {
            if (notificationChecker.style.display == "none")
                showNotificationsList();
            else
                hideNotificationsList();
        });
        const friendsIcon = this.querySelector(".friends-icon");

        friendsIcon.addEventListener("click", () => {
            if (friendsChecker.style.display == "none")
                showFriendsRequestList();
            else
                hideFriendsRequestList();
        });

        const header = this.querySelector(".header-bar");
        header.appendChild(PROFILE_COMPONENT);
    }

    connectedCallback() {

      

    }
    remove(){
        this.innerHTML = '';
    }
}


function showRightSideBar() {
    const notificationsBar = window.document.querySelector(".right-sidebar");
    const headerBar = window.document.querySelector("header-bar");
    const rootContent = window.document.querySelector("root-content");
    headerBar.style.marginRight = "15%";
    rootContent.style.marginRight = "15%";
    notificationsBar.style.display = "flex";
}

export function hideRightSideBar() {
    const notificationsBar = window.document.querySelector(".right-sidebar");
    const headerBar = window.document.querySelector("header-bar");
    const rootContent = window.document.querySelector("root-content");
    headerBar.style.marginRight = "0";
    rootContent.style.marginRight = "0";
    notificationsBar.style.display = "none";
}

export function showNotificationsList() {
    const notificationList = window.document.querySelector(".right-sidebar notifications-list");
    notificationList.style.display = "flex";
    hideFriendsRequestList();
    showRightSideBar();
}

export function hideNotificationsList() {
    const notificationList = window.document.querySelector(".right-sidebar notifications-list");
    notificationList.style.display = "none";
    hideRightSideBar();
}




export function showFriendsRequestList() {
    const friends = window.document.querySelector(".right-sidebar friends-request-list");
    friends.style.display = "flex";
    hideNotificationsList();
    showRightSideBar();

}

export function hideFriendsRequestList() {
    const friends = window.document.querySelector(".right-sidebar friends-request-list");
    friends.style.display = "none";
    hideRightSideBar();
}




const HeaderTemplate =  document.createElement('template');


const cssContent = /*css*/`

    .header-bar{
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        width: 100%;
    }
    #pingpong-logo
    {
        flex: 1px;
        margin-left: 4%;
    }
    
    #pingpong-logo > img
    {
        height: 80px;
        width: 80px;
        object-fit: cover;
    }
    
    .notification-search
    {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        gap: 30px;
        flex: 2;
        padding: 0 20px;
    }
    
    
    .notification-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        z-index: 60;
    }
    
    
    @media (width <= 1000px)  {
        .notification-container {
            display: none;
        }
    }
    
    
    .search-box {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: end;
        align-items: center;
        flex: 1;
        gap: 20px;
        min-width: 400px;
    }
    
    search-bar
    {
        border: 1px solid #00FFFC;
        border-radius: 10px;
        flex: 1;
        max-width: 1000px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 3.5rem;
        margin: 10px;
    }
    
    .search-icon{
        width: 8%;
        height: 60%;
        margin-left: 20px;
        margin-right: 10px;
    }
    
    .vertical-line {
        background-color: #00FFFC;
        width: 2px;
        height: 60%;
        margin-left: 20px;
    }
    
    
    .search-input{
        flex: 1;
        height: 100%;
        border-radius: 10px;
        border: none;
        width: 100%;
        background-color: transparent;
        font-family: 'Sansation';
        font-size: 25px;
        color: #ffffff;
        margin-left: 10px;
        padding-left: 10px;
        outline: none;
    }
    
    .search-input::placeholder{
        color: #ffffff;
        font-family: 'Sansation';
        opacity: 0.7;
        font-size: 24px;
    }
    
    .notification-icon,
    .friends-icon
    {
        display: flex;
        width: 32px;
        height: 32px;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    
    .number-of-notifications {
        width: 16px;
        height: 16px;
        border-radius: 100px;
        background-color: red;
        color: white;
        font-size: 10px;
        position: absolute;
        right: 1px;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Sansation bold';
    }
    
    c-profile{
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        grid-area: profile;
        margin-right: 1%;
        cursor: pointer;
    }
    
    /* user-rank
    {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        clip-path: polygon(10% 0%, 50% 0% ,90% 0%, 90% 60%, 50% 90%,10% 60%);
    } */
    
    
    .notification-content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        gap: 10px;
        flex-wrap: wrap;
    }
    
    .c-hexagon-content {
        width: 32px;
        height: 32px;
    }
               
    .content {
        display: flex;
        flex: 3;
        height: 100%;
        align-items: center;
        color: #ffffff;
        gap: 10px;
    }
    
    .actions {
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 50px;
    }
    
    .actions img {
        width: 24px;
    }


`


HeaderTemplate.innerHTML = /*html*/`
    <div class="header-bar">
        <link rel="stylesheet" href="/Utils/utils.css">
        <style>
            ${cssContent}
        </style>
        <div id="pingpong-logo">
            <img loading="lazy" draggable="false" src="/images/svg-header/pingpong-icon.svg" alt="pingpong">
        </div>
        <div class="notification-search">
            <div class="search-box">
                <search-bar-component></search-bar-component>
                <div class="friends-icon" >
                    <img loading="lazy" draggable="false" src="/assets/icons/user-octagon-icon.svg" alt="friends">
                </div>
                <div class="notification-icon" >
                    <img loading="lazy" draggable="false" src="/assets/icons/notification-icon.svg" alt="notification">
                    <div class="number-of-notifications">0</div>
                </div>
            </div>
                <div class="notification-container">
            </div>
        </div>
    </div>
`