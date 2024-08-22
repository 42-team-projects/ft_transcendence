
export class StatsContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <slot class="league-bar" name="league-bar"></slot>
            <slot classs="match-record" name="match-record"></slot>
        `;
    }

    connectedCallback() {
    }
}

customElements.define("stats-container", StatsContainer);

const cssContent = /*css*/`

    :host {
        flex: 3;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding: 20px;
        min-width: 600px;
    }

    league-info {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 3;
        margin: 5% 0;
        background-color: aliceblue;
    }

    custom-progress-bar {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex: 1;
        margin-bottom: 20px;
    }

`;