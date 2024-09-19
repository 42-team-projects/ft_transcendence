

export class WaitingForOpponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = /*html*/`
            <style>
                h1 {
                    font-size: 5rem;
                    color: '#00b9be';
                    text-align: center;
                    margin-top: 20%;
                }
            </style>
            <h1>Waiting for opponent to join ...</h1>
        `;
        document.body.querySelector('header-bar').classList.add('blur');
        document.body.querySelector('footer-bar').classList.add('blur');
        document.body.querySelector('root-content').classList.add('blur');
    }
    disconnectedCallback() {
        document.body.querySelector('header-bar').classList.remove('blur');
        document.body.querySelector('footer-bar').classList.remove('blur');
        document.body.querySelector('root-content').classList.remove('blur');
        this.remove();
    }
}
