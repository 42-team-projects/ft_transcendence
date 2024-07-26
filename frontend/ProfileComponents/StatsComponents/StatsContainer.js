
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

const cssContent = /*css*/`

    :host {
        grid-area: 1 / 1 / 5 / 5;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        padding: 20px;
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