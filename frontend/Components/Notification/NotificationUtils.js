import { NotificationComponent } from "/Components/Notification/NotificationComponent.js";
import { NewFriendNotification } from "/Components/Notification/templates/NewFriendNotification.js";

let notificationInterval;
export function displayNotification(notificationContent) {
    
    // clear the notification container.
    const notificationContainer = window.document.querySelector(".notification-search .notification-container");
    notificationContainer.innerHTML = '';

    // create a new notification component.
    const notification = new NotificationComponent();
    notification.width = "100%";
    notification.appendChild(notificationContent.cloneNode());

    // add notification to notification list.
    window.document.querySelector("notifications-list").appendNotification(notificationContent);

    // display notification on the top corner.
    notificationContainer.appendChild(notification);
    if (notificationInterval) {
        clearInterval(notificationInterval);
        notificationInterval = 0;
    }

    notificationInterval = setInterval(() => {
        notificationContainer.innerHTML = '';
        clearInterval(notificationInterval);
        notificationInterval = 0;
        console.log("helllo wolrllrlrlrlrl??");
    }, 5000);

    // increment the notification counter.
    const notificationIcon = window.document.querySelector(".notification-search .number-of-notifications");
    notificationIcon.textContent = Number(notificationIcon.textContent) + 1;
}