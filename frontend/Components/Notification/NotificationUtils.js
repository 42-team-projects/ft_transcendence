import { NotificationComponent } from "./NotificationComponent.js";

export function displayNotification(notificationContent) {
    const notificationContainer = window.document.querySelector(".notification-search .notification-container");
    notificationContainer.innerHTML = '';
    const notification = new NotificationComponent();
    notification.width = "100%";
    notification.innerHTML = notificationContent;
    window.document.querySelector("notifications-list .notification-list").appendNotification(notification);
    notificationContainer.appendChild(notification);
    const notificationIcon = window.document.querySelector(".notification-search .number-of-notifications");
    notificationIcon.textContent = Number(notificationIcon.textContent) + 1;
}