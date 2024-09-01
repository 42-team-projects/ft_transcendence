import { showNotifiactionsList } from "../Header/header-bar.js";
import { NotificationComponent } from "./NotificationComponent.js";

export class NotificationsList extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="notificationsBar-header">
                <img class="close-button" src="../../assets/icons/close-icon.svg" width="24px"/>
                <h3>NOTIFICATIONS</h3>
            </div>
            <div class="notificationsBar-body">
                <div class="notification-list"></div>
            </div>
            <div class="notificationsBar-footer">
                <h4 class="clear-all">Clear All</h4>
            </div>
        `;
    }

    connectedCallback() {
        this.style.width = this.width;
        this.style.height = this.height;
        const notificationList = this.querySelector(".notificationsBar-body");
        notificationList.scrollTop = notificationList.scrollHeight;
        this.querySelector(".close-button").addEventListener("click", () => {
            showNotifiactionsList();
        });
        this.querySelector(".clear-all").addEventListener("click", () => {
            this.querySelector(".notification-list").innerHTML = '';
        });

        
    }

    disconnectedCallback() {

    }


    appendNotification(notificationContent) {
        const notification = new NotificationComponent();
        notification.width = "100%";
        notification.innerHTML = notificationContent;
        this.querySelector(".notification-list").prepend(notification);
    }

    static observedAttributes = ["width", "height"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "width")
            this.style.width = newValue;
        else if (attrName == "height")
            this.style.height = newValue;
    }

    set width(val) {this.setAttribute("width", val);}
    get width() { return this.getAttribute("width"); }

    set height(val) {this.setAttribute("height", val);}
    get height() { return this.getAttribute("height"); }
}

customElements.define("notifications-list", NotificationsList);