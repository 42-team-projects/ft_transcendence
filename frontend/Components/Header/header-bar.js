import { NotificationComponent } from "../Notification/NotificationComponent.js";
import { displayNotification } from "../Notification/NotificationUtils.js";
import { SearchBarComponent } from "../Search/SearchBarComponent.js";
import { NewFriendNotification } from "../Notification/templates/NewFriendNotification.js";

export class HeaderBar extends HTMLElement{
    constructor(){
        super();
        // this.attachShadow({mode : 'open'})
    }
    render(){
        // this.shadowRoot.appendChild(HeaderTemplate.content.cloneNode(true));
        this.appendChild(HeaderTemplate.content.cloneNode(true));
        const notificationIcon = this.querySelector(".notification-icon");
        notificationIcon.addEventListener("click", () => {
            displayNotification("<new-friend-notification></new-friend-notification>");
            showNotifiactionsList();
        });
    }

    connectedCallback() {
    }
    remove(){
        // console.log('remove');
        this.innerHTML = '';
    }
}


export function showNotifiactionsList() {
    const notificationsBar = window.document.querySelector("notifications-list");
    const headerBar = window.document.querySelector("header-bar");
    const rootContent = window.document.querySelector("root-content");
    if (notificationsBar.style.display == "none")
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
}

const HeaderTemplate =  document.createElement('template');


const cssContent = /*css*/`

    .header-bar{
        justify-content: space-between;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
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
        z-index: 99;
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
    
    .notification-icon
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
        <link rel="stylesheet" href="../../Utils/utils.css">
        <style>
            ${cssContent}
        </style>
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
    </div>
`