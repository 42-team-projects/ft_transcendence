import { UsersSearchSection } from "./SearchSections/UsersSearchSection.js";
import { TournamentsSearchSection } from "./SearchSections/TournamentsSearchSection.js";
import { ChannelsSearchSection } from "./SearchSections/ChannelsSearchSection.js";
import { OthersSearchSection } from "./SearchSections/OthersSearchSection.js";
import { get_Available_Tournaments } from "../Tournament/configs/TournamentAPIConfigs.js";

export class SearchBarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="mainContainer">
                <div class="search-bar">
                    <img loading="lazy" id="search" draggable="false" class="search-icon" src="./images/svg-header/search.svg" alt="searchIcon">
                    <div class="vertical-line"></div>
                    <input type="text" class="search-input" placeholder="SEARCH">
                    <img src="../../assets/icons/filter-icon.svg" class="filter-button"></img>
                </div>
                <div class="search-body">
                    <div class="filter-section">
                        <div class="filter-1">USERS</div>
                        <div class="filter-1">TOURNAMENTS</div>
                        <div class="filter-1">CHANNELS</div>
                        <div class="filter-1">OTHERS</div>
                    </div>
                    <div class="search-result">

                        <users-search-section></users-search-section>

                        <tournaments-search-section></tournaments-search-section>

                        <channels-search-section></channels-search-section>

                        <others-search-section></others-search-section>

                    </div>
                </div>
            </div>
        `;
    }
    interval;
    connectedCallback() {
        const searchInput = this.shadowRoot.querySelector(".search-input");
        const searchIcon = this.shadowRoot.querySelector(".search-icon");
        const searchBody = this.shadowRoot.querySelector(".search-body");
        const filterButton = this.shadowRoot.querySelector(".filter-button");
        const filterSection = this.shadowRoot.querySelector(".filter-section");
        // const Users = this.shadowRoot.querySelector("users-search-section");
        const tournaments = this.shadowRoot.querySelector("tournaments-search-section");

        let searchInputChecker = false;
        searchInput.addEventListener("click", () => {
            if (searchInputChecker)
                return;
                searchInputChecker = true;
            searchBody.style.display = "flex";
            searchIcon.src = "../../assets/icons/close-icon.svg";
            searchIcon.id = "close";
            let oldInputValue;
            let checker = false;
            this.interval = setInterval(async () => {
                if (searchInput.value && searchInput.value != oldInputValue) {
                    tournaments.clearTournaments();
                    oldInputValue = searchInput.value;
                    const tournamentsData = await get_Available_Tournaments("tournament_name=" + searchInput.value);
                    tournaments.appendTournament(tournamentsData);
                    checker = true;
                }
                else if (!searchInput.value && checker) {
                    tournaments.clearTournaments();
                    checker = false;
                }
                console.log("interval: ", this.interval);
            }, 500);
        });
        searchIcon.addEventListener("click", () => {
            if (searchIcon.id == "search") {
                searchBody.style.display = "flex";
                searchIcon.src = "../../assets/icons/close-icon.svg";
                searchIcon.id = "close";
            }
            else {
                searchBody.style.display = "none";
                searchIcon.src = "../../assets/icons/search-icon.svg";
                searchIcon.id = "search";
                clearInterval(this.interval);
                searchInputChecker = false;
            }
        });
        let filterSectionchecker;
        filterButton.addEventListener("click", () => {
            filterSection.style.display = filterSectionchecker ? "none" : "flex";
            filterSectionchecker = !filterSectionchecker;
        });

    }
}

customElements.define("search-bar-component", SearchBarComponent);

const cssContent = /*css*/`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Sansation';
}

*::-webkit-scrollbar {
    display: none;
}

:host {
    flex: 1;
    max-width: 1000px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px;
    z-index: 1000;
}

.mainContainer {
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #00FFFC;
    justify-content: center;
    align-items: center;
}

.search-bar {
    display: flex;
    width: calc(100% - 20px);
    height: 100%;
    align-items: center;
    gap: 10px;
    height: 3.5rem;
}

.search-icon{
    width: 32px;
    height: 32px;
    margin: 0 10px;
}

.vertical-line {
    background-color: #00FFFC;
    width: 2px;
    height: 60%;
}

.search-input{
    flex: 1;
    height: 100%;
    border-radius: 10px;
    border: none;
    width: 100%;
    background-color: transparent;
    font-family: 'Sansation Bold';
    font-size: 25px;
    color: #ffffff;
    margin-left: 10px;
    padding-left: 10px;
    outline: none;
}

.search-input::placeholder{
    color: #ffffff;
    font-family: 'Sansation';
    opacity: 0.7;
    font-size: 24px;
}


.filter-button {
    width: 24px;
    height: 24px;
}

.search-body {
    width: 100%;
    border: 1px solid aqua;
    border-radius: 10px;
    position: absolute;
    display: none;
    flex-direction: column;
    gap: 10px;
    max-height: 800px;
    background: #01263e;
}

.filter-section {
    padding: 10px;
    width: 100%;
    height: 48px;
    display: none;
    align-items: center;
    justify-content: center;
    gap: 20px;
    overflow: scroll;
}

.filter-1 {
    padding: 6px 10px;
    border-radius: 6px;
    background: #00FFFC50;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
}

.search-result {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
    overflow: scroll;
    width: calc(100% - 20px);
    margin: 10px;
}

.search-sections {
    width: calc(100% - 40px);
    display: flex;
    margin: 0 20px;
    flex-direction: column;
    max-height: 400px;
}

.result-section-content {
    width: 100%;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.item {
    display: flex;
    align-items: center;
    width: 100%;
}


.profile-item {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
}
`;