window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
        fetch(`http://127.0.0.1:8000/api/v1/auth/confirm-email/${token}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('message').textContent = data.message;
                if (data.status === 'success') {
                    document.getElementById('continue').style.display = 'block';
                } else {
                    document.getElementById('resend').style.display = 'block';
                }
            });
    }
};

function resendConfirmation() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    fetch('http://127.0.0.1:8000/api/v1/auth/resend-confirm/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('===> ', data)
        document.getElementById('message').textContent = data.message;

        if (data.status === 'success')
        {
            if (data.message === 'Email is already confirmed')
                window.location.href = 'http://127.0.0.1:3000/html/login.html';
        }
        else
        {
            document.getElementById('message').textContent = data.detail ? data.detail : data.message;
        }
    })
    .catch(error => {
        console.log(error);
    });
}