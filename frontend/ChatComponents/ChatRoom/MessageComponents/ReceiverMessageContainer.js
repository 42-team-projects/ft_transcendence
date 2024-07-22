export class ReceiverMessageContainerComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }
    
    connectedCallback() {
        const hasCorner = this.hasAttribute("corner");
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    margin: 2px;
                    display: flex;
                    font-family: 'Sansation bold';
                }
                
                * {
                    margin: 0;
                }
            
                .mainContainer {
                    display: flex;
                    background-color: #00ffff40;
                    padding: 10px;
                    color: white;
                    font-size: 14px;
                    border-radius: ${hasCorner ? "0" : "10"}px 10px 10px 10px;
                    margin-left: ${hasCorner ? "0" : "15"}px;
                    min-width: 24px;
                    min-height: 16px;
                    max-width: 650px;
                }
                .corner {
                    border-bottom: ${hasCorner ? "15" : "0"}px solid transparent;
                    border-left: ${hasCorner ? "15" : "0"}px solid transparent;
                    border-top: ${hasCorner ? "15" : "0"}px solid #00ffff40;
                }
            </style>
            <div class="corner" ></div>
            <div class="mainContainer">
                <slot></slot>
            </div>
    
        `;
    }

}
