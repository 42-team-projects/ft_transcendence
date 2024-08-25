const HeaderTemplate =  document.createElement('template');

HeaderTemplate.innerHTML = /*html*/`
    <link rel="stylesheet" href="./header.css">
    <div id="pingpong-logo">
        <img loading="lazy" draggable="false" src="./images/svg-header/pingpong-icon.svg" alt="pingpong">
    </div>
    <div class="notification-search">
        <search-bar></search-bar>
        <div class="notification-icon" >
            <img loading="lazy" draggable="false" src="./images/svg-header/alarm.svg" alt="notification">
        </div>
    </div>
    <c-profile></c-profile>
    `

        
export class HeaderBar extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode : 'open'})
        this.shadowRoot.appendChild(HeaderTemplate.content.cloneNode(true));
    }
}

