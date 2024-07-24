document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    const request = new Request('http://127.0.0.1:8000/api/v1/auth/reset-password/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email
        })
    });

    fetch(request).then(function(response) {
        return response.json().then(function(data) {
            if (!response.ok) {
                document.getElementById('errorMessage').innerText = data.detail;
                document.getElementById('customError').style.display = 'block';
                document.getElementById('note').style.display = 'block';
                document.getElementById('content').style.display = 'none';
            } else {
                document.getElementById('content').style.display = 'none';
                document.getElementById('message').style.display = 'block';
            }
        });
    }).catch(function(error) {
        console.log(error);
    });
});