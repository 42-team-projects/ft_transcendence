import { TournamentNotification } from "/Components/Notification/templates/TournamentNotification.js";
import { MessageNotification } from "/Components/Notification/templates/MessageNotification.js";
import { NewFriendNotification } from "/Components/Notification/templates/NewFriendNotification.js";

export function createNotification(senderName, message, notification_type, data) {
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
    else if (notification_type == "tournament") {
        console.log("data: ", data);
        notification = new TournamentNotification();
        notification.senderName = senderName;
        notification.message = message;
        notification.tournamentId = data;
    
    }
    return notification;
}
