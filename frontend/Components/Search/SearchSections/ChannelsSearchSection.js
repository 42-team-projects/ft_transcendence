export class ChannelsSearchSection extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="search-sections">
                <h2 class="result-section-title">CHANNELS</h2>
                <div class="result-section-content">
                    <div class="item">
                        <div class="profile-item">
                            <p>ESALIM</p>
                        </div>
                        <div class="search-actions">
                            <img src="/assets/icons/arrow-forward-icon.svg" class="read-message" width="32px" height="32px"></img>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    connectedCallback() {

    }
}

customElements.define("channels-search-section", ChannelsSearchSection);