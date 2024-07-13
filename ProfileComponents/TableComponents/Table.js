import { DateComponent } from "./BodyComponents/Date/DateComponent.js";

const htmlContent = `
<div class="profile-data-stats-history">
    <table cellspacing="0" cellpadding="0">
        <thead>
            <tr>
                <th>DATE</th>
                <th>USER NAME</th>
                <th>PROFILE</th>
                <th>TIME</th>
                <th>SCORE</th>
                <th>RESUALT</th>
                <th>REPLAY</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="table-date">
                    <p class="table-date-day">19</p>
                    <p class="table-date-month">MAY</p>
                </td>
                <td class="table-username">
                    <p>ESALIM</p>
                </td>
                <td class="table-profile">
                    <img src="assets/profile-assets/profile-image.svg" width="40" />
                </td>
                <td class="table-time">
                    <p>2 HOURS AGO</p>
                </td>
                <td class="table-score">
                    <p>2 - 5</p>
                </td>
                <td class="table-result">
                    <p>LOSS</p>
                </td>
                <td class="table-replay">
                    <img src="assets/profile-assets/play-button.svg" width="32" />
                </td>
            </tr>
        </tbody>
    </table>
</div>
`;

export class Table extends HTMLElement {
    
    constructor () {
        super();
    }

    async getDataFromApi() {
        const url = "https://jsonplaceholder.org/users";
        try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error.message);
        }
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
        const keys = Object.keys(data[0]).splice(1, 7);
        data.forEach(element => {
            const tableRow = document.createElement("tr");
            const values = Object.values(element).splice(1, 7);
            values.forEach( val => {
                const tableData = document.createElement("td");
                // const parag = document.createElement("p");
                // parag.className = "table-time";
                // parag.textContent = val;
                const dateComponent = document.createElement("date-component");
                dateComponent.day = 19;
                dateComponent.month = val;
                tableData.appendChild(dateComponent);
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
        const data = this.getDataFromApi();
        const json = data.then((values) => {
            table.appendChild(this.getTableHeader(Object.keys(values[0]).splice(1, 7)));
            table.appendChild(this.getTableBody(values));
        });
        tableContainer.appendChild(table);
        shadow.appendChild(tableContainer);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }

}
