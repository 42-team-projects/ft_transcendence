export default class Shape extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title');
        // console.log('==>', title)
        this.innerHTML = `
            <link rel="stylesheet" href="Components/User/style.css" type="text/css">
                
            <div id="background"></div>
            
            <form id="content">
                <div id="inner-header">
                    <h1>${title}</h1>
                </div>
                
                <div id="error-message"></div>
                
                <input-field placeholder="User name" icon="../../assets/auth-svg/username.svg"></input-field>
                <input-field placeholder="Email" icon="../../assets/auth-svg/email.svg"></input-field>
                <input-field placeholder="Password" icon="../../assets/auth-svg/pwd.svg" eye="../../assets/auth-svg/eyeClosed.svg"></input-field>
                <input-field placeholder="Repeat password" icon="../../assets/auth-svg/pwd.svg" eye="../../assets/auth-svg/eyeClosed.svg"></input-field>
            
                <submit-button
                    title="Sign Up"
                    account-text="I already have account? <a href='/login'>Login</a>">
                </submit-button>
            </form>
        `;
    }

    showError(message) {
        const eMsg = this.querySelector('#error-message');
        eMsg.textContent = message;
        eMsg.classList.add('show');
    }
}

class InputField extends HTMLElement {
    connectedCallback() {
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);

        const placeholder = this.getAttribute('placeholder');
        const icon = this.getAttribute('icon');
        const eye = this.getAttribute('eye');

        this.innerHTML = `
            <div class="input-container">
                <img src="${icon}" alt="" class="input-icon">
                ${this.generateInputField(placeholder)}
                ${this.generateEyeIcon(eye)}
            </div>
            
            <span class="warning">This field is required*</span>
                `;
    }

    generateInputField(placeholder) {
        let type;
        if (placeholder === 'Password' || placeholder === 'Repeat password')
            type = 'password';
        else
            type = 'text';
        return `<input type="${type}" placeholder="${placeholder}">`;
    }

    generateEyeIcon(eye) {
        if (eye) {
            return `<img src="${eye}" alt="" class="eye-icon" onclick="this.parentElement.parentElement.togglePasswordVisibility(this)">`;
        }
        return '';
    }

    togglePasswordVisibility(eyeIcon) {
        const input = eyeIcon.previousElementSibling;
        if (input.type === "password") {
            input.type = "text";
            eyeIcon.src = "../../assets/auth-svg/eyeOpen.svg";
        } else {
            input.type = "password";
            eyeIcon.src = "../../assets/auth-svg/eyeClosed.svg";
        }
    }
}

class SubmitButton extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title');
        const accountText = this.getAttribute('account-text');

        this.innerHTML = `
            <button type="submit">${title}</button>
            <p>${accountText}</p>
        `;
    }
}

customElements.define('submit-button', SubmitButton);
customElements.define('input-field', InputField);

const css = `

`