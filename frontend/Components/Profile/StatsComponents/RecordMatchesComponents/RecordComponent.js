export class RecordComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
                <style>
                    ${cssContent}
                </style>
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
        return (Math.round((100 * Number(win)) / (Number(win) + Number(loss)) * 10 || 0.0001) / 10);
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

customElements.define("record-component", RecordComponent);

const cssContent = /*css*/`

        :host {
            gap: 40px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        :host * {
            margin: 0;
            padding: 0;
        }


        .match-record-text {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;
            font-size: 28px;

        }

        .match-record-stats {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }


        .match-record-stats-box {
            font-size: 22px;
            display: flex;
            flex: 1;
            gap: 10px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }


        .match-record-stats-box > hr {
            height: 70px;
            width: 2.4px;
            background-color: white;
        }

        .match-record-stats-box-value {
            color: aqua;
            font-size: 48px;
        }

        .color-red {
            color: #EB4545;
        }

        .color-white {
            color: white;
        }

`;