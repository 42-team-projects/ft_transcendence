export class CoverComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                :host * {margin: 0; padding: 0;}
                .profile-cover
                {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    align-content: center;
                    width: 100%;
                    height: 35%;
                    min-height: 300px;
                    max-height: 600px;
                    color: white;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-attachment: local;
                    opacity: 0.8;
                    z-index: 1;
                }
            </style>
            <div class="profile-cover"></div>
        `;
    }

    get src() { return this.getAttribute("src"); }
    set src(value) { this.setAttribute("src", value); }
    
    static observedAttributes = ["src"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "src")
            this.shadowRoot.querySelector(".profile-cover").style.background = "url(" + newValue + ") center top / cover no-repeat";
    }
    
    connectedCallback() {
        this.shadowRoot.querySelector(".profile-cover").style.background = "url(" + this.src + ") center top / cover no-repeat";
    }
}

customElements.define("cover-component", CoverComponent);
