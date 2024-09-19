import { router } from '/root/Router.js';
import { HOST } from '/Utils/GlobalVariables.js';

export default class LoginPage extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.isOAuth = false;
	}
	connectedCallback() {
		this.shadowRoot.innerHTML = `
		<style>${css}</style>
		
		<header-cpn></header-cpn>
		
		<div id="test">
		
		<div id="background"></div>
		
		<form id="content">
			<div id="inner-header">
				<h1>Login</h1>
			</div>
			
			<div id="error-message"></div>
			
			<input-field placeholder="Email" icon="/assets/auth-svg/email.svg"></input-field>
			<input-field placeholder="Password" icon="/assets/auth-svg/pwd.svg" eye="/assets/auth-svg/eyeClosed.svg"></input-field>
			
			<div id="forget-password">
				<a href="/forgot-password">Forgot Password?</a>
			</div>
			
			<submit-button
				title="Login"
				account-text="Don't have an account? <a href='/signup'>Sign Up</a>">
			</submit-button>
			
			<div class="oauth-footer">
				<img src="/assets/auth-svg/orLine.svg" alt="Or">

				<div class="button-container">

					<button class="oauth-button google">
						<img src="/assets/auth-svg/google.svg" alt="Google">
					</button>
					
					<button class="oauth-button intra">
						<img src="/assets/auth-svg/42.svg" alt="Intra">
					</button>
				</div>
			</div>
		
		</form>
						
			</div>
		`;
	
		this.handleSubmit = this.handleSubmit.bind(this);
		this.shadowRoot.querySelector('#content').addEventListener('submit', this.handleSubmit.bind(this));
		
		// oauth
		this.shadowRoot.querySelector('.oauth-button.google').addEventListener('click', () => {
			this.isOAuth = true;
			window.location.href = `${HOST}/api/v1/auth/google/redirect/`;
		});
		
		this.shadowRoot.querySelector('.oauth-button.intra').addEventListener('click', () => {
			this.isOAuth = true; 
			window.location.href = `${HOST}/api/v1/auth/intra/redirect/`;
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.isOAuth)
			return ;
	
		const fields = ['Email', 'Password'];
		let formData = {};
		let isEmpty = false;
	
		fields.forEach(field => {
			const inputField = this.shadowRoot.querySelector(`input-field[placeholder="${field}"]`);
			const value = inputField.querySelector('input').value;
			const errorMsg = inputField.querySelector('.warning');
	
			if (!value) {
				errorMsg.textContent = 'This field is required*';
				errorMsg.classList.add('show');
				isEmpty = true;
			} else {
				errorMsg.classList.remove('show');
				formData[field] = value;
			}
		});
	
		if (!isEmpty) {
			this.submitForm(formData);
		} else {
			console.log("something wrong!")
		}
	}

	async submitForm(formData) {
		try {
			const response = await fetch(`${HOST}/api/v1/auth/login/`, {
				method: 'POST',
				credentials: "include",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: formData['Email'],
					password: formData['Password'],
				}),
			});
	
			const data = await response.json();
			console.log(data);
	
			if (response.status == 200) {
				localStorage.setItem('accessToken', data.access_token);
				router.handleRoute('/home')
			}
			else if (response.status == 401 && data.is_2fa_enabled) {
				router.handleRoute('/two-factor');
			}
			else {
				const eMsg = this.shadowRoot.querySelector('#error-message');
				eMsg.textContent = data.detail;
				eMsg.classList.remove('success');
				eMsg.classList.add('show');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
}

const css = `

#content submit-button {
	margin-top: 5% !important;
	margin-bottom: 0 !important;
}

`