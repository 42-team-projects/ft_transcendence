const svgFile = `
<svg width="1756" height="802" viewBox="0 0 1756 802" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M120.606 1H738.595L700.5 34.8624H146.003L61.3471 119.518H2.08789L120.606 1Z" fill="#cccccc" fill-opacity="0.7"/>
<path d="M1066.42 34.8624L1028.33 1H1642.08L1752.14 111.053H1701.34L1625.15 34.8624H1066.42Z" fill="#cccccc" fill-opacity="0.7"/>
<path d="M120.606 1H738.595L700.5 34.8624H146.003L61.3471 119.518H2.08789L120.606 1Z" stroke-opacity="0.7"/>
<path d="M1066.42 34.8624L1028.33 1H1642.08L1752.14 111.053H1701.34L1625.15 34.8624H1066.42Z" stroke-opacity="0.7"/>
<path d="M1066.42 34.8624L1028.33 1H1642.08L1752.14 111.053H1701.34L1625.15 34.8624H1066.42Z" fill="#cccccc" fill-opacity="0.7" stroke-opacity="0.7"/>
<path d="M1111.17 68.7593V56.0609H1039.22L1001.12 13.7329H755.618L713.29 56.0609H654.03L641.332 60.2937L654.03 68.7593H755.618L768.316 60.2937H992.655L1009.59 68.7593H1111.17Z" fill="#cccccc" fill-opacity="0.3"/>
<path d="M57.0475 144.95H6.25391V318.495L31.6507 301.564V242.305L57.0475 212.675V144.95Z" fill="#cccccc" fill-opacity="0.3"/>
<path d="M61.2592 665.599H2L2 487.822L31.6296 505.166L31.6296 565.87L61.2592 596.223L61.2592 665.599Z" fill="#cccccc" fill-opacity="0.3"/>
<path d="M31.6507 487.8L6.25391 458.17V348.118L31.6507 322.721V487.8Z" fill="#cccccc" fill-opacity="0.7" stroke-opacity="0.7"/>
<path d="M1699.4 140.648H1750.19V314.193L1724.8 297.262V238.002L1699.4 208.373V140.648Z" fill="#cccccc" fill-opacity="0.3"/>
<path d="M1695.18 661.309H1754.44V483.532L1724.81 500.876V561.58L1695.18 591.933V661.309Z" fill="#cccccc" fill-opacity="0.3"/>
<path d="M1724.8 483.483L1750.19 453.854V343.801L1724.8 318.404V483.483Z" fill="#cccccc" fill-opacity="0.7" stroke-opacity="0.7"/>
<path d="M1635.9 801L1017.91 801L1056 767.138L1610.5 767.138L1695.16 682.482H1754.42L1635.9 801Z" fill="#cccccc" fill-opacity="0.7"/>
<path d="M696.216 767.138L734.311 801L120.555 801L10.5021 690.947H61.2957L137.486 767.138L696.216 767.138Z" fill="#cccccc" fill-opacity="0.7"/>
<path d="M1635.9 801L1017.91 801L1056 767.138L1610.5 767.138L1695.16 682.482H1754.42L1635.9 801Z" stroke-opacity="0.7"/>
<path d="M696.216 767.138L734.311 801L120.555 801L10.5021 690.947H61.2957L137.486 767.138L696.216 767.138Z" stroke-opacity="0.7"/>
<path d="M1635.9 801L1017.91 801L1056 767.138L1610.5 767.138L1695.16 682.482H1754.42L1635.9 801Z" fill="#cccccc" fill-opacity="0.7" stroke-opacity="0.7"/>
<path d="M696.215 767.138L734.311 801L120.554 801L10.5016 690.947H61.2952L137.486 767.138L696.215 767.138Z" fill="#cccccc" fill-opacity="0.7" stroke-opacity="0.7"/>
<path d="M641.157 733.245V745.944H713.115L751.21 788.272H996.712L1039.04 745.944H1098.3L1111 741.711L1098.3 733.245H996.712L984.014 741.711H759.675L742.744 733.245H641.157Z" fill="#cccccc" fill-opacity="0.3"/>
<rect x="126" y="76" width="1513" height="644" rx="21" fill="#cccccc" fill-opacity="0.3"/>
<path d="M905 76L904 720" stroke="white" stroke-opacity="0.5"/>
<circle cx="905" cy="398" r="64.5" stroke="white" stroke-opacity="0.5"/>
</svg>
`;

export class CustomSliders extends HTMLElement {
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
                    <div class="left-arrow"></div>
                    <div class="slides">
                        ${svgFile}
                    </div>
                    <div class="right-arrow"></div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".box").style.width = this.width;
        this.shadowRoot.querySelector(".box").style.height = this.height;
        this.shadowRoot.querySelector("h2").textContent = this.label;
        this.shadowRoot.querySelector("p").textContent = this.description;
        const rects = this.shadowRoot.querySelectorAll("svg rect");
        rects.forEach(elem => {
            elem.style.fill = this.gameColor;
            // elem.style.stroke = this.gameColor;
        });
        const paths = this.shadowRoot.querySelectorAll("svg path");
        paths.forEach(elem => {
            elem.style.fill = this.gameColor;
            // elem.style.stroke = this.gameColor;
        });
    }

    disconnectedCallback() {
        // Clean up if necessary
    }

    static observedAttributes = ["width", "height", "label", "description", "game-color"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "width")
            this.shadowRoot.querySelector(".box").style.width = newValue;
        if (attrName == "height")
            this.shadowRoot.querySelector(".box").style.height = newValue;
        if (attrName == "label")
            this.shadowRoot.querySelector("h2").textContent = newValue;
        if (attrName == "description")
            this.shadowRoot.querySelector("p").textContent = newValue;
        if (attrName == "game-color")
        {
            const rects = this.shadowRoot.querySelectorAll("svg rect");
            rects.forEach(elem => {
                elem.style.fill = newValue;
                // elem.style.stroke = newValue;
            });
            const paths = this.shadowRoot.querySelectorAll("svg path");
            paths.forEach(elem => {
                elem.style.fill = newValue;
                // elem.style.stroke = newValue;
            });
        }

    }
    
    set label(value) { this.setAttribute("label", value)};
    get label() { return this.getAttribute("label")};

    set description(value) { this.setAttribute("description", value)};
    get description() { return this.getAttribute("description")};

    set width(value) { this.setAttribute("width", value)};
    get width() { return this.getAttribute("width")};
    
    set height(value) { this.setAttribute("height", value)};
    get height() { return this.getAttribute("height")};

    set gameColor(value) { this.setAttribute("game-color", value)};
    get gameColor() { return this.getAttribute("game-color")};


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
        gap: 10px;
    }

    .label {
        flex: 1;
        min-width: 250px;
    }

    .box {
        display: flex;
        align-items: center;
        justify-content: space-around;
        min-width: 250px;
    }

    .slides {
        width: 50%;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    p {
        margin: 0;
        padding: 0;
        font-size: 10px;
        color: #d9d9d9;
        margin: 5px 0;
        opacity: 0.5;
    }
 
    .slides svg {
        width: 100%;
        min-width: 200px;
    }


    .left-arrow, .right-arrow {
        width: 0;
        height: 0;
        border-top: 20px solid transparent;
        border-right: 28px solid aqua;
        border-bottom: 20px solid transparent;
    }
    .right-arrow {
        transform: rotate(180deg);
    }
`;

customElements.define("custom-sliders", CustomSliders);