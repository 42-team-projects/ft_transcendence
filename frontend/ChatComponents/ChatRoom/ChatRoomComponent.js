const APIUrl = "http://localhost:8080/api/v1/conversations/sender=2&receiver=1"

export class ChatRoomComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    font-family: 'Sansation bold';
                    height: 1000px;
                    display: flex;
                    flex: 2.5;
                    flex-direction: column;
                }

                .body {
                    flex: 10;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    overflow-y: scroll;
                }

                .body::-webkit-scrollbar {
                    opacity: 0.7;
                    background-color: transparent;
                    width: 1px;
                }
                
                .body::-webkit-scrollbar-track {
                    opacity: 0.7;
                    border-radius: 100px;
                }
                
                .body::-webkit-scrollbar-thumb {
                    opacity: 0.7;
                    background-color: #d9d9d9;
                    border-radius: 100px;
                }

                .timer p {
                    margin: 0;
                    font-size: 10px;
                    color: #C5C4C490;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 10px;
                }

            </style>
            <chat-header></chat-header>
            <div class="body">
            </div>
            <chat-footer></chat-footer>
        `;
    }


    // <div class="timer">
    //     <p>12:05 PM</p>
    // </div>

    async connectedCallback() {
        try {
            const response = await fetch(APIUrl);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            fakeData = json;
        } catch (error) {
            console.error(error.message);
        }
        const chatBdoy = this.shadowRoot.querySelector(".body");
        fakeData.forEach(element => {
            if (element.receiverId == 2)
            {
                const receiverComponent = document.createElement("receiver-component");
                const receiverMessageContainer = document.createElement("receiver-message-container");
                receiverMessageContainer.textContent = element.message;
                receiverMessageContainer.setAttribute("corner", "");
                receiverComponent.appendChild(receiverMessageContainer);
                chatBdoy.appendChild(receiverComponent);
            }
            else
            {
                const senderComponent = document.createElement("sender-component");
                const senderMessageContainer = document.createElement("sender-message-container");
                senderMessageContainer.textContent = element.message;
                senderMessageContainer.setAttribute("corner", "");
                senderComponent.appendChild(senderMessageContainer);
                chatBdoy.appendChild(senderComponent);
            }
        });
    }
}
let fakeData = [];
// let fakeData = [
//     {
//         "id": 1,
//         "senderId": 1,
//         "receiverId": 2,
//         "message": "Hey Anna, how's it going?",
//         "time": "23-07-2024 17:09:27:927"
//     },
//     {
//         "id": 2,
//         "senderId": 2,
//         "receiverId": 1,
//         "message": "Hey John! I'm good, thanks. How about you?",
//         "time": "23-07-2024 17:09:27:927"
//     },
//     {
//         "id": 3,
//         "senderId": 1,
//         "receiverId": 2,
//         "message": "I'm doing well! Just finished a project at work.",
//         "time": "23-07-2024 17:09:27:927"
//     },
//     {
//         "id": 4,
//         "senderId": 2,
//         "receiverId": 1,
//         "message": "That's awesome! What was the project about?",
//         "time": "23-07-2024 17:09:27:927"
//     },
//     {
//         "id": 5,
//         "senderId": 1,
//         "receiverId": 2,
//         "message": "It was a website redesign for a local business. Took a lot of effort, but it turned out great.",
//         "time": "23-07-2024 17:09:27:927"
//     },
//     {
//         "id": 6,
//         "senderId": 2,
//         "receiverId": 1,
//         "message": "Wow, that sounds like a lot of work. Congrats on finishing it!",
//         "time": "23-07-2024 17:09:27:927"
//     },
//     {
//         "id": 7,
//         "senderId": 1,
//         "receiverId": 2,
//         "message": "Thanks! How's your latest project going?",
//         "time": "23-07-2024 17:09:27:927"
//     },
//     {
//         "id": 8,
//         "senderId": 2,
//         "receiverId": 1,
//         "message": "It's going well, but there's still a lot to do. I'm hoping to wrap it up by the end of the month.",
//         "time": "23-07-2024 17:09:27:927"
//     },
//     {
//         "id": 9,
//         "senderId": 1,
//         "receiverId": 2,
//         "message": "Good luck with that! If you need any help, let me know.",
//         "time": "23-07-2024 17:09:27:927"
//     },
//     {
//         "id": 10,
//         "senderId": 2,
//         "receiverId": 1,
//         "message": "Thanks, John! I'll definitely reach out if I do.",
//         "time": "23-07-2024 17:09:27:927"
//     }
// ];