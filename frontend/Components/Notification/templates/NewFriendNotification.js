export class NewFriendNotification extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="mainContainer">
                <div class="message">
                    <c-hexagon class="online" width="56px" height="55px" apply="true" bcolor="#d9d9d9" >
                        <div class="profile-icon" slot="content"></div>
                    </c-hexagon>
                    <h4>ESLAIM want to be a friend</h4>
                </div>
                <div class="notification-actions">
                    <img src="../../../assets/icons/checked-icon.svg" class="accept" width="32px" height="32px"></img>
                    <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="red"/>
                    </svg>
                </div>
            </div>
        `;
    }

    connectedCallback() {

    }
}

customElements.define("new-friend-notification", NewFriendNotification);