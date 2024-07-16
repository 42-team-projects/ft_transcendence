export class AchievementComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>${cssContent}</style>
            <div class="content-league">
                <img src="${this.icon}" width="80">
                <h6>${this.league.toLocaleUpperCase()}</h6>
            </div>
        `;
    }

    get icon() { return this.getAttribute("icon");}
    set icon(value) { return this.setAttribute("icon", value);}

    get league() { return this.getAttribute("league");}
    set league(value) { return this.setAttribute("league", value);}
}

const cssContent = /*css*/`

:host * {
    margin: 0;
    padding: 0;

}

h6 {
    text-align: center;
    color: white;
    font-family: 'Sansation bold';

}

`;