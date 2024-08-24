export default class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <link rel="stylesheet" href="../style.css">
            <div class="header">
                <h1>FT_TRANSCENDENCE</h1>
                <img src="../svg/separator.svg">
            </div>
        `;
    }
}

const css = `

`