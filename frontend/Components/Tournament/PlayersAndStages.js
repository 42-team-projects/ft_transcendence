export class PlayersAndStages extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="item">
                <h2>Number Of Players</h2>
                <div class="settingsform" id="choices"></div>
            </div>
        `;
    }

    createChoices() {
        const values = ["4 Players", "8 Player", "16 Player"];
        const settingsform = this.shadowRoot.querySelector(".settingsform");
        values.forEach(val => {
            const id = val.split(" ")[0];
            const chooseContainer = document.createElement("div");
            chooseContainer.className = "chooseContainer";
            chooseContainer.id = id;
            chooseContainer.innerHTML = `<div class="choice"></div> <p>${val}</p>`;
            settingsform.appendChild(chooseContainer);
        });
    }

    set selectItemId(val) {
        const choices = this.shadowRoot.querySelectorAll(".choice");
        choices.forEach(elem => elem.style.border = "none");
        this.setAttribute("selectItemId", val);
    }

    get selectItemId() {
        const attr = this.getAttribute("selectItemId");
        if (!attr) {
            const choices = this.shadowRoot.querySelectorAll(".choice");
            choices.forEach(elem => elem.style.border = "1px solid red");
        }
        return attr;
    }

    connectedCallback() {
        this.createChoices();
        this.shadowRoot.querySelectorAll(".chooseContainer").forEach(elem => {
            elem.addEventListener("click", () => {
                const choices = this.shadowRoot.querySelectorAll(".choice");
                choices.forEach(elem => elem.style.border = "none");
                const selectItemcomponent = this.shadowRoot.getElementById(this.selectItemId);
                if (selectItemcomponent)
                {
                    const choice = selectItemcomponent.querySelector(".choice");
                    if (choice)
                        choice.className = "choice";
                }
                this.selectItemId = elem.id;
                elem.querySelector(".choice").className = "choice aqua";
            });
        });
    }

    static observedAttributes = ["selectItemId"];

    attributeChangedCallback(attrName, oldValue, newValue) {}

}

customElements.define("players-and-stages", PlayersAndStages);


const cssContent = /*css*/`
:host {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.item {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}

.item h1 {
    flex: 1;
}

.item h2 {
    font-family: 'Sansation';
    flex: 1;
}
.settingsform {
    flex: 1;
    width: 300px;
    height: 40px;
    display: flex;
    gap: 20px;
}
.settingsform input {
    height: 100%;
    border-radius: 10px;
    border: 1.5px solid aqua;
    width: 50%;
    background-color: transparent;
    font-family: 'Sansation Bold';
    color: #ffffff;
    margin-left: 10px;
    padding-left: 20px;
    outline: none;
}

.chooseContainer {
    display: flex;
    gap: 10px;
    height: 26px;
    font-size: 16px;
    align-items: center;
    
}

.choice {
    width: 26px;
    height: 26px;
    border-radius: 100px;
    background: #cccccc60;
}

.aqua {
    background: aqua;
}

p {
    font-family: 'Sansation';
    font-size: 14px;
}


/* Placeholder styles */
input::placeholder {
    color: #d9d9d9;
    opacity: 1; /* Firefox */
}

/* Edge 12-18 */
input::-ms-input-placeholder {
    color: #d9d9d9;
}

/* Internet Explorer 10-11 */
input:-ms-input-placeholder {
    color: #d9d9d9;
}

`;