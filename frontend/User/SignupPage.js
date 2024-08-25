import Header from './Header.js';
import Shape from './Shape.js';
import { router } from '../root/Router.js';
import config from '../conf.js';

export default class SignupPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <link rel="stylesheet" href="../style.css">
            <header-cpn></header-cpn>
            <shape-cpn 
                title="Sign Up" 
                account-text="Already have an account?" 
                account-link="/login">
            </shape-cpn>
        `;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.querySelector('shape-cpn').addEventListener('submit', this.handleSubmit);
    }
    handleSubmit(event) {
        event.preventDefault();
    
        const inputFields = this.querySelectorAll('input-field');
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
                    errorMessage.textContent = 'Invalid password';
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
            // console.log("all good !")
            this.submitForm(formData);
            // console.log(formData)
        }
    }
    
    async registerUser(formData) {
        const response = await fetch(
            `http://${config.serverIP}:8000/api/v1/auth/register/`,
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
                const shapeCpn = this.querySelector('shape-cpn');
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
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;
    return re.test(password);
    // return true;
}

const css = `

`

customElements.define('header-cpn', Header);
customElements.define('shape-cpn', Shape);