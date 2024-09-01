export class TournamentRules extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <u><h1>Tournament Rules:</h1></u>
                <h2>1 - Player Registration:</h2>
                    <div>• <p>Players must register with a valid username.</p></div>
                    <div>• <p>Registration closes 24 hours before the tournament start time.</p></div>
                <h2>2 - Tournament Structure:</h2>
                    <div>• <p>The tournament will be a single-elimination format.</p></div>
                    <div>• <p>Each match will consist of 3 rounds.</p></div>
                    <div>• <p>The winner of 2 out of 3 rounds advances to the next stage.</p></div>
                <h2>3 - Game Settings:</h2>
                    <div>• <p>Default game settings will be used.</p></div>
                    <div>• <p>Any changes to game settings must be approved by the tournament organizers.</p></div>
                <h2>4 - Tournament Expiration:</h2>
                    <div>• <p>The tournament must reach its full capacity of players (4, 8, or 16) within 7 days of the creation date.</p></div>
                    <div>• <p>If the tournament is not full by the expiration date, it will be canceled, and registered players will be notified.</p></div>
                    <div>• <p>Players registered in a canceled tournament will be given priority registration for the next available tournament.</p></div>

    `;
    }
    connectedCallback() {

    }

    disconnectedCallback() {

    }

    static observedAttributes = [];

    attributeChangedCallback(attrName, oldValue, newValue) {
    }

    // get title() { return this.getAttribute("title");}
    // set title(val) { this.setAttribute("title", val);}
    
}

customElements.define("tournament-rules", TournamentRules);

const cssContent = /*css*/`
:host {
    flex: 1.5;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 50px;
    min-width: 600px;
}

* {
    margin: 0;
    padding: 0;
}

h1 {
    margin-bottom: 30px;
}

h2 {
    margin: 15px 2%;
}

div {
    font-family: 'Sansation';
    margin: 5px 5%;
    display: flex;
}

div p {
    display: inline-block;
    margin-left: 10px;
}

`;