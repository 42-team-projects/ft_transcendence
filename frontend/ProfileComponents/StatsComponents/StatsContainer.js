
export class StatsContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./ProfileComponents/StatsComponents/StatsContainer.css">
            <slot class="league-bar" name="league-bar"></slot>
            <slot classs="match-record" name="match-record"></slot>
        `;
    }

}