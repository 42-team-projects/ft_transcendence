export class DateComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        const styleSheet = document.createElement("style");
        styleSheet.innerHTML = `
            .table-date {
                color: white;
                opacity: 0.5;
                font-size: 24px;
                font-family: 'Sansation';
                width: auto;
                height: auto;
            }
            
            
            .table-date-day {
                margin-top: 8px;
                margin-bottom: 0;
            }
            
            .table-date-month {
                font-size: 16px;
                margin: 0;
            
            }
        `;
        this.shadowRoot.appendChild(styleSheet);
    
        const dateContainer = document.createElement("div");
        dateContainer.className = "table-date";
        const dayParag = document.createElement("p");
        dayParag.className = "table-date-day";
        dayParag.textContent = this.day;
        dateContainer.appendChild(dayParag);
        const monthParag = document.createElement("p");
        monthParag.className = "table-date-month";
        dateContainer.appendChild(monthParag);
        this.shadowRoot.appendChild(dateContainer);
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".table-date-day").textContent = this.day;
        this.shadowRoot.querySelector(".table-date-month").textContent = this.month;
    }

    static observedAttributes = ["day", "month"];

    get day () {return this.getAttribute("day");}
    get month () {return this.getAttribute("month");}
    set day (value) {this.setAttribute("day", value);}
    set month (value) {this.setAttribute("month", value);}


    attributeChangedCallback(name, oldValue, newValue) {
        if (name.toLowerCase() === "day")
            this.shadowRoot.querySelector(".table-date-day").textContent = this.day;
        else if (name.toLowerCase() === "month")
            this.shadowRoot.querySelector(".table-date-month").textContent = this.month;
    }

}
