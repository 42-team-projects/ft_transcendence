import { getApiData } from "/Utils/APIManager.js";
import { HOST } from "/Utils/GlobalVariables.js";
import { getCurrentUserId } from "/Utils/GlobalVariables.js";
import { ChatFooterComponent } from "/Components/Chat/ChatRoom/ChatFooterComponent.js";
import { ChatHeaderComponent } from "/Components/Chat/ChatRoom/ChatHeaderComponent.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";

export function renderChatHeader(chatContainer, conversationData, is_blocked) {
    const header = chatContainer.querySelector("chat-header");
    header.playerId = conversationData.id;
    header.userId = conversationData.user.id;
    header.userName = conversationData.user.username;
    header.league = conversationData.stats.league;
    header.active = conversationData.active;
    header.profileImage = HOST + conversationData.user.avatar;
    header.isblocked = is_blocked;
}



export async function renderChatBody(chatContainer, conversationName) {
    const messagesContainer = chatContainer.querySelector(".body");
    const messages = await getApiData(HOST + "/chat/messages?cn=" + conversationName);
    if (messages && messages.length)
        messagesContainer.innerHTML = '';
    renderConversation(messagesContainer, messages);
}



function renderMessageComponent(chatBody, messageContainer, component, message, checker) {
    console.log("message: ", message);
    messageContainer.time = message.sent_at.slice(11, 16);
    messageContainer.textContent = message.content;
    if (checker != message.user)
    {
        messageContainer.setAttribute("corner", "");
        component = component.cloneNode();
    }
    component.appendChild(messageContainer);
    return component;
}


let checker;


export async function renderConversation(chatBody, messages) {
    if (!messages)
        return;
    let receiverComponent = document.createElement("receiver-component");
    let senderComponent = document.createElement("sender-component");
    const currentUserId = await getCurrentUserId();
    for (let index = 0; index < messages.length; index++) {
        const message = messages[index];
        let messageContainer;
        if (message.user != currentUserId) {
            messageContainer = document.createElement("receiver-message-container");
            receiverComponent = renderMessageComponent(chatBody, messageContainer, receiverComponent, message, checker);
            chatBody.appendChild(receiverComponent);

        }
        else {
            messageContainer = document.createElement("sender-message-container");
            senderComponent = renderMessageComponent(chatBody, messageContainer, senderComponent, message, checker);
            chatBody.appendChild(senderComponent);
        }
        checker = message.user;
    }
    chatBody.scrollTop = chatBody.scrollHeight;
}


export function renderChatFooter(chatContainer, webSocket, targetId) {
    const footer = new ChatFooterComponent();
    footer.slot = "footer";
    footer.webSocket = webSocket;
    footer.targetId = targetId;
    chatContainer.appendChild(footer);
}

