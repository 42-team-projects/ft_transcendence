import { MessageNotification } from "/Components/Notification/templates/MessageNotification.js";
import { NewFriendNotification } from "/Components/Notification/templates/NewFriendNotification.js";

export function createNotification(senderName, message, notification_type) {
    let notification;
    if (notification_type == "message") {
        notification = new MessageNotification();
        notification.senderName = senderName;
        notification.message = message;
    }
    else if (notification_type == "friend") {
        notification = new NewFriendNotification();
        notification.senderName = senderName;
        notification.message = message;
    }
    // else if (notification_type == "tournament") {
    //     notification = new MessageNotification();
    
    // }
    // else {
        
    // }
    return notification;
}
