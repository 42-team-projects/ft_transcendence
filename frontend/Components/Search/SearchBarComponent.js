import { UsersSearchSection } from "/Components/Search/SearchSections/UsersSearchSection.js";
import { TournamentsSearchSection } from "/Components/Search/SearchSections/TournamentsSearchSection.js";
import { ChannelsSearchSection } from "/Components/Search/SearchSections/ChannelsSearchSection.js";
import { OthersSearchSection } from "/Components/Search/SearchSections/OthersSearchSection.js";
import { get_Available_Tournaments } from "/Components/Tournament/configs/TournamentAPIConfigs.js";
import { getApiData } from "/Utils/APIManager.js";
import { PROFILE_API_URL, getCurrentPlayerId } from "/Utils/GlobalVariables.js";


const menu = ["Home", "Game", "Chat", "Tournament", "Settings", "Profile"];

let oldInputValue;
export class SearchBarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="mainContainer">
                <div class="search-bar">
                    <img loading="lazy" id="search" draggable="false" class="search-icon" src="/images/svg-header/search.svg" alt="searchIcon">
                    <div class="vertical-line"></div>
                    <input type="text" class="search-input" placeholder="SEARCH">
                    <img src="/assets/icons/filter-icon.svg" class="filter-button"></img>
                </div>
                <div class="search-body">
                    <div class="filter-section">
                        <div class="filter-1 select">ALL</div>
                        <div class="filter-1">USERS</div>
                        <div class="filter-1">TOURNAMENTS</div>
                        <div class="filter-1">OTHERS</div>
                    </div>
                    <div class="search-result">
                        <users-search-section></users-search-section>

                        <tournaments-search-section></tournaments-search-section>

                        <others-search-section></others-search-section>
                    </div>
                </div>
            </div>
        `;
    }
    interval;
    selectedItem;
    async connectedCallback() {
        const searchInput = this.shadowRoot.querySelector(".search-input");
        const searchIcon = this.shadowRoot.querySelector(".search-icon");
        const searchBody = this.shadowRoot.querySelector(".search-body");
        const searchContainer = this.shadowRoot.querySelector(".search-result");

        // const Users = this.shadowRoot.querySelector("users-search-section");
        const currentPlayerId = await getCurrentPlayerId();
        this.selectedItem = this.shadowRoot.querySelector(".select");
        let searchInputChecker = false;
        searchInput.addEventListener("click", () => {
            if (searchInputChecker)
                return;
            searchInputChecker = true;
            searchBody.style.display = "flex";
            searchIcon.src = "/assets/icons/close-icon.svg";
            searchIcon.id = "close";
            let checker = false;
            this.interval = setInterval(async () => {
                if (searchInput.value && searchInput.value != oldInputValue) {

                    const players = this.shadowRoot.querySelector("users-search-section");
                    if (players){
                        players.clearPlayers();
                        oldInputValue = searchInput.value;
                        let playersData = await getApiData(PROFILE_API_URL + "search/?username=" + searchInput.value);
                        playersData = Array.from(playersData).filter(player => player.id != currentPlayerId);
                        players.appendPlayers(playersData);
                    }
                    
                    const tournaments = this.shadowRoot.querySelector("tournaments-search-section");
                    if (tournaments){
                        tournaments.clearTournaments();
                        oldInputValue = searchInput.value;
                        const tournamentsData = await get_Available_Tournaments("tournament_name=" + searchInput.value);
                        tournaments.appendTournament(tournamentsData);
                    }
                    
                    const othersSearch = this.shadowRoot.querySelector("others-search-section");
                    if (othersSearch){
                        othersSearch.clearItems();
                        oldInputValue = searchInput.value;
                        const data = menu.filter(elem => elem.includes(searchInput.value));
                        othersSearch.appendItem(data);
                    }

                    checker = true;
                }
                else if (!searchInput.value && checker)
                    checker = false;
            }, 500);
        });
        searchIcon.addEventListener("click", () => {
            if (searchIcon.id == "search") {
                searchBody.style.display = "flex";
                searchIcon.src = "/assets/icons/close-icon.svg";
                searchIcon.id = "close";
            }
            else {
                searchBody.style.display = "none";
                searchIcon.src = "/assets/icons/search-icon.svg";
                searchIcon.id = "search";
                clearInterval(this.interval);
                searchInputChecker = false;
            }
        });

        this.renderFilterOption(searchContainer, searchInput);

    }
    renderFilterOption(container, searchInput) {
        const filterButton = this.shadowRoot.querySelector(".filter-button");
        const filterSection = this.shadowRoot.querySelector(".filter-section");
        let filterSectionchecker;
        filterButton.addEventListener("click", () => {
            filterSection.style.display = filterSectionchecker ? "none" : "flex";
            filterSectionchecker = !filterSectionchecker;
            this.renderAll(container, searchInput);
        });
        
        const filters = filterSection.querySelectorAll(".filter-1");
        filters.forEach(filter => {
            filter.addEventListener("click", async () => {
                container.innerHTML = '';
                if (this.selectedItem)
                    this.selectedItem.classList.remove("select");
                filter.classList.add("select");
                this.selectedItem = filter;
                if (filter.textContent == "ALL")
                    await this.renderAll(container, searchInput);
                else if (filter.textContent == "USERS")
                    await this.renderUsersSection(container, searchInput);
                else if (filter.textContent == "TOURNAMENTS")
                    await this.renderTournamentsSection(container, searchInput);
                else if (filter.textContent == "OTHERS")
                    this.renderOthersSection(container, searchInput);

            });
        });
    }

    async renderAll(container, searchInput) {
        container.innerHTML = '';
        await this.renderUsersSection(container, searchInput);
        await this.renderTournamentsSection(container, searchInput);
        this.renderOthersSection(container, searchInput);
    }

    async renderUsersSection(container, searchInput) {
        const usersSection = new UsersSearchSection();
        oldInputValue = searchInput.value;
        if (searchInput.value && searchInput.value !== "") {
            const playersData = await getApiData(PROFILE_API_URL + "search/?username=" + searchInput.value);
            usersSection.appendPlayers(playersData);
        }
        container.appendChild(usersSection);
    }

    async renderTournamentsSection(container, searchInput) {
        const tournamentsSection = new TournamentsSearchSection();
        oldInputValue = searchInput.value;
        const tournamentsData = await get_Available_Tournaments("tournament_name=" + searchInput.value);
        tournamentsSection.appendTournament(tournamentsData);
        container.appendChild(tournamentsSection);
    }
 
    renderOthersSection(container, searchInput) {
        const othersSection = new OthersSearchSection();
        oldInputValue = searchInput.value;
        const data = menu.filter(elem => elem.toLowerCase().includes(searchInput.value.toLowerCase()));
        othersSection.appendItem(data);
        container.appendChild(othersSection);
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
    z-index: 50;
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
    top: 10;
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
    background: #d9d9d930;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    opacity: 0.9;
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


.select {
    background: #00fffc50;
    opacity: 1;
}
`;