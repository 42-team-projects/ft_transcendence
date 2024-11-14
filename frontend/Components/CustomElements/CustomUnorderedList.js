import { CustomUnorderedListItem } from "/Components/CustomElements/CustomUnorderedListItem.js";

export class CustomUnorderedList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="field-container">
                <div class="label">
                    <div class="title">
                        <h2></h2>
                        <p></p>
                    </div>
                    <img loading="lazy" class="add-icon" src="/assets/icons/plus-icon.svg"></img>
                </div>
                <div class="box"></div>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".box").style.width = this.width;
        this.shadowRoot.querySelector(".box").style.height = this.height;
        this.shadowRoot.querySelector("h2").textContent = this.label;
        this.shadowRoot.querySelector("p").textContent = this.description;
        this.shadowRoot.querySelector(".box").innerHTML = this.innerHTML;

        const addIcon = this.shadowRoot.querySelector(".add-icon");
        addIcon.addEventListener("click", () => {
            if (this.shadowRoot.querySelectorAll("custom-unordered-list-item").length < 4)
            {
                const newItem = document.createElement("custom-unordered-list-item");
                this.shadowRoot.querySelector(".box").appendChild(newItem);
            }
        });

    }

    disconnectedCallback() {
    }

    static observedAttributes = ["width", "height", "label", "description"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "width")
            this.shadowRoot.querySelector(".box").style.width = newValue;
        if (attrName == "height")
            this.shadowRoot.querySelector(".box").style.height = newValue;
        if (attrName == "label")
            this.shadowRoot.querySelector("h2").textContent = newValue;
        if (attrName == "description")
            this.shadowRoot.querySelector("p").textContent = newValue;


    }
    
    set label(value) { this.setAttribute("label", value)};
    get label() { return this.getAttribute("label")};

    set description(value) { this.setAttribute("description", value)};
    get description() { return this.getAttribute("description")};

    set width(value) { this.setAttribute("width", value)};
    get width() { return this.getAttribute("width")};
    
    set height(value) { this.setAttribute("height", value)};
    get height() { return this.getAttribute("height")};

    get list() {

        const listItems = [];
        const items = this.shadowRoot.querySelectorAll("custom-unordered-list-item");
        Array.from(items).forEach(elem => {
            if (elem.isActive) {
                const item = {id: elem.id, title: elem.value, url: elem.link};
                if (elem.value && elem.link)
                    listItems.push(item);
            }
        });
        return listItems;
    }

    set list(data) {
        Array.from(data).forEach(elem => {
            if (this.shadowRoot.querySelectorAll("custom-unordered-list-item").length < 4) {
                const newItem = document.createElement("custom-unordered-list-item");
                newItem.id = elem.id;
                newItem.value = elem.title;
                newItem.link = elem.url;
                this.shadowRoot.querySelector(".box").appendChild(newItem);
            }
            else
                return;
        });
    }
}

const cssContent = /*css*/`
    * {
        margin: 0;
        padding: 0;
    }

    :host {
        width: 100%;
        flex-wrap: wrap;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .field-container {
        width: 90%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 20px;
    }
    .label {
        flex: 1;
        display: flex;
        min-width: 250px;
        width: 95%;
        align-items: center;
        justify-content: space-between;
    }

    .box {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        min-width: 250px;
        gap: 20px;
    }

    img {
        width: 20px;
        height: 20px;
        opacity: 0.7;
        cursor: pointer;
    }

    p {
        margin: 0;
        padding: 0;
        font-size: 10px;
        color: #d9d9d9;
        margin: 5px 0;
        opacity: 0.5;
    }
`;

customElements.define("custom-unordered-list", CustomUnorderedList);