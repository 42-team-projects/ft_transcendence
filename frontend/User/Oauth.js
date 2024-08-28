
export default class OAuth extends HTMLElement {
    async connectedCallback() {
        const { router } = await import('./../root/Router.js');
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access_token');

        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            router.handleRoute('/home');
        } else {
            console.error('An error occurred during the OAuth process');
        }
    }
}