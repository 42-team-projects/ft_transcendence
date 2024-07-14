export class StatsContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <slot name="league-bar"></slot>
            <slot name="match-record"></slot>
        `;
    }

}