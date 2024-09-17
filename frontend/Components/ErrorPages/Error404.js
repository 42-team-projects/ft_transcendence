export class Error404 extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = /*html*/`
            <style> ${cssContent} </style>
            <div class="mainContainer">
                <h1>4 0 4</h1>
                <h2>Oops! some thing wrong!</h2>
                <p>hint: this user doesn't exists!</p>
            </div>
        `;
    }

    connecedCallback() {
        
    }

    disconnecedCallback() {

    }

    static observedAttributes = [];

    attributeChangedCallback(attrName, oldValue, newValue) {
    }


}

customElements.define("error-404", Error404);

const cssContent = /*css*/`

* {
    margin: 0;
    padding: 0;
}

:host {
    width: 100%;
    height: 100%;
    background: #01253e50;
    font-family: 'Sansation Bold';
}

.mainContainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

h1 {
    font-size: 80px;
}

p {
    color: #d9d9d9;
}

`;