export class CoverComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    get src() { return this.getAttribute("src"); }
    set src(value) { this.setAttribute("src", src); }
    
    connectedCallback() {
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
                    background-image: url(${this.src});
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: top;
                    background-attachment: local;
                    opacity: 0.7;
                    z-index: 1;
                }
            </style>
            <div class="profile-cover"></div>
        `;
    }
}