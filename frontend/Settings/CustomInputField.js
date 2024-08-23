export class CustomInputField extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="field-container">
                <div class="label">
                    <h2></h2>
                    <p></p>
                </div>
                <div class="box">
                    <div class="inputContainer">
                        <input type="text" accept="image/png, image/jpeg" readonly/>
                    </div>
                    <img loading="lazy" class="edit-icon" src="../assets/icons/pencil-icon.svg"></img>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".box").style.width = this.width;
        this.shadowRoot.querySelector(".box").style.height = this.height;
        this.shadowRoot.querySelector("h2").textContent = this.label;
        this.shadowRoot.querySelector("p").textContent = this.description;
        if (this.type == "file")
        {
            this.shadowRoot.querySelector(".inputContainer").innerHTML = `
                <div class="uploadcontainer">
                    <img loading="lazy" src="../../assets/icons/upload-icon.svg"></img>
                    <h4>Upload Image</h4>
                </div>
                <input type="text" accept="image/png, image/jpeg" readonly/>
            `;
            const editIcon = this.shadowRoot.querySelector(".edit-icon")
            if (editIcon)
                editIcon.remove();
        }
        this.shadowRoot.querySelector("input").type = this.type;
        this.shadowRoot.querySelector("input").placeholder = this.placeholder;


        const input = this.shadowRoot.querySelector('input[type="file"]');
        if (input)
        {
            input.addEventListener( 'change', (e) => {
                var fileName = '';
                if( this.files && this.files.length > 1 )
                    fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
                else
                    fileName = e.target.value.split( '\'' ).pop();

                if( fileName )
                    this.shadowRoot.querySelector(".uploadcontainer").innerHTML = `<span>${fileName}</span>`;
            });
        }

        const editIcon = this.shadowRoot.querySelector(".edit-icon");
        editIcon.addEventListener("click", () => {
            const inputs = this.shadowRoot.querySelectorAll("input");
            inputs.forEach(elem => {
                elem.removeAttribute("readonly");
                elem.classList.add("active");
            });
        });
    }

    disconnectedCallback() {
        // Clean up if necessary
    }

    static observedAttributes = ["width", "height", "type", "label", "description", "placeholder"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "width")
            this.shadowRoot.querySelector(".box").style.width = newValue;
        if (attrName == "height")
            this.shadowRoot.querySelector(".box").style.height = newValue;
        if (attrName == "label")
            this.shadowRoot.querySelector("h2").textContent = newValue;
        if (attrName == "description")
            this.shadowRoot.querySelector("p").textContent = newValue;
        if (attrName == "type")
        {
            if (this.type == "file")
            {
                this.shadowRoot.querySelector(".inputContainer").innerHTML = `
                    <div class="uploadcontainer">
                        <img loading="lazy" src="../../assets/icons/upload-icon.svg"></img>
                        <h4>Upload Image</h4>
                    </div>
                    <input type="text" accept="image/png, image/jpeg" readonly/>
                `;
                const editIcon = this.shadowRoot.querySelector(".edit-icon")
                if (editIcon)
                    editIcon.remove();
            }
            this.shadowRoot.querySelector("input").type = newValue;

        }
        if (attrName == "placeholder")
            this.shadowRoot.querySelector("input").value = newValue;


    }


    set placeholder(value) { this.setAttribute("placeholder", value)};
    get placeholder() { return this.getAttribute("placeholder")};

    set type(value) { this.setAttribute("type", value)};
    get type() { return this.getAttribute("type")};
    
    set label(value) { this.setAttribute("label", value)};
    get label() { return this.getAttribute("label")};

    set description(value) { this.setAttribute("description", value)};
    get description() { return this.getAttribute("description")};

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
        justify-content: center;
    }

    .field-container {
        width: 90%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
    }
    .label {
        flex: 1;
        min-width: 250px;
    }

    .box {
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 250px;
        height: 48px;
        gap: 10px;
    }

    .inputContainer {
        display: flex;
        max-width: 600px;
        width: 100%;
        height: 100%;
        border: 1px solid #d9d9d950;
        border-radius: 6px;
        position: relative;
        margin-left: 20px;
    }

    input {
        display: flex;
        align-items: center;
        height: 100%;
        background: green;
        width: 100%;
        background: #d9d9d950;
        border: none;
        outline: none;
        color: white;
        border-radius: 5px;
        padding: 0px 10px;
        font-size: 16px;
    }
 
    input[type="file"] {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 100%;
        background: green;
        width: 100%;
        background: #d9d9d950;
        border: none;
        outline: none;
        color: white;
        border-radius: 5px;
        padding: 0px 10px;
        font-size: 16px;
        z-index: 1;
        opacity: 0;
        overflow: hidden;
    }

    img {
        width: 20px;
        height: 20px;
        opacity: 0.7;
    }

    p {
        margin: 0;
        padding: 0;
        font-size: 10px;
        color: #d9d9d9;
        margin: 5px 0;
        opacity: 0.5;
    }
    
    .uploadcontainer {
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        gap: 10px;
        z-index: -1;
    }


    .active {
        background: transparent;
        border: 1px solid aqua;
    }
 
`;

customElements.define("custom-input-field", CustomInputField);