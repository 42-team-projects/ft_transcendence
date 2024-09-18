import { fetchWithToken } from "/root/fetchWithToken.js";
import { HOST } from '/Utils/GlobalVariables.js';
import { router } from "/root/Router.js";
const template = document.createElement('template');
template.innerHTML = /*html */`
	<style>
		footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 60px;
			padding: 0 20px;
			color: white;
			font-size: 1.2rem;
			font-weight: 500;
		}
		.logout {
			display: flex;
			align-items: center;
			gap: 10px;
			cursor: pointer;
		}

		.logoutText {
			font-size: 1.3rem;
			font-weight: 500;
		}
	</style>
	<footer>
		<div class="logout">
			<img loading="lazy" src="/images/logout.svg" alt=""/>
			<div class="logoutText"> logout </div>
		</div>
		<div class="display-errors"></div>
	</footer>
`;


const exit = document.createElement('template');
exit.innerHTML = /*html */`
<style>
	.exit {
		display: flex;
		align-items: center;
		gap: 7px;
		cursor: pointer;
	}
	.exitText {
		font-size: 1.3rem;
		font-weight: 500;
	}
	.exit object {
		width: 40px;
		transform: scaleX(-1)
	}
</style>
	<div class="exit">
		<object type="image/svg+xml" data="/images/exit.svg"></object>
		<div class="exitText"> Exit </div>
	</div>
`;
export class FooterBar extends HTMLElement {
	constructor() {
		super();
	}
	render() {
		this.appendChild(template.content.cloneNode(true));
        const accessToken = localStorage.getItem('accessToken');
		let logout = document.querySelector('.logout')
		logout.addEventListener('click', () => {
			fetchWithToken(`${HOST}/api/v1/auth/logout/`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${accessToken}`
				},
				credentials: 'include'
			})
			.then(response => {
				if (response.ok) {
					localStorage.removeItem('accessToken');
					router.handleRoute('/login')
				} else {
					response.json().then(errorData => {
						console.error('Logout failed:', errorData);
					});
				}
			})
			.catch(error => {
				console.error('catch ->', error);
			});
		});
	}
	setExitEventListeners() {
		document.querySelector('.logout').remove();
		this.querySelector('footer').insertBefore(exit.content.cloneNode(true), this.querySelector('.display-errors'));
		this.querySelector('.exit').addEventListener('click', () => {
			router.handleRoute(window.location.pathname);
		});
		const icon = this.querySelector('object');
		const text = this.querySelector('.exitText');
		icon.addEventListener('load', () => {
			const iconObjectContent = icon.contentDocument;
			const path = iconObjectContent.querySelector('path');
			path.setAttribute('stroke', 'white');
			text.style.color = 'white';
			this.querySelector('.exit').addEventListener('mouseover', () => {
				path.setAttribute('stroke', 'red');
				text.style.color = 'red';
			})
			this.querySelector('.exit').addEventListener('mouseout', () => {
				path.setAttribute('stroke', 'white');
				text.style.color = 'white';
			})
		})
	}
	remove() {
		this.innerHTML = "";
	}
}