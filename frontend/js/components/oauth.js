function redirectToProvider(providerUrl) {
    window.location.href = providerUrl;
}

function handleOAuthResponse() {
    window.addEventListener('load', function() {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            console.log('Access token:', token);
            localStorage.setItem('access_token', token);
            window.location.href = "../html/home.html";
        } 
        // else {
        //     console.error('An error occurred during the OAuth process');
        // }
    });
}