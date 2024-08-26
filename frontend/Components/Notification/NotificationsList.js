import { NotificationComponent } from "./NotificationComponent.js";

export class NotificationsList extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="notificationsBar-header">
                <h3>NOTIFICATIONS</h3>
            </div>
            <div class="notificationsBar-body">
                <div class="notification-list"></div>
            </div>
            <div class="notificationsBar-footer">
                <h5>Clear All</h5>
            </div>
        `;
    }

    connectedCallback() {
        this.style.width = this.width;
        this.style.height = this.height;
        const notificationList = this.querySelector(".notificationsBar-body");
        notificationList.scrollTop = notificationList.scrollHeight;
    }

    disconnectedCallback() {

    }


    appendNotification(notification) {
        const notificationsList = this.querySelector(".notification-list");
        notificationsList.appendChild(notification);
        console.log("hello world 11222:", notification);
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