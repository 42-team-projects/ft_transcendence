
export class LeagueInfo extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./ProfileComponents/StatsComponents/LeagueComponents/LeagueInfo.css">
            <slot name="current-rank"></slot>
            <slot name="league-logo"></slot>
            <slot name="next-league"></slot>
        `;
    }
}
