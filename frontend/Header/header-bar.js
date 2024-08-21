const HeaderTemplate =  document.createElement('template');

HeaderTemplate.innerHTML = /*html*/`
    <div id="pingpong-logo">
        <img draggable="false" src="./images/svg-header/pingpong-icon.svg" alt="pingpong">
    </div>
    <div class="notification-search">
        <search-bar></search-bar>
        <div class="notification-icon" >
            <img draggable="false" src="./images/svg-header/alarm.svg" alt="notification">
        </div>
    </div>
    <c-profile></c-profile>
    `

        
export class HeaderBar extends HTMLElement{
    constructor(){
        super();
        this.appendChild(HeaderTemplate.content.cloneNode(true));
    }
}

