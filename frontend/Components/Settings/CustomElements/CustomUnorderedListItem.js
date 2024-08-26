export class CustomUnorderedListItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="title">
                <div class="inputContainer" style="width:150px;">
                    <input type="text" value="twitter" readonly/>
                </div>
            </div>
            <div class="linksUrl">
                <div class="inputContainer">
                    <input class="link" type="text" readonly/>
                </div>
                <img loading="lazy" class="edit-icon" src="../assets/icons/pencil-icon.svg"></img>
                <img loading="lazy" class="remove-icon" src="../assets/icons/close-x-icon.svg"></img>
            </div>
        `;
    }

    connectedCallback() {
        this.style.width = this.width;
        this.style.height = this.height;
        this.shadowRoot.querySelector("input").type = this.type;
        this.shadowRoot.querySelector("input").value = this.value;
        this.shadowRoot.querySelector(".link").value = this.link;
    
        const editIcon = this.shadowRoot.querySelector(".edit-icon");
        editIcon.addEventListener("click", () => {
            const inputs = this.shadowRoot.querySelectorAll("input");
            inputs.forEach(elem => {
                elem.removeAttribute("readonly");
                elem.classList.add("active");
            });
        });

        const removeIcon = this.shadowRoot.querySelector(".remove-icon");
        removeIcon.addEventListener("click", () => {
            this.remove();
        });

        
    }

    disconnectedCallback() {
        // Clean up if necessary
    }

    static observedAttributes = ["width", "height", "type", "value", "link"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "width")
            this.style.width = newValue;
        else if (attrName == "height")
            this.style.height = newValue;
        else if (attrName == "type")
            this.shadowRoot.querySelector("input").type = newValue;
        else if (attrName == "value")
            this.shadowRoot.querySelector("input").value = newValue;
        else if (attrName == "link")
            this.shadowRoot.querySelector(".link").value = newValue;
    }

    set value(val) { this.setAttribute("value", val)};
    get value() { return this.getAttribute("value")};
    
    set link(val) { this.setAttribute("link", val)};
    get link() { return this.getAttribute("link")};

    set type(value) { this.setAttribute("type", value)};
    get type() { return this.getAttribute("type")};

    set width(value) { this.setAttribute("width", value)};
    get width() { return this.getAttribute("width")};
    
    set height(value) { this.setAttribute("height", value)};
    get height() { return this.getAttribute("height")};
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
        min-width: 250px;
        gap: 10px;
    }

    .linksUrl {
        flex: 1;
        display: flex;
        height: 100%;
        align-items: center;
        gap: 10px;
    }

    .inputContainer {
        display: flex;
        max-width: 600px;
        min-width: 200px;
        width: 100%;
        height: 100%;
        position: relative;
        margin-left: 20px;
    }

    input {
        display: flex;
        align-items: center;
        background: green;
        width: 100%;
        max-width: 600px;
        background: #d9d9d950;
        border: none;
        outline: none;
        color: white;
        height: 42px;
        border-radius: 5px;
        padding: 0px 10px;
        font-size: 16px;
    }

    .active {
        background: transparent;
        border: 1px solid aqua;
    }
 
    img {
        width: 20px;
        height: 20px;
        opacity: 0.7;
    }


    .title {
        flex: 1;
        display: flex;
        height: 100%;
        align-items: center;
        gap: 10px;
    }
`;

customElements.define("custom-unordered-list-item", CustomUnorderedListItem);
