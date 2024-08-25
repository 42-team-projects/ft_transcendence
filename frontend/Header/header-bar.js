import { NotificationComponent } from "../Notification/NotificationComponent.js";

const HeaderTemplate =  document.createElement('template');

HeaderTemplate.innerHTML = /*html*/`
    <div id="pingpong-logo">
        <img loading="lazy" draggable="false" src="./images/svg-header/pingpong-icon.svg" alt="pingpong">
    </div>
    <div class="notification-search">
        <div class="search-box">
            <search-bar></search-bar>
            <div class="notification-icon" >
                <img loading="lazy" draggable="false" src="./images/svg-header/alarm.svg" alt="notification">
            </div>
        </div>
        <notification-component width="30%">
            <div class="notification-content">
                <c-hexagon class="profile" width="56px" height="55px" apply="true" bcolor="#d9d9d9">
                    <div slot="content" class="c-hexagon-content"></div>
                </c-hexagon>
                <h3>hello world</h3>
            </div>
        </notification-component>
    </div>
    <c-profile></c-profile>
    `

        
export class HeaderBar extends HTMLElement{
    constructor(){
        super();
        this.appendChild(HeaderTemplate.content.cloneNode(true));
    }
}

