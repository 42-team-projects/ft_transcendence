export class DateComponent extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        const styleSheet = document.createElement("link");
        styleSheet.rel = `stylesheet`;
        styleSheet.href = `ProfileComponents/TableComponents/BodyComponents/Date/date-component.css`;
        shadow.appendChild(styleSheet);

        const dateContainer = document.createElement("div");
        dateContainer.className = "table-date";
        const day = (this.hasAttribute("day")) ? this.getAttribute("day") : "";
        const month = (this.hasAttribute("month")) ? this.getAttribute("month") : "";
        const dayParag = document.createElement("p");
        dayParag.className = "table-date-day";
        dayParag.textContent = day;
        dateContainer.appendChild(dayParag);
        const monthParag = document.createElement("p");
        monthParag.className = "table-date-month";
        monthParag.textContent = month;
        dateContainer.appendChild(monthParag);
        shadow.appendChild(dateContainer);
    }

    static get observedAttributes() {
        return ["day", "month"];
    }

    get day () {return this.getAttribute("day");}
    get month () {return this.getAttribute("month");}
    set day (value) {this.setAttribute("day", value);}
    set month (value) {this.setAttribute("month", value);}


    attributeChangedCallback(name, oldValue, newValue) {
        // if (name.toLowerCase() === "day")
        //     this.day = newValue;
        // else if (name.toLowerCase() === "month")
        //     this.month = newValue;
    }

}
