import { svgFile, svgFile2 } from "/Slides.js";


export function gameBard(bard, gameColor) {
    let rects = bard.querySelectorAll("rect[fill]");
    rects.forEach(elem => {
        elem.style.fill = gameColor;
    });
    rects = bard.querySelectorAll("rect[stroke]");
    rects.forEach(elem => {
        elem.style.stroke = gameColor;
    });
    let paths = bard.querySelectorAll("path[fill]");
    paths.forEach(elem => {
        elem.style.fill = gameColor;
    });
    paths = bard.querySelectorAll("path[stroke]");
    paths.forEach(elem => {
        elem.style.stroke = gameColor;
    });
}
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
                    <div id="slider">
                        <div id="overflow">
                            <div class="inner">
                                <div class="slide">
                                    ${svgFile}
                                </div>
                                
                                <div class="slide">
                                    ${svgFile2}
                                </div>
                              
                                <div class="slide">
                                    ${svgFile}
                                </div>
                                                                
                                <div class="slide">
                                    ${svgFile2}
                                </div>
                              
                            </div>
                        </div>
                    </div>
                    <div class="right-arrow"></div>
                </div>
            </div>
        `;
    }

    currentIndex;

    connectedCallback() {
        this.shadowRoot.querySelector(".box").style.width = this.width;
        this.shadowRoot.querySelector(".box").style.height = this.height;
        this.shadowRoot.querySelector("h2").textContent = this.label;
        this.shadowRoot.querySelector("p").textContent = this.description;
        gameBard(this.shadowRoot.querySelector("svg"), this.gameColor);



        const slides = this.shadowRoot.querySelector('.inner');
        const totalSlides = this.shadowRoot.querySelectorAll('.slide').length;

        this.shadowRoot.querySelector('.right-arrow').addEventListener('click', () => {
            this.currentIndex = (this.currentIndex + 1) % totalSlides;
            slides.style.marginLeft = `-${this.currentIndex * 100}%`;
        });

        this.shadowRoot.querySelector('.left-arrow').addEventListener('click', () => {
            this.currentIndex = (this.currentIndex - 1 + totalSlides) % totalSlides;
            slides.style.marginLeft = `-${this.currentIndex * 100}%`;
        });

        this.getRightBoard(this.board);

    }

    getRightBoard(index) {
        this.currentIndex = index;
        const rightArrow = this.shadowRoot.querySelector('.right-arrow');
        for (let idx = 0; idx < index; idx++)
            rightArrow.click();
    }

    disconnectedCallback() {
        // Clean up if necessary
    }

    static observedAttributes = ["width", "height", "label", "description", "game-color", "board"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "width")
            this.shadowRoot.querySelector(".box").style.width = newValue;
        if (attrName == "height")
            this.shadowRoot.querySelector(".box").style.height = newValue;
        if (attrName == "label")
            this.shadowRoot.querySelector("h2").textContent = newValue;
        if (attrName == "board")
            this.getRightBoard(newValue);
        if (attrName == "description")
            this.shadowRoot.querySelector("p").textContent = newValue;
        if (attrName == "game-color")
        {
            let rects = this.shadowRoot.querySelectorAll("svg rect[fill]");
            rects.forEach(elem => {
                elem.style.fill = newValue;
            });
            rects = this.shadowRoot.querySelectorAll("svg rect[stroke]");
            rects.forEach(elem => {
                elem.style.stroke = newValue;
            });
            let paths = this.shadowRoot.querySelectorAll("svg path[fill]");
            paths.forEach(elem => {
                elem.style.fill = newValue;
            });
            paths = this.shadowRoot.querySelectorAll("svg path[stroke]");
            paths.forEach(elem => {
                elem.style.stroke = newValue;
            });
        }

    }
    
    set board(value) { this.setAttribute("board", value)};
    get board() { return this.currentIndex;};
    
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
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
    }

    p {
        margin: 0;
        padding: 0;
        font-size: 10px;
        color: #d9d9d9;
        margin: 5px 0;
        opacity: 0.5;
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



    #slider {
        width: 60%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

 
    .slide svg {
        width: 100%;
        height: min-content;
    }


    #overflow {
        width: 100%;
        overflow: hidden;
    }

    .inner {
        transition: margin-left 800ms cubic-bezier(0.770, 0.000, 0.175, 1.000);
        width: 400%;
        display: flex;
    }

    .slide {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        padding: 0 20px;
    }


`;

customElements.define("custom-sliders", CustomSliders);