import { router } from '/root/Router.js';
import { HOST } from '/Utils/GlobalVariables.js';
import { fetchWithToken } from '/root/fetchWithToken.js';

export class TwoFactorAuth extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
        <style>
            :host {
                gap: 5rem !important;
            }
        </style>

        <header-cpn></header-cpn>

        
        <div id="two-fa-id">
            <div class="auth-svg">
                <img src="/assets/auth-svg/2fa.svg" alt="2fa">
            </div>
            
            <h1>Two-Factor Authentication</h1>
            <p>Whenever you sign in to your account, you’ll need to enter your security code from your device.</p>
            
            <div id="error-message"></div>
            <custom-input 
                type="text"
                placeholder="Enter your 2FA code"
                icon="/assets/auth-svg/pwd2.svg"
                required>
            </custom-input>
            
            <button type="submit" class="btk">Submit</button>
        </div>
        
        `;

        this.shadowRoot.querySelector('.btk').addEventListener('click', async (event) => {
            event.preventDefault();
            const code = this.shadowRoot.querySelector('input').value;

            const resErrMsg = this.shadowRoot.querySelector('#error-message');
            if (!code) {
                resErrMsg.textContent = 'Enter your 2FA code';
                resErrMsg.classList.add('show', 'error', 'margin');
            }
            else if (!/^\d+$/.test(code)) {
                resErrMsg.textContent = 'Invalid code format';
                resErrMsg.classList.add('show', 'error', 'margin');
            }
            else if (code.length !== 6) {
                resErrMsg.textContent = 'Code must be 6 digits';
                resErrMsg.classList.add('show', 'error', 'margin');
            }
            else {
                resErrMsg.classList.remove('show', 'error', 'margin');
                
                const response = await fetch(`${HOST}/api/v1/auth/2fa/verify-code/`, {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code: code })
                });

                const data = await response.json();
                if (response.status === 200) {
                    localStorage.setItem('accessToken', data.access_token);
                    router.handleRoute('/home');
                }
                else {
                    resErrMsg.textContent = data.message;
                    resErrMsg.classList.add('show', 'error', 'margin');
                }
            }
        });
    }
}
