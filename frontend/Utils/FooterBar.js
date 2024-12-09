import { fetchWithToken } from "/root/fetchWithToken.js";
import { HOST } from '/Utils/GlobalVariables.js';
import { router } from "/root/Router.js";
import { updateApiData } from "/Utils/APIManager.js";
import { PROFILE_API_URL, setCurrentPlayer } from "/Utils/GlobalVariables.js";

const template = document.createElement('template');
template.innerHTML = /*html */ `
	<style>
		footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
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
logoutT.innerHTML = /*html */ `
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
exit.innerHTML = /*html */ `
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
	.exit svg {
		width: 40px;
		height: 40px;
		transform: scaleX(-1)
	}
</style>
	<div class="exit">
		<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
		<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10 12H18M18 12L15.5 9.77778M18 12L15.5 14.2222M18 7.11111V5C18 4.44772 17.5523 4 17 4H7C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V16.8889" stroke="#00fffb90" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
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
        logout.addEventListener('click', async() => {

            fetchWithToken(`${HOST}/api/v1/auth/logout/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    credentials: 'include'
                })
                .then(async(response) => {
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
        this.querySelector('footer').prepend(exit.content.cloneNode(true));
        this.querySelector('.exit').addEventListener('click', () => {
            router.handleRoute(window.location.pathname);
        });
        const icon = this.querySelector('svg');
        const text = this.querySelector('.exitText');
        const path = icon.querySelector('path');
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
    }
    remove() {
        if (this.querySelector('.exit'))
            this.querySelector('.exit').remove();
        if (this.querySelector('.logout'))
            this.querySelector('.logout').remove();
    }
}