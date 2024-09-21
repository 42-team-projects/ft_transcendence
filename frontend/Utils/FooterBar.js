import { fetchWithToken } from "/root/fetchWithToken.js";
import { HOST } from '/Utils/GlobalVariables.js';
import { router } from "/root/Router.js";
import { updateApiData } from "/Utils/APIManager.js";
import { PROFILE_API_URL, setCurrentPlayer } from "/Utils/GlobalVariables.js";

const template = document.createElement('template');
template.innerHTML = /*html */`
	<style>
		footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 60px;
			padding: 0 20px;
			color: white;
			font-size: 1.2rem;
			font-weight: 500;

		}


	</style>
	<footer>
		<div class="display-errors">
			<div class="display-toast"></div>
		</div>
	</footer>
`;
const logoutT = document.createElement('template');
logoutT.innerHTML = /*html */`
<style>
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
	.display-errors {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
<div class="logout">
	<img loading="lazy" src="/images/logout.svg" alt=""/>
	<div class="logoutText"> logout </div>
</div>
`

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
		this.appendChild(template.content.cloneNode(true));
	}
	render() {
		this.querySelector('footer').insertBefore(logoutT.content.cloneNode(true), this.querySelector('.display-errors'));
        const accessToken = localStorage.getItem('accessToken');
		let logout = document.querySelector('.logout')
        logout.addEventListener('click', async () => {

            fetchWithToken(`${HOST}/api/v1/auth/logout/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                credentials: 'include'
            })
            .then(async (response) => {
                if (response.ok) {

			
					router.removeNotificatonAndFriendList();

					const res = await updateApiData(PROFILE_API_URL + "offline/", "");
					setCurrentPlayer(null);
		
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
		if (this.querySelector('.logout')) 
			this.querySelector('.logout').remove();
		console.log("this.querySelector('footer'):: ", this.querySelector('footer'));
		this.querySelector('footer').prepend(exit.content.cloneNode(true));
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
		if (this.querySelector('.exit')) 
			this.querySelector('.exit').remove();
		if (this.querySelector('.logout')) 
			this.querySelector('.logout').remove();
	}
}