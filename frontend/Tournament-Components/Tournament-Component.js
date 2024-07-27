

const uri = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c280be2d-de9f-469f-85f8-2effee43ee0c/dfw0573-626d7dae-68d8-4914-aa0d-6c67b8b2a94b.jpg/v1/fill/w_894,h_894,q_70,strp/my_hero_academia___deku_full_energy_by_jonadav_dfw0573-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MyODBiZTJkLWRlOWYtNDY5Zi04NWY4LTJlZmZlZTQzZWUwY1wvZGZ3MDU3My02MjZkN2RhZS02OGQ4LTQ5MTQtYWEwZC02YzY3YjhiMmE5NGIuanBnIiwiaGVpZ2h0IjoiPD0xMDI0Iiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvYzI4MGJlMmQtZGU5Zi00NjlmLTg1ZjgtMmVmZmVlNDNlZTBjXC9qb25hZGF2LTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.n5rrqMT9qXeebizFk-Q2ESc-LLpXfreZLLqfDNsrgB8";

const fakeData = [
    {
        id: 1,
        date: {day: 19, month: "MAY"},
        username: "ESALIM",
        profile: uri,
        time: "2 HOURS AGO",
        score: "5 - 6",
        result: "WIN",
        replay: ">"
    },
    {
        id: 1,
        date: {day: 10, month: "MAY"},
        username: "NOURDIN",
        profile: uri,
        time: "2 HOURS AGO",
        score: "5 - 6",
        result: "WIN",
        replay: ">"
    }
];


export class TournamentComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="mainContainer">

            </div>

        `;
    }

    connectedCallback() {
        // const styleSheet = document.createElement("link");
        // styleSheet.rel = `stylesheet`;
        // styleSheet.href = `./ProfileComponents/TableComponents/CustomTable.css`;
        // this.shadowRoot.appendChild(styleSheet);

        // const tableContainer = document.createElement("div");
        // tableContainer.className = `profile-data-stats-history`;


        // const table = document.createElement("table");
        // table.cellSpacing = 0;
        // table.cellPadding = 0;
        // table.appendChild(this.getTableHeader(Object.keys(fakeData[0]).splice(1)));
        // table.appendChild(this.getTableBody(fakeData));
        // tableContainer.appendChild(table);
        // this.shadowRoot.appendChild(tableContainer);
    }


    getTableHeader(titles) {
        const tableRow = document.createElement("tr");
        titles.forEach(element => {
            const tableData = document.createElement("th");
            tableData.textContent = element.toUpperCase();
            tableRow.appendChild(tableData);
        });
        const tableHeader = document.createElement("thead");
        tableHeader.appendChild(tableRow);
        return tableHeader;
    }


    disconnectedCallback() {

    }

    static observedAttributes = [];

    attributeChangedCallback(attrName, oldVdalue, newValue) {

    }
}


const cssContent = /*css*/`
    :host {
        width: 95%;
        height: 95%;
        background-color: green;
    }
`;