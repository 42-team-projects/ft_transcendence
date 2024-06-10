

const HeaderTemplate =  document.createElement('template');

HeaderTemplate.innerHTML = /*html*/`
    <div id="pingpong-logo">
        <img draggable="false" src="./images/svg-header/pingpong-icon.svg">
    </div>
    <div class="notification-search">
        <search-bar></search-bar>
        <div class="notification-icon" >
            <img draggable="false" src="./images/svg-header/alarm.svg">
        </div>
    </div>
    <c-profile></c-profile>
    `

        
class HeaderBar extends HTMLElement{
    constructor(){
        super();
        this.appendChild(HeaderTemplate.content);
    }
}

customElements.define('header-bar', HeaderBar);

