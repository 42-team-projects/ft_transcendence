
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
                <div class="container-two">
                    <textarea row="1" style="border:0" placeholder="Write a message ..."></textarea>
                    <img src="/frontend/assets/profile-assets/send-icon.svg" width="32">
                </div>
            </div>
        `;
    }
}

const cssContent = /*css*/ `
    :host {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        font-family: 'Sansation bold';
        height: 100%;
        width: 100%;
    }

    .container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .container-two {
        border-radius: 10px;
        margin: 10px 40px;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        border: 1px solid white;
    }
    
    textarea {
        width: 100%;
        height: 100%;
        max-height: 400px;
        max-width: 1200px;
        border-radius: 10px;
        border: none;
        background-color: transparent;
        flex: 8;
        font-family: 'Sansation';
        font-size: 16px;
        color: #ffffff;
        outline: none;
        margin: 5px 20px;
    }
    
    img {
        width: 24px;
        height: 24px;
        margin-right: 20px; 
    }
`;