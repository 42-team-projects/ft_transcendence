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
    headerDown(){
        const profile = this.querySelector('c-profile');
		const userRunk = profile.querySelector('user-rank');
	
		userRunk.classList.toggle('drop-100', true);
		userRunk.classList.toggle('transform-1s', false);
		userRunk.classList.toggle('down-60', true);
		userRunk.classList.toggle('rise-0', false);
		this.classList.toggle('transform-1s', false);
		this.classList.toggle('up-100', false);
		this.classList.toggle('p-animation', false);
    }
    headerUp(){
        const profile = this.querySelector('c-profile');
        const userRunk = profile.querySelector('user-rank');
        userRunk.classList.toggle('drop-100', false);
        userRunk.classList.toggle('transform-1s', true);
        userRunk.classList.toggle('down-60', false);
        userRunk.classList.toggle('rise-0', true);
        this.classList.toggle('transform-1s', true);
        this.classList.toggle('up-100', true);
        this.classList.toggle('p-animation', true);
        setTimeout(() => {
			this.innerHTML = '';
            this
        }, 1000);
    }
    render(){
        this.appendChild(HeaderTemplate.content.cloneNode(true));
        const header = this.querySelector(".header-bar");
        header.appendChild(PROFILE_COMPONENT);
        this.headerDown();
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
    }

    remove(){
        this.classList = '';
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
    renderNotificatonAndFriendList();
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


function renderNotificatonAndFriendList() {
    const rightSideBar = document.querySelector(".right-sidebar");
    rightSideBar.innerHTML = `
        <friends-request-list class="transform-1s" style="display: none;"></friends-request-list>
        <notifications-list class="transform-1s" style="display: none;"></notifications-list>
    `;
}

export function showFriendsRequestList() {
    renderNotificatonAndFriendList();
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
            <svg width="151" height="54" viewBox="0 0 151 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M113.116 0H121.572V36.4249H113.116V0ZM10.4217 9.08904H37.0899V18.1953H10.4217V9.08904ZM0 19.5264H8.45579V54H0V19.5264ZM37.0899 27.3298H10.4217V36.4361H37.0899V27.3298ZM27.9242 18.2094H37.0304V27.3157H27.9242V18.2094ZM39.7255 9.08904H39.0528V36.4246V45.514V45.5308H74.8273V36.4246H74.7777V18.2094H65.6714V36.4246H47.5086V18.1953H74.8496V9.08904H47.5086H39.7255ZM59.8329 24.0617H53.3285V30.5661H59.8329V24.0617ZM84.7238 9.08904H85.1822V9.65267L102.78 31.2872V9.08904H111.236V45.514H102.783H102.78V45.5103L85.1822 24.2138V45.514H76.076V9.08904H84.7238ZM150.292 9.08904H123.624V18.1953H150.292V9.08904ZM132.095 22.7547H150.308V31.8609H150.266V36.4246H150.292V45.5308H123.624V36.4246H141.16V31.8609H132.095V22.7547Z" fill="white"/>
            </svg>           
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