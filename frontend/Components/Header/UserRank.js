
export class UserRank extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = /*html*/`
            <style>
                :host {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    clip-path: polygon(10% 0%, 50% 0% ,90% 0%, 90% 70%, 50% 90%,10% 70%);
                }
                .child{
                    display: flex;
                    justify-content : center;
                    align-items: center;
                    width: 95%;
                    height: 95%;
                    background : linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent 60%);
                    clip-path: polygon(10% 0%, 50% 0% ,90% 0%, 90% 70%, 50% 90%,10% 70%);
                }
                slot {
                    color : white;
                }
            </style>
            <div class="child">
                <slot></slot>
            </div>
        `;
    }

    set width(value) { this.setAttribute("width", value);}
    set height(value) { this.setAttribute("height", value);}
    set bcolor(value) { this.setAttribute("bcolor", value);}
    get width() { return this.getAttribute("width");}
    get height() { return this.getAttribute("height");}
    get bcolor() { return this.getAttribute("bcolor");}



    connectedCallback() {
        this.style.width = this.width || '80px';
        this.style.height = this.height  || '110px';
        this.style.background = this.bcolor || '#00FFFC';
       
        this.classList.toggle('drop-100', true);
        this.classList.toggle('down-60', true);
    }


    static observedAttributes = ["bcolor"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "bcolor") {
            this.style.background = newValue;
        }
    }
}
