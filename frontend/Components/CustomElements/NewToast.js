
const cssContent = /*css*/`
* {
    margin: 0;
    padding: 0;
    font-family: 'Sansation Bold', sans-serif;
    box-sizing: border-box;
    border-radius: 1px;

}



new-toast {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #003347;
    z-index: 100;
    border-radius: 10px;
}


.toastBox {
    position: fixed;
    top: 30px;
    right: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 20px;
    border-radius: 10px;
    color: black;
}

.toast {
    width: 400px;
    height: 80px;
    background: #fff;
    font-weight: 500;
    margin: 15px 0;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    position: relative;
    transform: translateX(100%);
    animation: moveleft 0.5s linear forwards;
}

@keyframes moveleft {
    100% {
        transform: translateX(0);
    }
}

.toast i {
    margin: 0 20px;
    font-size: 35px;
}

.toast.success i {
    color: green;
}

.toast.error i {
    color: red;
}

.toast.invalid i {
    color: orange;
}

.toast::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 5px;
    animation: anim 3s linear forwards;
}

@keyframes anim {
    100% {
        width: 0;
    }
}

.toast.success::after {
    background: green;
}

.toast.error::after {
    background: red;
}

.toast.invalid::after {
    background: orange;
}

.close-btn {
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.close-btn i {
    color: #666;
}

.toast.error .close-btn i,
.toast.invalid .close-btn i {
    color: #666;
}

.message {
    display: flex;
}

`;


export class NewToast extends HTMLElement {
    constructor() {
        super();
        // this.attachShadow({mode: "open"});
        this.innerHTML = `
            <style>
                ${cssContent}
            </style>        
            <div class="toastBox"></div>
        `;
    }
    connectedCallback() {
    }

    

}

customElements.define("new-toast", NewToast);

export function displayToast(status, message) {
    const toastBox = window.document.querySelector('.toastBox');
    const toast = document.createElement('div');
    toast.classList.add('toast', status);
    toast.innerHTML = `
        <button class="close-btn">X</button>
        <div class="message">
            <i class="fas fa-${ status !== 'error' ? 'check' : 'times'}-circle"></i>
            ${message}
        </div>
    `;
    toastBox.appendChild(toast);

    const closeButton = 
            toast.querySelector('.close-btn');
    closeButton.addEventListener('click', () => {
        toast.remove();
    });

    setTimeout(() => {
        toast.remove();
    }, 3000);
}