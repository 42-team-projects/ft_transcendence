import { DateComponent } from "./BodyComponents/Date/DateComponent.js";

const url = "https://jsonplaceholder.org/users";
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

export class CustomTable extends HTMLElement {
    
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    async getDataFromApi(APIUrl) {
        /*
        try {
            const response = await fetch(APIUrl);
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error.message);
        }
        */
       return fakeData;
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

    getTableBody(data) {
        const tableBody = document.createElement("tbody");
        const keys = Object.keys(data[0]).splice(1);
        data.forEach(element => {
            const tableRow = document.createElement("tr");
            const values = Object.values(element).splice(1);
            let counter = 0;
            values.forEach( val => {
                const tableData = document.createElement("td");
                if (counter == 0) {
                    const dateComponent = document.createElement("date-component");
                    dateComponent.day = val.day;
                    dateComponent.month = val.month;
                    tableData.appendChild(dateComponent);
                } else if (counter == 2)  {
                    const profileContainer = document.createElement("div");
                    profileContainer.className = "profile-container";
                    const profile = document.createElement("c-hexagon");
                    profile.width = "55px";
                    profile.height = "55px";
                    profile.apply = true;
                    profile.Bcolor = "#EB9A45";
                    const profileImage = document.createElement("img");
                    profileImage.slot = "content";
                    profileImage.width = 55;
                    profileImage.height = 55;
                    profileImage.draggable = "false";
                    profileImage.src = val;
                    profile.appendChild(profileImage);
                    profileContainer.appendChild(profile);
                    tableData.appendChild(profileContainer);
                } else if (counter == 3)  {
                    const parag = document.createElement("p");
                    parag.className = "table-time";
                    parag.textContent = val;
                    parag.textContent = parag.textContent.toUpperCase();
                    tableData.appendChild(parag);
                } else if (counter == 6)  {
                    const icon = document.createElement("img");
                    icon.src = "/frontend/assets/profile-assets/play-button.svg";
                    icon.width = 24;
                    tableData.appendChild(icon);
                } else {
                    const parag = document.createElement("p");
                    parag.textContent = val;
                    parag.textContent = parag.textContent.toUpperCase();
                    tableData.appendChild(parag);
                }

                if (counter === 5 && val.toLowerCase() === "loss")
                    tableRow.style.backgroundImage = "linear-gradient(to right, #D22C2250 , #D22C2210)";

                counter++;
                tableRow.appendChild(tableData);
            });
            tableBody.appendChild(tableRow);
        });
        return tableBody;
    }

    connectedCallback() {
        const styleSheet = document.createElement("link");
        styleSheet.rel = `stylesheet`;
        styleSheet.href = `/frontend/ProfileComponents/TableComponents/CustomTable.css`;
        this.shadowRoot.appendChild(styleSheet);

        const tableContainer = document.createElement("div");
        tableContainer.className = `profile-data-stats-history`;


        const table = document.createElement("table");
        table.cellSpacing = 0;
        table.cellPadding = 0;
        const data = this.getDataFromApi(url);
        const json = data.then((values) => {
            table.appendChild(this.getTableHeader(Object.keys(values[0]).splice(1)));
            table.appendChild(this.getTableBody(values));
        });
        tableContainer.appendChild(table);
        this.shadowRoot.appendChild(tableContainer);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }

}
