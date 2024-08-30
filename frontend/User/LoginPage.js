import { router } from '../root/Router.js';
import config from '../../Utils/GlobalVariables.js';

export default class LoginPage extends HTMLElement {
	constructor() {
		super();
		this.isOAuth = false;
	}
	connectedCallback() {
		this.innerHTML = `
			<style>${css}</style>
			
			<header-cpn></header-cpn>

			<div id="test">
				<div id="background"></div>

				<form id="content">
					<div id="inner-header">
						<h1>Login</h1>
					</div>
					
					<div id="error-message"></div>
					
					<input-field placeholder="Email" icon="./svg/email.svg"></input-field>
					<input-field placeholder="Password" icon="./svg/pwd.svg" eye="./svg/eyeClosed.svg"></input-field>
					
					<submit-button
						title="Login"
						account-text="Don't have an account? <a href='/signup'>Sign Up</a>">
					</submit-button>
					
					<div class="oauth-footer">
						<img src="./svg/orLine.svg" alt="Or">

						<div class="button-container">

							<button class="oauth-button google">
								<img src="./svg/google.svg" alt="Google">
							</button>
							
							<button class="oauth-button intra">
								<img src="./svg/42.svg" alt="Intra">
							</button>
						</div>
					</div>
				
				</form>
						
			</div>
		`;
	
		this.handleSubmit = this.handleSubmit.bind(this);
		this.querySelector('#content').addEventListener('submit', this.handleSubmit.bind(this));
		
		// oauth
		this.querySelector('.oauth-button.google').addEventListener('click', () => {
			this.isOAuth = true;
			window.location.href = `http://${config.serverIP}:8000/api/v1/auth/google/redirect/`;
		});
		
		this.querySelector('.oauth-button.intra').addEventListener('click', () => {
			this.isOAuth = true; 
			window.location.href = `http://${config.serverIP}:8000/api/v1/auth/intra/redirect/`;
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
			const inputField = this.querySelector(`input-field[placeholder="${field}"]`);
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
			const response = await fetch(`http://${config.serverIP}:8000/api/v1/auth/login/`, {
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
			} else {
				const eMsg = this.querySelector('#error-message');
				eMsg.textContent = data.detail;
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