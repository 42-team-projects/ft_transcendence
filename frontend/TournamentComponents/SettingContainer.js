export class SettingContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="item">
                <h1 slot="item">Tournament Name</h1>
                <div class="settingsform" slot="item">
                    <slot name="content"></slot>
                </div>
            </div>
            <slot name="subitems"></slot>
        `;
    }
}

const cssContent = /*css*/`

:host {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #eeeeee20;
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
.settingsform ::slotted(input) {
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

`;

/*
                <div class="item">
                    <h1>Tournament Name</h1>
                    <div class="settingsform">
                        <input type="text" placeholder="Tournament Name...">
                    </div>
                </div>

*/