import Header from '/Components/User/Header.js';
import Shape from '/Components/User/Shape.js';
import { router } from '/root/Router.js';
import { HOST } from '/Utils/GlobalVariables.js';

export default class SignupPage extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    
    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/Components/User/style.css">
            <header-cpn></header-cpn>
            <shape-cpn 
                title="Sign Up" 
                account-text="Already have an account?" 
                account-link="/login">
            </shape-cpn>
            <custom-spinner time="50" style="display: none;"></custom-spinner>
        `;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.shadowRoot.querySelector('shape-cpn').addEventListener('submit', this.handleSubmit);
    }
    async handleSubmit(event) {
        event.preventDefault();
    
        const inputFields = this.shadowRoot.querySelectorAll('input-field');
        let formData = {};
        let hasError = false;
    
        for (let inputField of inputFields) {
            const input = inputField.querySelector('input');
            const errorMessage = inputField.querySelector('.warning')
    
            if (input.value === '') {
                errorMessage.textContent = 'This field is required*';
                errorMessage.classList.add('show');
                hasError = true;
            } else {
                const placeholder = inputField.getAttribute('placeholder');
                if (placeholder === 'Email' && !validateEmail(input.value)) {
                    errorMessage.textContent = 'Invalid email format';
                    errorMessage.classList.add('show');
                    hasError = true;
                } else if (placeholder === 'User name' && !validateUsername(input.value)) {
                    errorMessage.textContent = 'Invalid username';
                    errorMessage.classList.add('show');
                    hasError = true;
                } else if ((placeholder === 'Password' || placeholder === 'Repeat password') && !validatePassword(input.value)) {
                    errorMessage.textContent = 'Invalid password eg: Abc@1234';
                    errorMessage.classList.add('show');
                    hasError = true;
                } else {
                    errorMessage.classList.remove('show');
                    formData[placeholder] = input.value;
                    
                    if (placeholder === 'Repeat password' && formData['Password'] && input.value !== formData['Password']) {
                        errorMessage.textContent = 'Passwords do not match';
                        errorMessage.classList.add('show');
                        formData[placeholder] = '';
                        hasError = true;
                    }
                }
            }
        }
    
        // Fetch request
        if (hasError)
            console.log("something wrong!")
        else
        {
            const refreshBox = this.shadowRoot.querySelector("custom-spinner");
            refreshBox.label = "Waiting..."
            refreshBox.display();
            await this.submitForm(formData);
            refreshBox.close();
        }
    }
    
    async registerUser(formData) {
        const response = await fetch(
            `${HOST}/api/v1/auth/register/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData['Email'],
                    username: formData['User name'],
                    password1: formData['Password'],
                    password2: formData['Repeat password'],
                }),
            }
        );
    
        return response;
    }
    async submitForm(formData) {
        try {
            
            const response = await this.registerUser(formData);
            const data = await response.json();
            
            if (response.status !== 201) {
                const shapeCpn = this.shadowRoot.querySelector('shape-cpn');
                const errorMessage = data.username ? data.username : data.email;
                shapeCpn.showError(`${errorMessage}`);
            }
            else {
                router.handleRoute("/confirm-email");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
}


function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateUsername(username) {
    var re = /^[a-z0-9_\.]+$/;
    return re.test(username);
}

function validatePassword(password) {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{8,}$/;
    return re.test(password);
    // return true;
}

const css = `

`

customElements.define('header-cpn', Header);
customElements.define('shape-cpn', Shape);