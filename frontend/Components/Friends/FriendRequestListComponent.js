import { getCurrentUserId } from "/Utils/GlobalVariables.js";
import { NotificationComponent } from "/Components/Notification/NotificationComponent.js";
import { displayNotification } from "/Components/Notification/configs/NotificationUtils.js";
import { MessageNotification } from "/Components/Notification/templates/MessageNotification.js";
import { getApiData } from "/Utils/APIManager.js";
import { NOTIFICATIONS_API_URL, HOST } from "/Utils/GlobalVariables.js";
import { createNotification } from "/Components/Notification/configs/NotificationManager.js";
import { hideFriendsRequestList } from "/Components/Header/header-bar.js";
import { createApiData } from "/Utils/APIManager.js";
import { router } from "/root/Router.js";


export class FriendRequestListComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="notificationsBar-header">
                <img class="close-button" src="/assets/icons/close-icon.svg" width="24px"/>
                <h3>Friends Requests</h3>
            </div>
            <div class="notificationsBar-body">
                <div class="notification-list">
                    <h5 style="display: flex;width: 100%; color: #d9d9d980; justify-content: center; align-items: center; height: 100%;">There's no friends requests right now.</h5>
                </div>
            </div>
        `;
    }

    async connectedCallback() {
        this.style.width = this.width;
        this.style.height = this.height;
        const notificationList = this.querySelector(".notificationsBar-body");

        const requests = await getApiData(HOST + "/friend/requests/");
        if (!requests)
            return ;

        if (requests.response) {
            const array = Array.from(requests.response);
            if (array.length > 0)
                this.querySelector(".notification-list").innerHTML = '';
            array.forEach( notif => {
                const notification = createNotification(notif.id, notif.sender.username, "want to be a friend", "friend");
                this.appendFriendRequest(notification);
            });
            const notificationIcon = window.document.querySelector(".friends-icon .number-of-friend-requests");
            if (notificationIcon)
                notificationIcon.textContent = array.length;

        }
        
        this.querySelector(".close-button").addEventListener("click", () => {
            hideFriendsRequestList();
        });

        notificationList.scrollTop = notificationList.scrollHeight;

    }
    disconnectedCallback() {
    }

    appendFriendRequest(notificationContent) {
        const notification = new NotificationComponent();
        notification.width = "100%";
        notification.appendChild(notificationContent);
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

customElements.define("friends-request-list", FriendRequestListComponent);