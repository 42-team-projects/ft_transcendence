import { deleteApiData } from "/Utils/APIManager.js";
import { NotificationComponent } from "/Components/Notification/NotificationComponent.js";
import { NewFriendNotification } from "/Components/Notification/templates/NewFriendNotification.js";
import { HOST } from "/Utils/GlobalVariables.js";

let notificationInterval;
export function displayNotification(notificationContent, notifType) {
    
    // clear the notification container.
    const notificationContainer = window.document.querySelector(".notification-search .notification-container");
    notificationContainer.innerHTML = '';

    // create a new notification component.
    const notification = new NotificationComponent();
    notification.width = "100%";
    notification.appendChild(notificationContent);



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
        if (notifType === "friend") {
            window.document.querySelector(".right-sidebar friends-request-list").appendFriendRequest(notificationContent);
            const notificationIcon = window.document.querySelector(".friends-icon .number-of-friend-requests");
            notificationIcon.textContent = Number(notificationIcon.textContent) + 1;
        }
        else {
            window.document.querySelector(".right-sidebar notifications-list").appendNotification(notificationContent);
            const notificationIcon = window.document.querySelector(".notification-search .number-of-notifications");
            if (notificationIcon)
                notificationIcon.textContent = Number(notificationIcon.textContent) + 1;
            
        }
    }, 5000);
}



export async function removeNotification(id) {
    await deleteApiData(HOST + "/notification/remove/" + id + "/");
    const notificationIcon = window.document.querySelector(".notification-search .number-of-notifications");
    if (notificationIcon) {
        notificationIcon.textContent = Number(notificationIcon.textContent) - 1;
        if (notificationIcon.textContent < 0)
            notificationIcon.textContent = 0;
    }
    
}
