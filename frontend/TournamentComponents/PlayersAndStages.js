export class PlayersAndStages extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="item">
                <h1>Number Of Players</h1>
                <div class="settingsform" id="choices"></div>
            </div>
            <div class="subitems"></div>
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

    createStages(numberOfPlayers) {
        const subItems = this.shadowRoot.querySelector(".subitems");
        subItems.innerHTML = '';
        if (numberOfPlayers >= 16) {
            const rounds = document.createElement("div");
            rounds.className = "item";
            rounds.id = "rounds";
            rounds.innerHTML = `
                    <h2>Round Of 16 will start at: </h2>
                    <div class="settingsform">
                        <input id="date" type="date">
                        <input id="time" type="time">
                    </div>
            `;
            subItems.appendChild(rounds);
        }
        if (numberOfPlayers >= 8) {
            const quarterfinal = document.createElement("div");
            quarterfinal.className = "item";
            quarterfinal.id = "quarterfinal";
            quarterfinal.innerHTML = `
                    <h2>Quarter-Final will start at: </h2>
                    <div class="settingsform">
                        <input id="date" type="date">
                        <input id="time" type="time">
                    </div>
            `;
            subItems.appendChild(quarterfinal);
        }
        if (numberOfPlayers >= 4) {
            const semifinal = document.createElement("div");
            semifinal.className = "item";
            semifinal.id = "semifinal";
            semifinal.innerHTML = `
                    <h2>Semi-Final will start at: </h2>
                    <div class="settingsform">
                        <input id="date" type="date">
                        <input id="time" type="time">
                    </div>
            `;
            subItems.appendChild(semifinal);
        }
        if (numberOfPlayers >= 2) {
            const final = document.createElement("div");
            final.className = "item";
            final.id = "final";
            final.innerHTML = `
                    <h2>Final will start at: </h2>
                    <div class="settingsform">
                        <input id="date" type="date">
                        <input id="time" type="time">
                    </div>
            `;
            subItems.appendChild(final);
        }
    }

    selectItem;

    get selectItem() { return this.selectItem; }


    get stages() {
        let data = [];
        const items = this.shadowRoot.querySelectorAll(".subitems .item");
        items.forEach((item) => {
            let values = {stage_type: "", date: ""};
            const stage_type = item.id.toUpperCase();
            values.stage_type = stage_type;
            const date = item.querySelector(".settingsform #date");
            const time = item.querySelector(".settingsform #time");
            values.date = date.value + "," + time.value;
            data.push(values);
        });
        return data;
    };

    connectedCallback() {
        this.createChoices();
        this.shadowRoot.querySelectorAll(".chooseContainer").forEach(elem => {
            elem.addEventListener("click", () => {
                const selectItemcomponent = this.shadowRoot.getElementById(this.selectItem);
                if (selectItemcomponent)
                {
                    const choice = selectItemcomponent.querySelector(".choice");
                    if (choice)
                        choice.className = "choice";
                }
                this.selectItem = elem.id;
                elem.querySelector(".choice").className = "choice aqua";
                this.createStages(Number(elem.id));
            });
        });
    }

}

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

.subitems {
    display: flex;
    flex-direction: column;
    width: 90%;
    font-size: 16px;
    height: calc(100% - 10px);
    margin: 10px 5%;

}

.subitems .item .settingsform input {
    font-family: 'Sansation';
    max-width: 200px;
    min-width: 100px;
    width: auto;
    height: 40px;
    font-size: 16px;
    padding-right: 10px;
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