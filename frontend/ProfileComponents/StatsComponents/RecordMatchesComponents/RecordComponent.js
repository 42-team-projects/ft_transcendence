export class RecordComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/frontend/ProfileComponents/StatsComponents/RecordMatchesComponents/RecordComponent.css">
        <p class="match-record-text">RECORD MATCHES</p>
        <div class="match-record-stats">
            <div class="match-record-stats-box">
                <p class="match-record-stats-box-title">WIN</p>
                <p class="match-record-stats-box-value">${this.win}</p>
            </div>
            <div class="match-record-stats-box">
                <p class="match-record-stats-box-title">LOSS</p>
                <p class="match-record-stats-box-value color-red">${this.loss}</p>
            </div>
            <div class="match-record-stats-box">
                <hr>
            </div>
            <div class="match-record-stats-box">
                <p class="match-record-stats-box-title">WIN RATE</p>
                <p class="match-record-stats-box-value color-white">${this.winrate}%</p>
            </div>
        </div>
    `;
    }

    get win() { return this.getAttribute("win"); }
    get loss() { return this.getAttribute("loss"); }
    get winrate() { return this.getAttribute("winrate"); }

    set win(value) { this.setAttribute("win", value); }
    set loss(value) { this.setAttribute("loss", value); }
    set winrate(value) { this.setAttribute("winrate", value); }
}
