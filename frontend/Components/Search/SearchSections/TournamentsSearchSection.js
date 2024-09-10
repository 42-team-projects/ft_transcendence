export class TournamentsSearchSection extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="search-sections">
                <h2 class="result-section-title">TOURNAMENTS</h2>
                <div class="result-section-content"></div>
            </div>
        `;
    }

    connectedCallback() {
        
    }

    appendTournament(tournamentData) {
        const resultSectionContent = this.querySelector(".result-section-content");
        Array.from(tournamentData).forEach(elem => {
            const item = this.createTournamentItem(elem);
            resultSectionContent.appendChild(item);
        });
    }

    clearTournaments() {
        this.querySelector(".result-section-content").innerHTML = '';
    }

    createTournamentItem(tournamentData) {
        const item = document.createElement("div");
        item.className = "item";
        item.id = "id_" + tournamentData.tournament_id;
        item.innerHTML = `
            <div class="profile-item">${tournamentData.tournament_name}</div>
            <div class="search-actions">
                <img src="/assets/icons/join-icon.svg" class="read-message" width="24px" height="24px"></img>
            </div>
        `;
        item.addEventListener("click", () => {
            console.log("hello from tournaments search section");
        });
        return item;
    }
}

customElements.define("tournaments-search-section", TournamentsSearchSection);