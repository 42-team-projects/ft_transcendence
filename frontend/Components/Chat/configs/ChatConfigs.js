import { getApiData } from "../../../Utils/APIManager.js";
import { HOST } from "../../../Utils/APIUrls.js";
import { ChatFooterComponent } from "../ChatRoom/ChatFooterComponent.js";
import { ChatHeaderComponent } from "../ChatRoom/ChatHeaderComponent.js";

export function renderChatHeader(chatContainer, conversationData) {
    const header = new ChatHeaderComponent();
    header.playerId = conversationData.reciever.id;
    header.userName = conversationData.reciever.username;
    // if (targetUserData.stats)
    // {
        header.league = "gold";
    // }
    header.active = conversationData.reciever.is_active;
    header.profileImage = HOST + conversationData.reciever.avatar;
    header.slot = "header";
    chatContainer.appendChild(header);
}


let checker;

export async function renderChatBody(chatContainer, conversationName) {
    const messagesContainer = chatContainer.querySelector(".body");
    // messagesContainer.scrollTop = messagesContainer.scrollHeight;
    const messages = await getApiData(HOST + "/chat/messages?cn=" + conversationName);

    renderConversation(messagesContainer, messages);
    chatContainer.appendChild(messagesContainer);
}

export function renderConversation(chatBody, messages) {
    let receiverComponent = document.createElement("receiver-component");
    let senderComponent = document.createElement("sender-component");
    for (let index = 0; index < messages.length; index++) {
        const element = messages[index];
        console.log("element: ", element);
        if (element.user == 3)
        {
            const receiverMessageContainer = document.createElement("receiver-message-container");
            receiverMessageContainer.textContent = element.content;
            if (checker != element.user)
            {
                receiverMessageContainer.setAttribute("corner", "");
                receiverComponent = document.createElement("receiver-component")
            }
            receiverMessageContainer.time = element.sent_at.split("-")[0];
            receiverComponent.league = "gold";
            receiverComponent.profileImage = "../../assets/images/profile/tanjuro.jpg";
            receiverComponent.appendChild(receiverMessageContainer);
            chatBody.appendChild(receiverComponent);
        }
        else
        {
            const senderMessageContainer = document.createElement("sender-message-container");
            senderMessageContainer.textContent = element.content;
            if (checker != element.user)
            {
                senderMessageContainer.setAttribute("corner", "");
                senderComponent = document.createElement("sender-component");
            }
            senderMessageContainer.time = element.sent_at.split("-")[0];
            senderComponent.appendChild(senderMessageContainer);
            chatBody.appendChild(senderComponent);
        }
        checker = messages[index].user;
    }

}


export function renderChatFooter(chatContainer, webSocket) {
    const footer = new ChatFooterComponent();
    footer.slot = "footer";
    footer.webSocket = webSocket;
    chatContainer.appendChild(footer);
}

