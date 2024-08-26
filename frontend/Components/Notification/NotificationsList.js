import { NotificationComponent } from "./NotificationComponent.js";

export class NotificationsList extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="notificationsBar-header">
                <h3>NOTIFICATIONS</h3>
            </div>
            <div class="notificationsBar-body">
                <div class="notification-list">
                    <notification-component></notification-component>
                </div>
            </div>
            <div class="notificationsBar-footer">
                <h4>Clear All</h4>
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