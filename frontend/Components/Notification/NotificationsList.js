import { getCurrentUserId } from "/Utils/GlobalVariables.js";
import { NotificationComponent } from "/Components/Notification/NotificationComponent.js";
import { displayNotification } from "/Components/Notification/NotificationUtils.js";
import { MessageNotification } from "/Components/Notification/templates/MessageNotification.js";
import { getApiData } from "/Utils/APIManager.js";
import { NOTIFICATIONS_API_URL } from "/Utils/GlobalVariables.js";
import { createNotification } from "/Components/Notification/configs/NotificationManager.js";
import { hideNotificationsList } from "/Components/Header/header-bar.js";


export class NotificationsList extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="notificationsBar-header">
                <img class="close-button" src="/assets/icons/close-icon.svg" width="24px"/>
                <h3>NOTIFICATIONS</h3>
            </div>
            <div class="notificationsBar-body">
                <div class="notification-list">
                    <h5 style="display: flex;width: 100%; color: #d9d9d980; justify-content: center; align-items: center; height: 100%;">There's no notification right now.</h5>
                </div>
            </div>
            <div class="notificationsBar-footer">
                <h4 class="clear-all">Clear All</h4>
            </div>
        `;
    }

    async connectedCallback() {
        this.style.width = this.width;
        this.style.height = this.height;
        const notificationList = this.querySelector(".notification-list");

        const notifications = await getApiData(NOTIFICATIONS_API_URL + "notifications_list/");
        console.log("notifications: ", notifications);
        if (notifications && notifications.length != 0) {
            notificationList.innerHTML = "";

            Array.from(notifications).forEach( notif => {
                const notification = createNotification(notif.id, notif.sender.username, notif.content, notif.type, notif.data);
                this.appendNotification(notification);
            });
            // increment the notification counter.
            const notificationIcon = window.document.querySelector(".notification-search .number-of-notifications");
            if (notificationIcon)
                notificationIcon.textContent = Number(notifications.length);
            notificationList.scrollTop = notificationList.scrollHeight;
        }

        this.querySelector(".close-button").addEventListener("click", () => {
            hideNotificationsList();
        });
        this.querySelector(".clear-all").addEventListener("click", () => {
            this.querySelector(".notification-list").innerHTML = '';
        });
    }
    disconnectedCallback() {
    }

    appendNotification(notificationContent) {
        const not = this.querySelector(".notification-list");
        if (!not.querySelector("notification-component"))
            not.innerHTML = "";
        const notification = new NotificationComponent();
        notification.width = "100%";
        notification.appendChild(notificationContent);
        not.prepend(notification);
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