export class QRCodeComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <h1></h1>
            <div class="qrcode">
                <img src="/frontend/assets/tournament-assets/qrcode.svg">
            </div>
        `;
    }
    connectedCallback() {
        if (this.title)
            this.shadowRoot.querySelector("h1").textContent = this.title;
        // if (this.value)
        //     this.generate();

    }

    disconnectedCallback() {

    }

    static observedAttributes = ["title", "value"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "title")
            this.shadowRoot.querySelector("h1").textContent = newValue;
        // else if (attrName == "value")
        //     this.generate();
    }

    get title() { return this.getAttribute("title");}
    set title(value) { this.setAttribute("title", value);}
    
    get value() { return this.getAttribute("value");}
    set value(value) { this.setAttribute("value", value);}
    

    // generate() {
    //     let qr_code_element = document.querySelector(".qr-code");
    //     qr_code_element.style = "";
      
    //     var qrcode = new QRCode(qr_code_element, {
    //       text: `${this.value}`,
    //       width: 180, //128
    //       height: 180,
    //       colorDark: "#000000",
    //       colorLight: "#ffffff",
    //       correctLevel: QRCode.CorrectLevel.H
    //     });
      
    //     let download = document.createElement("button");
    //     qr_code_element.appendChild(download);
      
    //     let download_link = document.createElement("a");
    //     download_link.setAttribute("download", "qr_code.png");
    //     download_link.innerHTML = `Download <i class="fa-solid fa-download"></i>`;
      
    //     download.appendChild(download_link);
      
    //     let qr_code_img = document.querySelector(".qr-code img");
    //     let qr_code_canvas = document.querySelector("canvas");
      
    //     if (qr_code_img.getAttribute("src") == null) {
    //       setTimeout(() => {
    //         download_link.setAttribute("href", `${qr_code_canvas.toDataURL()}`);
    //       }, 300);
    //     } else {
    //       setTimeout(() => {
    //         download_link.setAttribute("href", `${qr_code_img.getAttribute("src")}`);
    //       }, 300);
    //     }
    //   }
}

const cssContent = /*css*/`
:host {
    flex: 1.5;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.qrcode {
    width: 500px;
    height: 500px;
    border: 3px solid aqua;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.qrcode img {
    width: 440px;
    height: 440px;
    opacity: 0.1;
}
`;