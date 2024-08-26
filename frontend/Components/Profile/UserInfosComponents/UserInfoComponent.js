export class UserInfoComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>${cssContent}</style>
        <div class="content-label">
            <p>${this.label.toLocaleUpperCase()}</p>
            <p class="content-value">${this.value}</p>
        </div>
        `;
    }

    get label() { return this.getAttribute("label");}
    get value() { return this.getAttribute("value");}
    set label(val) { this.setAttribute("label", val);}
    set value(val) { this.setAttribute("value", val);}

}

customElements.define("user-info-component", UserInfoComponent);

const cssContent = /*css*/`

p {
    margin: 0;
    padding: 0;
}

.content-label {
    display: flex;
    flex-direction: column;
    width: auto;
}

.content-value {
    font-family: 'Sansation bold';
    font-style: italic;
    font-size: 22px;
    width: auto;
    color: white;
    margin-right: 10px;
}

`;