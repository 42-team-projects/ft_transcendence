import { NotificationComponent } from "./NotificationComponent.js";

export function displayNotification(notificationContent) {
    const notificationContainer = window.document.querySelector(".notification-search .notification-container");
    notificationContainer.innerHTML = '';
    const notification = new NotificationComponent();
    notification.width = "100%";
    notification.innerHTML = notificationContent;
    const nList = window.document.querySelector("notifications-list");
    nList.appendNotification(notification.cloneNode());
    notificationContainer.appendChild(notification);
    const notificationIcon = window.document.querySelector(".notification-search .number-of-notifications");
    notificationIcon.textContent = Number(notificationIcon.textContent) + 1;
}