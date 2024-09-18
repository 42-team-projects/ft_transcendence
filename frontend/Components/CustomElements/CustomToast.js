const cssContent = /*css*/`
    :host {
        height: 56px;
        color: white;
        border-radius: 100px;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .toastContainer {
        width: 100%;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #5cb85c;
        gap: 10px;
        border-radius: 100px;

    }


`;

export class CustomToast extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="toastContainer">
                <img class="toast-icon" src="/assets/icons/success-circle.svg" width="16px"></img>
                <slot></slot>
            </div>
        `;
    }
    connectedCallback() {
        const interval = setInterval(() => {
            this.remove();
            clearInterval(interval);
        }, 3000);
    }


    static observedAttributes = ["status"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "status") {
            if (newValue === "error") {
                this.shadowRoot.querySelector(".toast-icon").src = "/assets/icons/fail-icon.svg";
                this.shadowRoot.querySelector(".toastContainer").style.background = "#D11313";
            }
        }
    }

    set status(val) { this.setAttribute("status", val);}
    get status() { return this.getAttribute("status");}

}

customElements.define("custom-toast", CustomToast);


export function displayToast(status, message) {
    const toast = document.querySelector(".display-toast");
    toast.innerHTML = '';
    const test = document.createElement("custom-toast");
    test.status = status;
    test.innerHTML = `<p>${message}</p>`;
    toast.appendChild(test);
}