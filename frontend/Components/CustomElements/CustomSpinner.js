export class CustomSpinner extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = /*html*/`
            <style> ${cssContent} </style>
            <div id="html-spinner"></div>
            <p id="html-para">Updating...</p>
        `;
    }

    connecedCallback() {
        
    }

    disconnecedCallback() {

    }

    display() {
        this.style.display = "flex";
        let counter = 0;
        const interval = setInterval(() => {
            if (counter >= Number(this.time)) {
                clearInterval(interval);
                this.close();
                return ;
            }
            counter++;
        }, 100);
    }

    close() {
        this.style.display = "none";
    }

    set time(val) {this.setAttribute("time", val);}
    get time() {return this.getAttribute("time");}
    
    set label(val) {this.setAttribute("label", val);}
    get label() {return this.getAttribute("label");}


    static observedAttributes = ["time", "label"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "label")
            this.shadowRoot.querySelector("#html-para").innerText = newValue;
    }


}

customElements.define("custom-spinner", CustomSpinner);

const cssContent = /*css*/`

* {
    margin: 0;
    padding: 0;
}

:host {
    position: absolute;
    top: 0;
    width: 100%;
    height: 105%;
    background: #01253e80;
    z-index: 45;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-family: 'Sansation Bold';
    font-size: 20px;
}
  

#html-spinner{
    width: 64px;
    height: 64px;
    border:8px solid #fff;
    border-top:8px solid aqua;
    border-radius:50%;
}

#html-spinner {
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 1.2s;
    -webkit-animation-name: rotate;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;

    -moz-transition-property: -moz-transform;
    -moz-animation-name: rotate; 
    -moz-animation-duration: 1.2s; 
    -moz-animation-iteration-count: infinite;
    -moz-animation-timing-function: linear;

    transition-property: transform;
    animation-name: rotate; 
    animation-duration: 1.2s; 
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

@-webkit-keyframes rotate {
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
}

@-moz-keyframes rotate {
    from {-moz-transform: rotate(0deg);}
    to {-moz-transform: rotate(360deg);}
}

@keyframes rotate {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}

`;