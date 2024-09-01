export class LeagueItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
                <style>
                    :host * {
                        margin:0;
                        padding: 0;
                    }
                    .title {
                        text-align: center;
                        align-items: center;
                        font-size: 26px;
                        color: white;
                        margin-bottom: 10px;
                    }
                    :host slot {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 26;
                        width: 100%;
                        color: white;
                    }
                    .league-name {
                        color: #fff;
                        width: 100%;
                        text-align: center;
                        margin: 20px 0;
                    }
                </style>
                <p class="title"> </p>
                <hr width="100%">
                <p class="league-name">BRONZE LEAGUE</p>
                <slot></slot>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".league-name").style.color = this.color;
        this.shadowRoot.querySelector(".title").textContent = this.title.toUpperCase();
        this.shadowRoot.querySelector(".league-name").textContent = (this.league + " league").toUpperCase();
    }

    get color() { return this.getAttribute("color"); }
    get league() { return this.getAttribute("league"); }
    get title() { return this.getAttribute("title"); }

    set league(value) {this.setAttribute("league", value);}
    set color(value) {this.setAttribute("color", value);}
    set title(value) {this.setAttribute("title", value);}

    static observedAttributes = ["color", "league", "title"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "color")
            this.shadowRoot.querySelector(".league-name").style.color = newValue;
        else if (attrName === "title")
            this.shadowRoot.querySelector(".title").textContent = newValue.toUpperCase();
        else if (attrName === "league")
            this.shadowRoot.querySelector(".league-name").textContent = newValue.toUpperCase();
    }
}

customElements.define("league-item", LeagueItem);
