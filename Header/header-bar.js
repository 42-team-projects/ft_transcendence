import {} from './ImagesContainer.js'
import {SearchBar} from './Search-bar.js'
import {UserRank} from './UserRank.js'
import {Hexagon} from './hexagon.js'
import {Profile} from './profile.js'


customElements.define('c-hexagon',Hexagon)
customElements.define('search-bar', SearchBar);
customElements.define('c-profile', Profile)
customElements.define('user-rank',UserRank)



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

