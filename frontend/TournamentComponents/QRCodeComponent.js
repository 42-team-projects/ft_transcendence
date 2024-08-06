export class QRCodeComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <h1></h1>
            <div class="qrcode">
                <img src="../assets/tournament-assets/qrcode.svg">
            </div>
            <div class="shareButtons" hidden>
                <button class="download">DOWNLOAD</button>
            </div>
        `;
    }
    connectedCallback() {
        if (this.title)
            this.shadowRoot.querySelector("h1").textContent = this.title;
        // if (this.value)
        //     this.generate();

    }

    disconnectedCallback() {

    }

    static observedAttributes = ["title", "value", "opacity", "hidden"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "title")
            this.shadowRoot.querySelector("h1").textContent = newValue;
        else if (attrName == "opacity")
        {
            this.shadowRoot.querySelector(".qrcode img").style.opacity = newValue;
            this.shadowRoot.querySelector(".shareButtons").removeAttribute("hidden");

        }
        // else if (attrName == "value")
        //     this.generate();
    }

    get title() { return this.getAttribute("title");}
    set title(val) { this.setAttribute("title", val);}
    
    get value() { return this.getAttribute("value");}
    set value(val) { this.setAttribute("val", val);}
    
    get opacity() { return this.getAttribute("opacity");}
    set opacity(val) { this.setAttribute("opacity", val);}
    
}

const cssContent = /*css*/`
:host {
    flex: 1.5;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.qrcode {
    width: 500px;
    height: 500px;
    border: 3px solid aqua;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.qrcode img {
    width: 440px;
    height: 440px;
    opacity: 0.1;
}

.download {
    width: 200px;
    height: 48px;
    background-color: #0C9BA3;
    color: white;
    border: none;
    border-radius: 5px;
    font-family: 'Sansation bold';
    font-size: 20px;
    margin: 40px;
}
`;