export class ChatItemComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="profileAndOnlineContainer">
                <div class="profileAndOnline">
                    <img src="/frontend/assets/profile-assets/profile-image.svg" width="70px">
                    <c-hexagon width="18px" height="18px" apply="true" Bcolor="aqua" >
                        <div style="width: 100%; height: 100%; background-color: aqua;" slot="content"></div>
                    </c-hexagon>
                </div>
            </div>
            <div class="userNameAndLastMessageContainer">
                <h2>TEST TEST</h2>
                <p>The different background images are ...</p>
            </div>
            <div class="numberOfMessageAndTimeContainer">
                <p>12:05 PM</p>
                <div class="numberOfMessage">655</div>
            </div>
        `;
    }
}

const cssContent = /*css*/`

    :host {
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 100px;
        gap: 15px;
        
    }
    .profileAndOnlineContainer {
        margin-left: 20px;
        width: 70px;
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
    }
    
    .profileAndOnline {
        position: relative;
        height: min-content;
    }

    .profileAndOnline c-hexagon {
        position: absolute;
        top: 1.5px;
        right: 10px;
    }




    .userNameAndLastMessageContainer {
        flex: 2.5;
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        color: white;
    }
    
    .userNameAndLastMessageContainer h2 {
        font-size: 32px;
        margin: 0;
        font-family: 'Sansation Bold';
        
    }
    
    .userNameAndLastMessageContainer p {
        font-size: 12px;
        margin: 0;
        font-family: 'Sansation';
        color: #d9d9d9;

    }

    .numberOfMessageAndTimeContainer {
        display: flex;
        flex-direction: column;
        gap: 18px;
        align-items: center;
        justify-content: center;
        flex: 0.7;
        margin-right: 20px;
        font-family: 'Sansation bold';
    }

    .numberOfMessageAndTimeContainer p {
        margin: 0;
        font-size: 10px;
        color: #C5C4C490;
    }

    .numberOfMessage {
        color: white;
        font-size: 16px;
        background-color: #00FFFF90;
        padding: 5px 17px;
        border-radius: 30px;
    }
    
`;