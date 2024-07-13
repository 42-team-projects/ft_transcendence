import { DateComponent } from "./BodyComponents/Date/DateComponent.js";

const url = "https://jsonplaceholder.org/users";

const fakeData = [
    {
        id: 1,
        date: {day: 19, month: "MAY"},
        username: "ESALIM",
        profile: "https://google.com/search",
        time: "2 HOURS AGO",
        score: "5 - 6",
        result: "WIN",
        replay: ">"
    },
    {
        id: 1,
        date: {day: 19, month: "MAY"},
        username: "ESALIM",
        profile: "https://google.com/search",
        time: "2 HOURS AGO",
        score: "5 - 6",
        result: "WIN",
        replay: ">"
    },
    {
        id: 1,
        date: {day: 19, month: "MAY"},
        username: "ESALIM",
        profile: "https://google.com/search",
        time: "2 HOURS AGO",
        score: "5 - 6",
        result: "WIN",
        replay: ">"
    },
    {
        id: 1,
        date: {day: 19, month: "MAY"},
        username: "ESALIM",
        profile: "https://google.com/search",
        time: "2 HOURS AGO",
        score: "5 - 6",
        result: "WIN",
        replay: ">"
    }
];

export class Table extends HTMLElement {
    
    constructor () {
        super();
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
   /*
       <c-hexagon width="110px" height="110px" apply="true" >
        <img slot="content" draggable="false" src="./images/svg-header/profile.jpeg">
    </c-hexagon>
   */
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
                } else if (counter == 1) {
                    const parag = document.createElement("p");
                    parag.className = "table-time";
                    parag.textContent = val;
                    parag.textContent = parag.textContent.toUpperCase();
                    tableData.appendChild(parag);
                } else if (counter == 2)  {
                    const profile = document.createElement("c-hexagon");
                    profile.width = "50px";
                    profile.height = "50px";
                    profile.apply = true;
                    profile.Bcolor = "#EB9A45";
                    const profileImage = document.createElement("img");
                    profileImage.slot = "content";
                    profileImage.width = 50;
                    profileImage.width = 50;
                    profileImage.draggable = "false";
                    profileImage.src = "/images/svg-header/profile.jpeg";
                    profile.appendChild(profileImage);
                    tableData.appendChild(profile);
                }
                counter++;
                tableRow.appendChild(tableData);
            });
            tableBody.appendChild(tableRow);
        });
        return tableBody;
    }

    connectedCallback() {
        const shadow = this.attachShadow({mode: "open"});

        const styleSheet = document.createElement("link");
        styleSheet.rel = `stylesheet`;
        styleSheet.href = `ProfileComponents/TableComponents/myTable.css`;
        shadow.appendChild(styleSheet);

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
        shadow.appendChild(tableContainer);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }

}
