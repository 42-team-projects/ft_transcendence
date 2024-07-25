export class RecordComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="./ProfileComponents/StatsComponents/RecordMatchesComponents/RecordComponent.css">
                <p class="match-record-text">RECORD MATCHES</p>
                <div class="match-record-stats">
                    <div class="match-record-stats-box">
                        <p class="match-record-stats-box-title">WIN</p>
                        <p id="win" class="match-record-stats-box-value"> </p>
                    </div>
                    <div class="match-record-stats-box">
                        <p class="match-record-stats-box-title">LOSS</p>
                        <p id="loss" class="match-record-stats-box-value color-red"> </p>
                    </div>
                    <div class="match-record-stats-box">
                        <hr>
                    </div>
                    <div class="match-record-stats-box">
                        <p class="match-record-stats-box-title">WIN RATE</p>
                        <p id="winrate" class="match-record-stats-box-value color-white"> 0% </p>
                    </div>
                </div>
            `;
    }
    connectedCallback() {
        this.shadowRoot.getElementById("win").textContent = this.win;
        this.shadowRoot.getElementById("loss").textContent = this.loss;
        this.shadowRoot.getElementById("winrate").textContent = this.calculeWinRateValue(this.win, this.loss) + "%";
    }
    
    get win() { return this.getAttribute("win"); }
    get loss() { return this.getAttribute("loss"); }

    set win(value) { this.setAttribute("win", value); }
    set loss(value) { this.setAttribute("loss", value); }

    static observedAttributes = ["win", "loss"];

    calculeWinRateValue(win, loss) {
        return (Math.round((100 * Number(win)) / (Number(win) + Number(loss)) * 10) / 10);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "win")
        {
            this.shadowRoot.getElementById("win").textContent = newValue;
            this.shadowRoot.getElementById("winrate").textContent = this.calculeWinRateValue(newValue, this.loss) + "%";
        }
        else if (attrName === "loss")
        {
            this.shadowRoot.getElementById("loss").textContent = newValue;
            this.shadowRoot.getElementById("winrate").textContent = this.calculeWinRateValue(this.win, newValue) + "%";
        }
    }
}
