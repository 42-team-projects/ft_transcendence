export class Visibility extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                ${cssContent}
            </style>
            <div class="item">
                <h1>Visibility</h1>
                <div class="settingsform">
                    <div class="chooseContainer" id="public">
                        <div class="checkbox aqua-border"></div>
                        <p>Public</p>
                    </div>
                    <div class="chooseContainer" id="private">
                        <div class="checkbox"></div>
                        <p>Private</p>
                    </div>
                </div>
            </div>
            <div class="subitems"></div>
        `;
    }


    createForms(id) {
        const subItems = this.shadowRoot.querySelector(".subitems");
        subItems.innerHTML = '';
        if (id == "public")
            return ;
        subItems.innerHTML = `
            <div class="item">
                <h2>Password</h2>
                <div class="settingsform">
                    <input id="password" type="password" placeholder="Password">
                </div>
            </div>
            <div class="item">
                <h2>Confirm Password</h2>
                <div class="settingsform">
                    <input id="re-password" type="password" placeholder="Re-Password">
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelectorAll(".chooseContainer").forEach(elem => {
            elem.addEventListener("click", e => {
                if (elem.id == "public")
                    this.shadowRoot.getElementById("private").querySelector(".checkbox").className = "checkbox";
                else
                    this.shadowRoot.getElementById("public").querySelector(".checkbox").className = "checkbox";
                elem.querySelector(".checkbox").className = "checkbox aqua-border";
                this.createForms(elem.id);
            });
        });
    }

    get access() {
        const accessStatus = this.shadowRoot.querySelector(".aqua-border");
        if (!accessStatus)
            return null;
        return accessStatus.parentNode.id;
    }

    get password() {
        if (this.access && this.access.toLowerCase() == "private")
        {
            const password = this.shadowRoot.getElementById("password");
            const re_password = this.shadowRoot.getElementById("re-password");
            if (password.value == "" || password.value.length < 4)
            {
                password.style.border = "1.5px solid red";
                return null;
            }
            else if (password.value != re_password.value)
            {
                password.style.border = "1.5px solid aqua";
                re_password.style.border = "1.5px solid red";
                return null;
            }
            else
            {
                password.style.border = "1.5px solid aqua";
                re_password.style.border = "1.5px solid aqua";
                return password.value;
            }
        }
        return null;
    }
}

const cssContent = /*css*/`

:host {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.item {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}

.subitems {
    display: flex;
    flex-direction: column;
    width: 90%;
    font-size: 16px;
    height: calc(100% - 10px);
    margin: 10px 5%;

}

.subitems .item h1 {
    margin: 15px;
    font-size: 24px;

}
.subitems .item .settingsform input {
    font-family: 'Sansation';
    max-width: 200px;
    min-width: 100px;
    width: auto;
    height: 40px;
    font-size: 16px;
    padding-right: 10px;
}

.item h1 {
    flex: 1;
}

.item h2 {
    font-family: 'Sansation';
    flex: 1;
}


.settingsform {
    flex: 1;
    width: 300px;
    height: 40px;
    display: flex;
    gap: 20px;
}
.settingsform input {
    height: 100%;
    border-radius: 10px;
    border: 1.5px solid aqua;
    width: 50%;
    background-color: transparent;
    font-family: 'Sansation Bold';
    color: #ffffff;
    margin-left: 10px;
    padding-left: 20px;
    outline: none;
}

.chooseContainer {
    display: flex;
    gap: 10px;
    height: 26px;
    font-size: 16px;
    align-items: center;
    
}


.checkbox {
    width: 26px;
    height: 26px;
    border: 2px solid #cccccc60;
    border-radius: 5px;
}


.aqua-border {
    border: 2px solid aqua;
    display: flex;
    border-radius: 7px;
    align-items: center;
    justify-content: center;
    background: url("/frontend/assets/icons/checked-icon.svg");
    background-repeat: no-repeat;
    background-size: cover;
}
`;