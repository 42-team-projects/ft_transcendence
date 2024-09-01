export class MessageNotification extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="mainContainer">
                <div class="message">
                    <c-hexagon class="online" width="56px" height="55px" apply="true" bcolor="#d9d9d9" >
                        <div class="profile-icon" slot="content"></div>
                    </c-hexagon>
                    <h4>ESLAIM sent you a new message</h4>
                </div>
                <div class="notification-actions">
                    <img src="../../../assets/icons/arrow-forward-icon.svg" class="read-message"></img>
                </div>
            </div>
        `;
    }

    connectedCallback() {

    }
}

customElements.define("message-notification", MessageNotification);