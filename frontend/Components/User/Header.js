export default class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <link rel="stylesheet" href="/Components/User/style.css">
            <div class="header">
                <h1>FT_TRANSCENDENCE</h1>
                <img src="/assets/auth-svg/separator.svg">
            </div>
        `;
    }
}

const css = `

`