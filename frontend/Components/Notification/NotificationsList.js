import { getCurrentUserId } from "../../Utils/GlobalVariables.js";
import { showNotifiactionsList } from "../Header/header-bar.js";
import { NotificationComponent } from "./NotificationComponent.js";
import { displayNotification } from "./NotificationUtils.js";
import { MessageNotification } from "./templates/MessageNotification.js";

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

    async connectedCallback() {
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
        const currentUserId = await getCurrentUserId();
        this.notifiactionWebSocket = this.createWebSocket(currentUserId);
    }
    notifiactionWebSocket;
    disconnectedCallback() {
        if (this.notifiactionWebSocket)
            this.notifiactionWebSocket.close();
    }



    createWebSocket(userId) {
        let wsUrl = `ws://${window.location.hostname}:8000/ws/notification/${userId}/`;
        console.log("wsUrl: ", wsUrl);
        const webSocket = new WebSocket(wsUrl)
        webSocket.onopen = () => {
            console.log('WebSocket connection of chat is opened');
        };
        webSocket.onerror = (error) => {
            console.log('WebSocket encountered an error: ', error);
        };
        webSocket.onclose = (event) => {
            console.log('WebSocket connection closed: ', event);
        };
        webSocket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            if (data.Error) {
                console.log(data.Error)
            }
            else {
                console.log("data: ", data);
                const messageNotification = new MessageNotification();
                
                displayNotification("<message-notification></message-notification>");
                // renderConversation(chatContainer, [data]);
            }
        };
        return (webSocket);
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