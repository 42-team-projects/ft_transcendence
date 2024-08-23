export class UserInfoContainerComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style> ${cssContent} </style>
        <div class="profile-data-infos-container-item">
            <div class="title">
                <img   src="${this.icon}" width="32">
                <p>${this.label}</p>
            </div>
            <slot></slot>
        </div>
        `;
    }

    get label() { return this.getAttribute("label");}
    set label(value) { return this.setAttribute("label", value);}

    get icon() { return this.getAttribute("icon");}
    set icon(value) { return this.setAttribute("icon", value);}
}

//assets/profile-assets/trophy.svg

const cssContent = /*css*/`

:host {
    color: #d9d9d9;
    font-family: 'Sansation';
    font-size: 16px;
    display:flex;
    flex-direction: column;
    width: 100%;
    padding-left: 20px;
}

slot {
    color: #d9d9d9;
    font-family: 'Sansation';
    font-size: 16px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    margin-left: 20px;
}


.title {
    display: flex;
    font-size: 26px;
    color: white;
    height: auto;
    gap: 10px;
    width: 100%;
    align-items: center;
}

.profile-data-infos-container > .title > img 
{
    margin-right: 5px;
    width: 100%;
}

`;