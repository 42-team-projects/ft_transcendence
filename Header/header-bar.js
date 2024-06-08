
import { SearchBar } from './Search-bar.js';
// const HeaderTemplate = document.createElement('template');

const HeaderTemplate = `
    <div id="pingpong-logo">
        <img draggable="false" src="./images/svg-header/pingpong-icon.svg" >
    </div>
    <div class="alarm-search">
    </div>

    <search-bar></search-bar>

`

class HeaderBar extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = HeaderTemplate;
        // const element = this.attachShadow({mode : 'open'})
        // element.appendChild(HeaderTemplate.content)
    }
}

customElements.define('header-bar', HeaderBar);
