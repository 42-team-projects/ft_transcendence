
export class ChatHeaderComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="profile-infos">
                <c-hexagon class="profile" width="120px" height="117px" apply="true" Bcolor="aqua">
                    <img slot="content" draggable="false" src="/frontend/images/svg-header/profile.jpeg">
                </c-hexagon>
                <div class="infos">
                    <h1>SALIM ELMEHDI</h1>
                    <div class="activation">
                        <c-hexagon class="online" width="16px" height="16px" apply="true" Bcolor="aqua" >
                            <div style="width: 100%; height: 100%; background-color: aqua;" slot="content"></div>
                        </c-hexagon>
                        online
                    </div>
                </div>
            </div>
            <img src="/frontend/images/Game.svg">
            <img src="/frontend/assets/profile-assets/account-icon.svg">
            <img src="/frontend/assets/profile-assets/block-icon.svg">
        `;
    }
}

const cssContent = /*css*/ `
    :host {
        font-family: 'Sansation bold';
        display: flex;
        flex: 1.8;
        justify-content: space-between;
        align-items: center;
        font-family: 'Sansation bold'
    }

    .profile-infos {
        flex: 8;
        padding-left: 30px;
        display: flex;
        align-items: center;
        color: white;
        gap: 10px;
    }
    
    .profile-infos h1 {
        font-size: 38px;
        margin: 0;
    }
    
    .profile-infos img {
        width: 100%;
        height: 100%;
    }
    
    img {
        flex: 1;
        width: 40px;
        height: 40px;
    }
    
    .infos {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .activation {
        align-items: center;
        display: flex;
        gap: 10px;
    }
`;