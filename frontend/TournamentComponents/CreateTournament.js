export class CreateTournament extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="settings-section">
                <div class="itemContainer">
                    <div class="item">
                        <h1>Tournament Name</h1>
                        <div class="settingsform">
                            <input type="text" placeholder="Tournament Name...">
                        </div>
                    </div>
                </div>
                <div class="itemContainer">
                    <div class="item">
                        <h1>Number Of Players</h1>
                        <div class="settingsform">
                            <div class="chooseContainer">
                                <div class="choix"></div>
                                <p>4 Players</p>
                            </div>
                            <div class="chooseContainer">
                                <div class="choix"></div>
                                <p>8 Players</p>
                            </div>
                            <div class="chooseContainer">
                                <div class="choix aqua"></div>
                                <p>16 Players</p>
                            </div>
                        </div>
                    </div>
                    <div class="subitems">
                        <div class="item">
                            <h1>Quarter-Final</h1>
                            <div class="settingsform">
                                <input type="date">
                                <input type="time">
                            </div>
                        </div>
                        <div class="item">
                            <h1>Semi-Final</h1>
                            <div class="settingsform">
                                <input type="date">
                                <input type="time">
                            </div>
                        </div>
                        <div class="item">
                            <h1>Final</h1>
                            <div class="settingsform">
                                <input type="date">
                                <input type="time">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="itemContainer">
                    <div class="item">
                        <h1>Visibility</h1>
                        <div class="settingsform">
                            <div class="chooseContainer">
                                <div class="checkbox"></div>
                                <p>Public</p>
                            </div>
                            <div class="chooseContainer">
                                <div class="checkbox aqua"></div>
                                <p>Private</p>
                            </div>
                        </div>
                    </div>
                    <div class="subitems">
                        <div class="item">
                            <h1>Password</h1>
                            <div class="settingsform">
                                <input type="password">
                            </div>
                        </div>
                        <div class="item">
                            <h1>Confirm Password</h1>
                            <div class="settingsform">
                                <input type="password">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="qrcode-section">
                <h1>Pong Cup</h1>
                <div class="qrcode">
                    <img src="/frontend/assets/tournament-assets/qrcode.svg">
                </div>
            </div>
        `;
    }



    connectedCallback() {

    }

    disconnectedCallback() {

    }

    static observedAttributes = [];

    attributeChangedCallback(attrName, oldVdalue, newValue) {

    }
}

const cssContent = /*css*/`

::-webkit-calendar-picker-indicator {
    filter: invert(1);
}

:host {
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 20px;
    flex-wrap: wrap;
}

.settings-section {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 50px;
    margin-left: 50px;
}

.qrcode-section {
    flex: 1.5;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.qrcode {
    width: 500px;
    height: 500px;
    border: 3px solid aqua;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.qrcode img {
    width: 440px;
    height: 440px;
    opacity: 0.1;
}

.itemContainer {

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

.subitems .item h1 {
    margin: 15px;
    font-size: 24px;

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

.choix {
    width: 26px;
    height: 26px;
    border-radius: 100px;
    background: #cccccc60;
}

.checkbox {
    width: 26px;
    height: 26px;
    border: 2px solid #cccccc60;
    border-radius: 5px;
}


.aqua {
    background: aqua;
}

p {
    font-family: 'Sansation';
    font-size: 14px;
}

::placeholder {
    color: #d9d9d9;
    opacity: 1; /* Firefox */
  }
  
  ::-ms-input-placeholder { /* Edge 12 -18 */
    color: #d9d9d9;
  }

`;