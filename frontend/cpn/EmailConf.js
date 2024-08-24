
export class EmailConf extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <h1>Email Confirmation</h1>
            <p>We have sent an email to your inbox. Please check it to confirm your registration.</p>
        `;
    }
}

export class HomePage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <h1>Welcome to the Home Page</h1>
        `;
    }
}