
export class ChatFooterComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="container">
                <input type="text" placeholder="write your message ..." />
                <img loading="lazy" src="./assets/profile-assets/send-icon.svg"   width="32">
            </div>
            <div class="corner" ></div>
            `;
    }
}

const cssContent = /*css*/ `
    :host {
        display: flex;
        flex: 0.7;
        justify-content: space-between;
        font-family: 'Sansation bold';
        width: 100%;
        margin: 15px 0px;
    }
    
    .container {
        display: flex;
        background-color: #d9d9d920;
        align-items: center;
        color: white;
        font-size: 14px;
        width: 100%;
        margin-left: 40px;
        border-radius: 10px 0px 10px 10px;
    }
    
    .corner {
        border-bottom: 15px solid transparent;
        border-right: 15px solid transparent;
        border-top: 15px solid #d9d9d920;
        margin-right: 40px;
    }
    
    input {
        width: 100%;
        border-radius: 10px;
        border: none;
        background-color: transparent;
        flex: 8;
        font-family: 'Sansation';
        font-size: 16px;
        color: #ffffff;
        outline: none;
        padding: 10px 20px;
    }
    
    img {
        width: 24px;
        padding: 0 20px;
    }
`;