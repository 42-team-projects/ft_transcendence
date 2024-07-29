const cssContent = /*css*/`
:host {
    
}

table {
    width: 100%;
    height: 100%;
    font-size: 26px;
    color: white;
}


thead > tr {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    background-image: linear-gradient(to right, #24606e, #214251, #224655);
    width: 100%;
    height: 56px;
    font-size: 24px;
}

tbody {
    height: 100%;
}

tbody > tr {
    height: 60px;
    font-size: 22px;
    text-align: center;
    opacity: 0.6;
    background-color: #00fffc10;
}

td {
    border-top: 0.1px solid #051d31;
}

.actions {
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: center;
}
`;

const fakeData = ["Pong Cup", "ESALIM", "27 JUL 2023", "27 JUL 2024", "ACTIVE", "PRIVATE"];

export class TournamentsTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <table cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>OWNER</th>
                        <th>BEGIN</th>
                        <th>END</th>
                        <th>STATE</th>
                        <th>ACCESS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        `;
    }


    createRow(data) {
        const tr = document.createElement("tr");
        data.forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });
        const td = document.createElement("td");
        td.innerHTML = `
                <div class="actions">
                    <img src="./images/logout.svg" width="24"/>
                    <img src="./assets/profile-assets/play-button.svg" width="24"/>
                </div>
            `;
        tr.appendChild(td);
        return tr;
    }

    connectedCallback() {
        const tbody = this.shadowRoot.querySelector("tbody");
        tbody.appendChild(this.createRow(fakeData));
        tbody.appendChild(this.createRow(fakeData));
        tbody.appendChild(this.createRow(fakeData));
        tbody.appendChild(this.createRow(fakeData));
        tbody.appendChild(this.createRow(fakeData));
        tbody.appendChild(this.createRow(fakeData));
        tbody.appendChild(this.createRow(fakeData));
        tbody.appendChild(this.createRow(fakeData));
        tbody.appendChild(this.createRow(fakeData));
        tbody.appendChild(this.createRow(fakeData));
        tbody.appendChild(this.createRow(fakeData));
        tbody.appendChild(this.createRow(fakeData));
        tbody.appendChild(this.createRow(fakeData));
        tbody.appendChild(this.createRow(fakeData));
    }


}