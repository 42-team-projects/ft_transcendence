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
                    <div class="inputContainer active">
                        <input type="text" accept="image/png, image/jpeg"/>
                    </div>
                    <img loading="lazy" class="edit-icon" src="/assets/icons/pencil-icon.svg"></img>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".box").style.width = this.width;
        this.shadowRoot.querySelector(".box").style.height = this.height;
        this.shadowRoot.querySelector("h2").textContent = this.label;
        this.shadowRoot.querySelector("p").textContent = this.description;
        const inputContainer = this.shadowRoot.querySelector(".inputContainer");
        if (this.type == "file")
        {
            inputContainer.innerHTML = `
                <div class="uploadcontainer">
                    <img loading="lazy" src="/assets/icons/upload-icon.svg"></img>
                    <h4>Upload Image</h4>
                </div>
                <input type="text" accept="image/png, image/jpeg" readonly/>
            `;
            const editIcon = this.shadowRoot.querySelector(".edit-icon")
            if (editIcon)
                editIcon.remove();
        }

        this.shadowRoot.querySelector("input").type = this.type;
        this.shadowRoot.querySelector("input").placeholder = this.placeholder || "";


        const input = this.shadowRoot.querySelector('input[type="file"]');
        if (input)
        {
            input.addEventListener( 'change', (e) => {
                var fileName = '';
                console.log("files : ", input.files, " files length : ", input.files.length);;
                if (input.files && input.files.length)
                    fileName = input.files[0].name;
                if (fileName)
                    this.shadowRoot.querySelector(".uploadcontainer").innerHTML = `<span style="text-align: center;">${fileName}</span>`;
                else
                    this.shadowRoot.querySelector(".uploadcontainer").innerHTML = `<img loading="lazy" src="/assets/icons/upload-icon.svg"></img><h4>Upload Image</h4>`;

            });
        }

        const editIcon = this.shadowRoot.querySelector(".edit-icon");
        if (!editIcon)
            return ;
        const inputField = inputContainer.querySelector("input");
        let oldValue = inputField.value;
        editIcon.addEventListener("click", () => {
            if (editIcon.classList.contains("lock"))
                return ;
            else if (!editIcon.classList.contains("close")) {
                inputField.removeAttribute("readonly");
                inputContainer.classList.add("active");
                editIcon.src = "/assets/icons/close-icon.svg";
                editIcon.classList.add("close");
            }
            else {
                inputField.value = oldValue;
                inputField.setAttribute("readonly", true);
                inputContainer.classList.remove("active");
                editIcon.src = "/assets/icons/pencil-icon.svg";
                editIcon.classList.remove("close");
            }
        });
        this.shadowRoot.querySelector("img").hidden = true;
        if (this.readonly)
        {
            inputContainer.classList.toggle("active");
            inputField.setAttribute("readonly", true);
            this.shadowRoot.querySelector("img").hidden = false;
        }
        
    }

    disconnectedCallback() {
        // Clean up if necessary
    }

    static observedAttributes = ["width", "height", "type", "label", "description", "placeholder", "editable"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "editable") {
            const editIcon = this.shadowRoot.querySelector(".edit-icon")
            if (editIcon) {
                editIcon.src = "/assets/icons/lock-icon.svg";
                editIcon.classList.add("lock");
            }
        }
        else if (attrName == "width")
            this.shadowRoot.querySelector(".box").style.width = newValue;
        else if (attrName == "height")
            this.shadowRoot.querySelector(".box").style.height = newValue;
        else if (attrName == "label")
            this.shadowRoot.querySelector("h2").textContent = newValue;
        else if (attrName == "description")
            this.shadowRoot.querySelector("p").textContent = newValue;
        else if (attrName == "type")
        {
            if (this.type == "file")
            {
                this.shadowRoot.querySelector(".inputContainer").innerHTML = `
                    <div class="uploadcontainer">
                        <img loading="lazy" src="/assets/icons/upload-icon.svg"></img>
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
        else if (attrName == "placeholder")
            this.shadowRoot.querySelector("input").value = newValue;
        else if (attrName == "readonly") {
            const inputContainer = this.shadowRoot.querySelector(".inputContainer");
            inputContainer.classList.toggle("active");
            const input = inputContainer.querySelector("input");
            input.style.background = "transparent";
            input.setAttribute("readonly", true);
            this.shadowRoot.querySelector("img").hidden = false;
        }

    }


    set placeholder(value) { this.setAttribute("placeholder", value)}
    get placeholder() { return this.getAttribute("placeholder")}

    set editable(value) { this.setAttribute("editable", value)}
    get editable() { return this.getAttribute("editable")}

    set readonly(value) { this.setAttribute("readonly", value)}
    get readonly() { return this.getAttribute("readonly")}
    
    set type(value) { this.setAttribute("type", value)}
    get type() { return this.getAttribute("type")}
    
    set label(value) { this.setAttribute("label", value)}
    get label() { return this.getAttribute("label")}

    set description(value) { this.setAttribute("description", value)}
    get description() { return this.getAttribute("description")}

    set width(value) { this.setAttribute("width", value)}
    get width() { return this.getAttribute("width")}
    
    set height(value) { this.setAttribute("height", value)}
    get height() { return this.getAttribute("height")}
    
    
    get value() {
        const value = this.shadowRoot.querySelector(".inputContainer input").value;
        const field = this.shadowRoot.querySelector(".active");
        if (field)
            field.style.border = "1px solid aqua";
        if (value)
            return value;
        if (field)
            field.style.border = "1px solid red";
        return null;
    }

    set value(val) {
        const input = this.shadowRoot.querySelector(".inputContainer input");
        input.value = val;
    }
    
    get file() {
        const files = this.shadowRoot.querySelector(".inputContainer input[type='file']").files;
        if (files.length)
            return files;
        return null;
    }
    
    set file(val) {
        this.shadowRoot.querySelector(".uploadcontainer").innerHTML = `<span style="text-align: center;">${val}</span>`;
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
        background: #d9d9d950;
        border: 1px solid #d9d9d950;
        border-radius: 6px;
        position: relative;
        margin-left: 20px;
    }

    input {
        display: flex;
        align-items: center;
        height: 100%;
        background: transparent;
        width: 100%;
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