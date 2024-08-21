
const login = document.createElement('template');
const afterLogin = document.createElement('template')

login.innerHTML = /*html*/ `
<link rel="stylesheet" href="./login.css">
    <div class="login">
        <h1>Login</h1>
        <form method="post">
            <input class="username" type="text" name="u" placeholder="Username" required="required" />
            <input class="password" type="password" name="p" placeholder="Password" required="required" />
            <button type="submit" class="btn btn-primary btn-block btn-large">Let me in.</button>
        </form>
    </div>
`
afterLogin.innerHTML = /*html*/ `
    <header-bar></header-bar>
    <side-bar></side-bar>
    <root-content></root-content>
    <footer>
        <div class="underbar"></div>
        <div class="logout">
            <img src="./images/logout.svg" alt="" />
            <div class="logoutText"> logout </div>
        </div>
    </footer>
`
export class Login extends HTMLElement{
    
    constructor()
    {
        super();
        this.appendChild(login.content.cloneNode(true))

    }

    clickEvent() {
        this.querySelector('.login').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting the traditional way
        
            const username = this.querySelector('.username').value;
            const password = this.querySelector('.password').value;
        
            fetch('http://127.0.0.1:8000/game/login/', {  // Updated path to '/game/login/'
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data.player.id);
                
                const queryParams = new URLSearchParams({
                    userId: data.player.id,    // Assuming 'data' contains 'userId'
                }).toString();

                //storing the data in local storage
                localStorage.setItem('userId', data.player.id);

                document.body.innerHTML = afterLogin.innerHTML;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    connectedCallback(){
        this.clickEvent();
    }
}
