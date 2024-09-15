import { TournamentNotification } from "/Components/Notification/templates/TournamentNotification.js";
import { MessageNotification } from "/Components/Notification/templates/MessageNotification.js";
import { NewFriendNotification } from "/Components/Notification/templates/NewFriendNotification.js";
import { GameNotification } from "/Components/Notification/templates/GameNotification.js";

export function createNotification(notificationId, senderName, message, notification_type, data) {
    let notification;
    if (notification_type == "game") {
        notification = new GameNotification();
        notification.id = notificationId;
        notification.senderName = senderName;
        notification.message = message;
    }
    else if (notification_type == "message") {
        notification = new MessageNotification();
        notification.id = notificationId;
        notification.senderName = senderName;
        notification.message = message;
    }
    else if (notification_type == "friend") {
        notification = new NewFriendNotification();
        notification.id = notificationId;
        notification.senderName = senderName;
        notification.message = message;
    }
    else if (notification_type == "tournament") {
        notification = new TournamentNotification();
        notification.id = notificationId;
        notification.senderName = senderName;
        notification.message = message;
        console.log("createNotification data: ", data);
        notification.tournamentId = data;
    
    }
    return notification;
}
