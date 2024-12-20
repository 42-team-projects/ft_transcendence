import { HOST } from '/Utils/GlobalVariables.js';

export default class EmailConf extends HTMLElement {
    async connectedCallback() {
        const { router } = await import('/root/Router.js');
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token)
        {
            fetch(`${HOST}/api/v1/auth/confirm-email/${token}`)
            .then(response => response.json())
            .then(data => {
                router.handleRoute('/login')
                
                const login = document.querySelector('login-page');
                const messageDiv = login.shadowRoot.querySelector('#error-message');
                messageDiv.innerHTML = data.message;

                if (data.status === 'success') {
                    messageDiv.classList.add('show', 'success');
                } else if (data.status === 'error') {
                    messageDiv.classList.add('show', 'error');
                }
            });
        }
        else
        {
            this.innerHTML = /*html*/`
                <link rel="stylesheet" href="/Components/User/style.css" type="text/css">
                
                <header-cpn></header-cpn>

                <div id="center-container">
                    <img src="/assets/auth-svg/confirm.svg" id="confirm" alt="confirm">
                    <h1 id="confirm-header">Email Confirmation</h1>
                    <p>We sent you a verification email to your email account<br>
                    please check your email box.</p>
                </div>
            `;
        }
    }
}