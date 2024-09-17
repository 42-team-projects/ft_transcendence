import { router } from '/root/Router.js';
import { HOST } from '/Utils/GlobalVariables.js';


function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePassword(password) {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;
    return re.test(password);
}

export class ForgotPassword extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = /*html*/`

        <header-cpn></header-cpn>
        <div id="pass-form">
            <h1>Forgot Password</h1>
            <p>Enter the email address associated with your account and <br> we’ll send you a link to reset your password.</p>
            
            <div id="error-message"></div>
            <custom-input 
                type="email"
                placeholder="example@example.com" 
                icon="/assets/auth-svg/email2.svg"
                required>
            </custom-input>            
            
            <button type="submit" class="btk">Send</button>
            
            </div>
            `;

        this.shadowRoot.querySelector('.btk').addEventListener('click', async (event) => {
            event.preventDefault();

            const email = this.shadowRoot.querySelector('input').value;
            const resErrMsg = this.shadowRoot.querySelector('#error-message');

            if (!email) {
                resErrMsg.textContent = 'Please fill all fields';
                resErrMsg.classList.add('show', 'error', 'margin');
            }
            else {
                if (!validateEmail(email)) {
                    resErrMsg.textContent = 'Invalid email format';
                    resErrMsg.classList.add('show', 'error', 'margin');
                }
                else {
                    // send email
                    const response = await fetch(`${HOST}/api/v1/auth/reset-password/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email })
                    });

                    const data = await response.json();
                    
                    if (response.status === 200) {
                        resErrMsg.textContent = data.message;
                        resErrMsg.classList.add('show', 'success', 'margin');
                    } else {
                        resErrMsg.textContent = data.message;
                        resErrMsg.classList.add('show', 'error', 'margin');
                    }
                }
            }
        });
    }

}

export class ConfirmPassword extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {

        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        const response = await fetch(`${HOST}/api/v1/auth/verify-token/${token}/`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
            this.showForm();
        }
        else {
            router.handleRoute('/forgot-password');
            const forgotPassword = document.querySelector('forgot-password');
            const resErrMsg = forgotPassword.shadowRoot.querySelector('#error-message');
            resErrMsg.textContent = data.message;
            resErrMsg.classList.add('show', 'error', 'margin');
        }
    }

    showForm() {
        this.shadowRoot.innerHTML = /*html*/`
                <header-cpn></header-cpn>
                
                <div id="confirm-pass">
                    <h1>Reset Password</h1>
                    <div id="error-message"></div>
                    <custom-input 
                        type="password"
                        placeholder="New password" 
                        icon="/assets/auth-svg/pwd2.svg"
                        required>
                    </custom-input>
                    <span class="warning">This field is required*</span>
                    
                    <custom-input 
                        type="password"
                        placeholder="Reapeat new password"
                        icon="/assets/auth-svg/pwd2.svg"
                        required>
                    </custom-input>
                
                    <button type="submit" class="btk">Reset Password</button>
                    </div>
                `;
        this.shadowRoot.querySelector('.btk').addEventListener('click', async (event) => {
            event.preventDefault();
            const password = this.shadowRoot.querySelectorAll('input')[0].value;
            const repeatPassword = this.shadowRoot.querySelectorAll('input')[1].value;

            const eMsg = this.shadowRoot.querySelector('#error-message');

            if (!password || !repeatPassword) {
                eMsg.textContent = 'Please fill all fields';
                eMsg.classList.add('show', 'error');
            }
            else if (password !== repeatPassword) {
                eMsg.textContent = 'Passwords do not match';
                eMsg.classList.add('show', 'error');
            }
            else if (!validatePassword(password)) {
                eMsg.textContent = 'Invalid password. Example: Abc@123';
                eMsg.classList.add('show', 'error');
            }
            else {
                const params = new URLSearchParams(window.location.search);
                const token = params.get('token');

                const response = await fetch(`${HOST}/api/v1/auth/confirm-reset-password/${token}/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ new_password: password })
                });

                const data = await response.json();
                console.log(data);

                if (response.status === 200) {
                    router.handleRoute('/login');
                    const loginPage = document.querySelector('login-page');
                    const resErrMsg = loginPage.shadowRoot.querySelector('#error-message');
                    resErrMsg.textContent = data.message;
                    resErrMsg.classList.add('show', 'success');
                } else {
                    eMsg.textContent = data.message;
                    eMsg.classList.add('show', 'error');
                }
            }
        });
    }
}

export class CustomInput extends HTMLElement {
    connectedCallback() {
        const type = this.getAttribute('type');
        const placeholder = this.getAttribute('placeholder');
        const icon = this.getAttribute('icon');

        this.innerHTML = /*html*/`
            <object type="image/svg+xml" data="${icon}" class="input-icon"></object>
            <input type="${type}" placeholder="${placeholder}">
            `;
    }
}

customElements.define('custom-input', CustomInput);