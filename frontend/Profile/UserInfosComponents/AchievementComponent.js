export class AchievementComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                h6 {
                    margin: 0;
                    padding: 0;
                    text-align: center;
                    color: white;
                    font-family: 'Sansation bold';
                }
            </style>
            <div class="content-league">
                <img loading="lazy"   width="80">
                <h6> </h6>
            </div>
        `;
    }

    static observedAttributes = ["icon", "league"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "league")
            this.shadowRoot.querySelector("h6").textContent = newValue.toUpperCase();
        else if (attrName === "icon")
            this.shadowRoot.querySelector(".content-league img").src = newValue;
    }

    connectedCallback() {
        this.shadowRoot.querySelector("h6").textContent = this.league.toUpperCase();
        this.shadowRoot.querySelector(".content-league img").src = this.icon;
    }

    get icon() { return this.getAttribute("icon");}
    set icon(value) { return this.setAttribute("icon", value);}

    get league() { return this.getAttribute("league");}
    set league(value) { return this.setAttribute("league", value);}
}
