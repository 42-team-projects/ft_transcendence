/*
    <p class="title">CURRENT RANK</p>
    <hr width="100%">
    <p class="league-name">GOLD LEAGUE</p>
*/

export class LeagueItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                .title {
                    text-align: center;
                    align-items: center;
                    font-size: 20px;
                    color: white;
                }
                slot {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    width: 100%;
                    color: white;
                }
                .league-name {
                    color: ${this.color};
                    width: 100%;
                    text-align: center;
                }
            </style>
            <p class="title">${this.title.toUpperCase()}</p>
            <hr width="100%">
            <p class="league-name">${this.league.toUpperCase()} LEAGUE</p>
            <slot></slot>
        `;
    }

    get color() { return this.getAttribute("color"); }
    get league() { return this.getAttribute("league"); }
    get title() { return this.getAttribute("title"); }

    set league(value) {this.setAttribute("league", value);}
    set color(value) {this.setAttribute("color", value);}
    set title(value) {this.setAttribute("title", value);}
}