window.addEventListener('load', function(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    fetch(`http://127.0.0.1:8000/api/v1/auth/verify-token/${token}/`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            document.getElementById('error').style.display = 'block';
        }
    })
    .then(data => {
        console.log('data -> ', data)
        // If the response is OK, show the content div
        if (data) {
            document.getElementById('content').style.display = 'block';
        }
    })
    .catch(error => {
        console.log(error);
    });
});


document.getElementById('confirmResetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const newPassword = document.getElementById('new_password').value;
    const retypePassword = document.getElementById('retype_password').value;

    if (newPassword !== retypePassword) {
        document.getElementById('passwordError').innerText = 'Passwords do not match';
        document.getElementById('passwordError').style.display = 'block';
        return;
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    fetch(`http://127.0.0.1:8000/api/v1/auth/confirm-reset-password/${token}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            new_password: newPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('content').style.display = 'none';

        document.getElementById('message').style.display = 'block';
        document.getElementById('loginButton').style.display = 'block';
        document.getElementById('loginButton').style.display = 'block';
    })
    .catch(error => {
        console.log(error);
    });
});
