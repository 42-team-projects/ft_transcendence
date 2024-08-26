
export class LeagueInfo extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <slot name="current-rank"></slot>
            <slot name="league-logo"></slot>
            <slot name="next-league"></slot>
        `;
    }
    connectedCallback() {
    }
}

customElements.define("league-info", LeagueInfo);

const cssContent = /*css*/`
        :host {
            width: 100%;
            display: flex;
            flex: 2;
            align-items: center;
            justify-content: space-between;
        }

        :host * {
            margin:0;
            padding: 0;
        }

        .current-rank,
        .next-league,
        .league-logo {
            font-family: 'Sansation Bold', 'Sansation';
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            margin: 0px 5%;
            justify-content: center;
        }


        .current-rank > .league-name,
        .next-league > .league-name {
            align-items: center;
            font-size: 16px;
            color: #EB9A45;
        }

        .next-league > .league-name {color: rgb(85, 146, 226);}

        .current-rank > h1 {
            align-items: center;
            font-size: 40px;
            color: white;
        }

        .league-logo > .current-league-logo {
            width: 130px;
            height: 130px;
        }

        .next-league > .next-league-logo {
            width: 48px;
            height: 48px;
        }

        slot {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;
        }
`;
