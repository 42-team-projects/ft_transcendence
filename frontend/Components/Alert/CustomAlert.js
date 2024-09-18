
export class CustomAlert extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="alertContainer">
                <img loading="lazy" class="closeButton" src="/assets/icons/close-x-icon.svg"></img>
                <div class="alertHeader">
                    <slot name="header"></slot>
                </div>
                <div class="line"></div>
                <div class="alertBody">
                    <slot name="body"></slot>
                </div>
                <div class="line"></div>
                <div class="alertActions">
                    <slot name="footer"></slot>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        // Get the <span> element that closes the modal
        const closeButton = this.shadowRoot.querySelector(".closeButton");
        closeButton.addEventListener("click", () => {
            // this.style.display = "none";
            const alertsConrtainer = window.document.querySelector("body .alerts");
            // if (!alertsConrtainer.childElementCount)
            alertsConrtainer.style.display = "none";

        });
        
    }


}

customElements.define("custom-alert", CustomAlert)

const cssContent = /*css*/`
:host {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
}

.alertContainer {
    position: relative;
    width: 800px;
    height: 400px;
    background: #00142b;
    border: 1px solid #00fffc80;
    display: flex;
    flex-direction: column;
}


.closeButton {
    position: absolute;
    width: 16px;
    height: 16px;
    right: 9px;
    top: 14px;
    color: white;
}


.alertHeader {
    width: 100%;
    height: 40px;
    clip-path: polygon(100% 7px, 100% 0px, 0px 0px, 0px 100%, calc(100% - (40px + 40px)) 100%, calc(100% - (20px + 40px)) 7.5px, calc(100% - (10px + 40px)) 7.5px, calc(100% - (30px + 40px)) 100%, calc(100% - (20px + 40px)) 100%, calc(100% - 40px) 8px, 100% 7px);
    background: rgb(12,176,176);
    background: linear-gradient(90deg, rgba(12,176,176,1) 36%, rgba(68,223,223,1) 99%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Sansation bold';
}

.alertBody,
.alertBody ::slotted(div) {
    width: 100%;
    height: calc(100% - 140px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    font-family: 'Sansation Bold';
}

.alertBody ::slotted(div) {
    height: 100%;
}

.alertActions,
.alertActions ::slotted(div) {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    font-family: 'Sansation bold';

}

.line {
    width: 100%;
    height: 2px;
    margin-top: 10px;
    background-color: #00fffc30;
}
`;
