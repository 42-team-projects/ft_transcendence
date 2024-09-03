export default class OAuth extends HTMLElement {
    async connectedCallback() {
        const { router } = await import('../../root/Router.js');
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access_token');
        const error = params.get('error');

        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            router.handleRoute('/home');
        } else if (error) {
            router.handleRoute('/login');
            const messageDiv = document.querySelector('#error-message');
            messageDiv.innerHTML = error;
            messageDiv.classList.add('show', 'error');
            
            // console.error('An error occurred during the OAuth process: ' + error);
        } else {
            console.error('An error occurred during the OAuth process');
        }
    }
}