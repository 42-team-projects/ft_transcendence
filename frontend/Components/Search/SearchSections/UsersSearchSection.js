export class UsersSearchSection extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>

                .search-actions {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                }

            </style>
            <div class="search-sections">
                <h2 class="result-section-title">USERS</h2>
                <div class="result-section-content">
                    <div class="item">
                        <div class="profile-item">
                            <c-hexagon class="online" width="56px" height="55px" apply="true" bcolor="#d9d9d9" >
                                <div class="profile-icon" slot="content"></div>
                            </c-hexagon>
                            <h4>ESALIM</h4>
                        </div>
                        <div class="search-actions">
                            <img src="../../assets/icons/manette-icon.svg" class="read-message" width="24px" height="24px"></img>
                            <img src="../../assets/icons/account-icon.svg" class="read-message" width="24px" height="24px"></img>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    connectedCallback() {

    }
}

customElements.define("users-search-section", UsersSearchSection);