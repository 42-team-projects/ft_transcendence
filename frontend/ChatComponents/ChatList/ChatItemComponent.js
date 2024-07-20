export class ChatItemComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    set opacity(val) { this.setAttribute("opacity", val);}
    get opacity() { return this.getAttribute("opacity");}
    set backgroundColor(val) { this.setAttribute("background-color", val);}
    get backgroundColor() { return this.getAttribute("background-color");}

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
            :host {
                font-family: 'Sansation bold';
                padding: 15px 0;
                width: 100%;
                display: flex;
                justify-content: space-between;
                height: 100px;
                background-color: ${this.backgroundColor || "transparent"};
            }
            
            .container {
                width: 100%;
                display: flex;
                justify-content: space-between;
                height: 100px;
                opacity: ${this.opacity || 1}
            }
        
            .profileAndOnlineContainer {
                display: flex;
                flex: 1;
            }
            
            .profileAndOnline {
                position: relative;
                height: min-content;
                padding-left: 20px;
            }
        
            .profileAndOnline .online {
                position: absolute;
                top: 7px;
                right: 15px;
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
            </style>
            <div class="container">
                <div class="profileAndOnlineContainer">
                    <div class="profileAndOnline">
                        <c-hexagon class="profile" width="90px" height="87px" apply="true" Bcolor="aqua">
                            <img slot="content" draggable="false" src="/frontend/images/svg-header/profile.jpeg" width="100%">
                        </c-hexagon>
                        <c-hexagon class="online" width="20px" height="20px" apply="true" Bcolor="aqua" >
                            <div style="width: 100%; height: 100%; background-color: aqua;" slot="content"></div>
                        </c-hexagon>
                    </div>
                </div>
                <div class="userNameAndLastMessageContainer">
                    <h2>esalim</h2>
                    <p>The different background images are ...</p>
                </div>
                <div class="numberOfMessageAndTimeContainer">
                    <p>12:05 PM</p>
                    <div class="numberOfMessage">655</div>
                </div>
            </div>
        `;

    }
}