export class SenderMessageContainerComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }
    
    connectedCallback() {
        const hasCorner = this.hasAttribute("corner");
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    margin: 4px;
                    display: flex;
                    font-family: 'Sansation bold';
                }
                
                * {
                    margin: 0;
                }
            
                .mainContainer {
                    display: flex;
                    background-color: #d9d9d920;
                    padding: 10px;
                    color: white;
                    font-size: 14px;
                    border-radius: 10px ${hasCorner ? "0" : "10"}px 10px 10px;
                    margin-right: ${hasCorner ? "0" : "15"}px;
                    min-width: 24px;
                    min-height: 16px;
                    max-width: 650px;
                }
                .corner {
                    border-bottom: ${hasCorner ? "15" : "0"}px solid transparent;
                    border-right: ${hasCorner ? "15" : "0"}px solid transparent;
                    border-top: ${hasCorner ? "15" : "0"}px solid #d9d9d920;

                }
            </style>
            <div class="mainContainer">
                <slot></slot>
            </div>
            <div class="corner" ></div>
    
        `;
    }

}
