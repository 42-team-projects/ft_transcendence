export class FriendsListComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <h1>FRIENDS</h1>
            <div class="friedns-list-container">
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
                <friend-item></friend-item>
            </div>
        
        `;
    }
}

const cssContent = /*css*/`

    :host {
        flex: 1.5;
        height: 100%;
        max-height: 1000px;
        color: white;
        background-color: #d9d9d920;
    }
    
    h1 {
        padding: 0px 20px;
    }

    .friedns-list-container {
        padding: 0px 20px;
        max-height: 920px;
        display: flex;
        gap: 10px;
        height: min-content;
        flex-direction: column;
        overflow-y: scroll;
    }
    

    .friedns-list-container::-webkit-scrollbar {
        opacity: 0.7;
        background-color: transparent;
        width: 1px;
    }
    
    .friedns-list-container::-webkit-scrollbar-track {
        opacity: 0.7;
        border-radius: 100px;
    }
    
    .friedns-list-container::-webkit-scrollbar-thumb {
        opacity: 0.7;
        background-color: aqua;
        border-radius: 100px;
    }
    
`;