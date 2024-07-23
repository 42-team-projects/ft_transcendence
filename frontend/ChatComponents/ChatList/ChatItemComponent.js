export class ChatItemComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    set id(val) { this.setAttribute("id", val);}
    get id() { return this.getAttribute("id");}

    set opacity(val) { this.setAttribute("opacity", val);}
    get opacity() { return this.getAttribute("opacity");}
    set backgroundColor(val) { this.setAttribute("background-color", val);}
    get backgroundColor() { return this.getAttribute("background-color");}
    
    set userName(val) { this.setAttribute("user-name", val);}
    get userName() { return this.getAttribute("user-name");}
    
    set lastMessage(val) { this.setAttribute("last-message", val);}
    get lastMessage() { return this.getAttribute("last-message");}
    
    set time(val) { this.setAttribute("time", val);}
    get time() { return this.getAttribute("time");}
    
    set numberOfMessage(val) { this.setAttribute("number-of-message", val);}
    get numberOfMessage() { return this.getAttribute("number-of-message");}



    render() {
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
                        <c-hexagon class="profile" width="90px" height="87px" apply="true" bcolor="aqua">
                            <img slot="content" draggable="false" src="/frontend/images/svg-header/profile.jpeg" width="100%">
                        </c-hexagon>
                        <c-hexagon class="online" width="20px" height="20px" apply="true" bcolor="aqua" >
                            <div style="width: 100%; height: 100%; background-color: aqua;" slot="content"></div>
                        </c-hexagon>
                    </div>
                </div>
                <div class="userNameAndLastMessageContainer">
                    <h2>${this.userName}</h2>
                    <p>${this.lastMessage}</p>
                </div>
                <div class="numberOfMessageAndTimeContainer">
                    <p>${this.time}</p>
                    <div class="numberOfMessage">${this.numberOfMessage}</div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.render();

    }

    static get observedAttributes() {
        return ["opacity", "background-color", "user-name", "last-message", "time", "number-of-message"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }
}