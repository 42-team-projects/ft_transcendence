const reverseContent = `
<div class="line-reverse"></div>
<div class="linking-line-reverse"></div>
<div class="playerContainer">
    <div class="player">
        <custom-button id="firstPlayer" height="50px" reverse>
            <slot name="firstPlayer"></slot>
        </custom-button>
    </div>
    <div class="player">
        <custom-button id="secondPlayer" height="50px" reverse>
            <slot name="secondPlayer"></slot>
        </custom-button>
    </div>
</div>
`;

export class TournamentRound extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="container">
                <div class="playerContainer">
                    <div class="player">
                        <custom-button id="firstPlayer" height="50px">
                            <slot name="firstPlayer"></slot>
                        </custom-button>
                    </div>
                    <div class="player">
                        <custom-button id="secondPlayer" height="50px">
                            <slot name="secondPlayer"></slot>
                        </custom-button>
                    </div>
                </div>
                <div class="linking-line"></div>
                <div class="line"></div>
            </div>
        `;
    }

    set width(val) { this.setAttribute("width", val); }
    get width() { return this.getAttribute("width"); }

    set height(val) { this.setAttribute("height", val); }
    get height() { return this.getAttribute("height"); }

    set reverse(val) { this.setAttribute("reverse", val); }
    get reverse() { return this.getAttribute("reverse"); }
    
    set opacity(val) { this.setAttribute("opacity", val); }
    get opacity() { return this.getAttribute("opacity"); }

    
    connectedCallback() {
    }


    disconnectedCallback() {
    }

    static observedAttributes = ["width", "height", "reverse", "opacity"];

    attributeChangedCallback(attrName, oldVdalue, newValue) {
        if (attrName == "width")
        {
            this.shadowRoot.width = newValue;
        }
        else if (attrName == "height")
        {
            this.shadowRoot.height = newValue;
        }
        else if (attrName == "reverse")
        {
            this.shadowRoot.querySelector(".container").innerHTML = reverseContent;
        }
        else if (attrName == "opacity")
        {
            this.style.opacity = newValue;
        }
    }
}

customElements.define("tournament-round", TournamentRound);


const cssContent = /*css*/`
    :host {
        width: 100%;
        flex: 1;
    }

    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin: 0 20px;
    }

    .playerContainer {
        flex: 6;
        max-width: 180px;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .player {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: end;
    }

    .linking-line {
        flex: 1;
        width: 20px;
        height: 50%;
        border-right: 5px;
        border-left: 0px;
        border-top: 5px;
        border-bottom: 5px;
        border-color: aqua;
        border-style: solid;
        margin-left: 15px;
    }

    .linking-line-reverse {
        flex: 1;
        width: 20px;
        height: 50%;
        border-left: 5px;
        border-right: 0px;
        border-top: 5px;
        border-bottom: 5px;
        border-color: aqua;
        border-style: solid;
        margin-right: 15px;
    }

    .line {
        flex: 3;
        width: 25px;
        height: 5px;
        background-color: aqua;
    }

    .line-reverse {
        flex: 3;
        width: 25px;
        height: 5px;
        background-color: aqua;
    }

`;