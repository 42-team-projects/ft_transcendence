const SearchTemplate = /*html*/`
    <img loading="lazy" draggable="false" class="search-icon" src="/images/svg-header/search.svg" alt="searchIcon">
    <div class="vertical-line"></div>
    <input type="text" class="search-input" placeholder="SEARCH">
`;

export class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = SearchTemplate;
    }
}

