import { CustomInputField } from "/Components/CustomElements/CustomInputField.js";
import { CustomToggleSwitch } from "/Components/CustomElements/CustomToggleSwitch.js";
import { CustomAlert } from "/Components/Alert/CustomAlert.js";
import { PROFILE_API_URL, UPDATE_USER_API_URL, HOST, updateCurrentPlayer } from "/Utils/GlobalVariables.js";
import { getApiData, updateApiData, deleteApiData, createApiData} from "/Utils/APIManager.js";
import { CustomSpinner } from "/Components/CustomElements/CustomSpinner.js";
import { fetchWithToken } from "/root/fetchWithToken.js";
import { router } from "/root/Router.js";
import { displayToast } from "/Components/CustomElements/CustomToast.js";

export class AccountContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="container">
                <custom-input-field class="username-field" label="USERNAME" description="Username must be unique." placeholder="" type="text" readonly="true"></custom-input-field>
                <custom-input-field editable="true" class="email-field" label="EMAIL" description="You can not change your email." placeholder="" type="email" readonly="true"></custom-input-field>
                <custom-input-field class="password-field" label="PASSWORD" description="the password must be contains at least two lower case and two upper case alphabitecs, two special characters and two numbers." placeholder="" type="password" readonly="true"></custom-input-field>
                <custom-toggle-switch></custom-toggle-switch>
            </div>
            <div class="actions">
                <settings-item id="delete-account-button" background-color="#c8000080" color="#c8000090" border-size="2px" width="200px" height="40px"><h3>DELETE ACCOUNT</h3></settings-item>
                <settings-item class="active" id="save-button" class="disable" color="aqua" border-size="2px" width="64px" height="40px"><h4>SAVE</h4></settings-item>
            </div>
            <custom-spinner time="10" ></custom-spinner>
        `;
    }
    interval;

    async connectedCallback() {
        const refreshBox = this.shadowRoot.querySelector("custom-spinner");

        refreshBox.display();

        const playerData = await getApiData(PROFILE_API_URL + "me/");

        const usernameField = this.shadowRoot.querySelector(".username-field");
        if (usernameField)
            usernameField.value = playerData.user.username;
        const emailField = this.shadowRoot.querySelector(".email-field");
        if (emailField)
            emailField.value = playerData.user.email;

        const passwordField = this.shadowRoot.querySelector(".password-field");
        if (playerData.user.auth_provider != "email")
        {
            passwordField.editable = true;
            passwordField.description = "You can't set a password to this account because you are logged using oauth.";
        }

        const twoFactorAuth = this.shadowRoot.querySelector("custom-toggle-switch");
        if (twoFactorAuth){
            if (playerData.user.auth_provider != "email")
                twoFactorAuth.remove();
            else 
                twoFactorAuth.active = playerData.user.is_2fa_enabled;
        }


        this.interval = setInterval(() => {
            if (usernameField.value != playerData.user.username || validatePassword(passwordField.value))
                saveButton.classList.remove("disable");
            else
                saveButton.classList.add("disable");

        }, 700);


        const saveButton = this.shadowRoot.querySelector("#save-button");
        saveButton.addEventListener("click", async () => {
            if (saveButton.classList.contains("disable"))
                return ;

            const accountDataForm = new FormData();
            if (usernameField.value)
                accountDataForm.append("username", usernameField.value)
            if (passwordField.value)
                accountDataForm.append("password", passwordField.value)
            const res = await updateApiData(UPDATE_USER_API_URL, accountDataForm);
            if (!res) {
                displayToast("error", "Opps somethings wrong!!!");
                return ;
            }
            displayToast(res.status, res.message);
            if (usernameField.value)
            {
                playerData.user.username = usernameField.value;
            }
            await updateCurrentPlayer();
            refreshBox.display();
            saveButton.classList.add("disable");

            



            // you can now update the account infos by fetching API.

        });


        const deleteButton = this.shadowRoot.querySelector("#delete-account-button");
        deleteButton.addEventListener("click", () => {
            const alertsConrtainer = window.document.querySelector("body .alerts");
            alertsConrtainer.style.display = "flex";

            const customAlert = new CustomAlert();
            customAlert.innerHTML = `
                <h2 slot="header"> Settings Alert</h2>
                <div slot="body" class="alert-footer">
                    <h2> Are you sure you want to delete your account</h2>
                    <h5> All your inforamtions will be destroyed and there is no way to restore it again.</h5>
                </div>
                <div slot="footer" class="alert-footer buttons">
                    <custom-button id="playBtn" width="160px" height="48px" reverse>DELETE</custom-button>
                    <custom-button id="cancelBtn" width="160px" height="48px" reverse>CANCEL</custom-button>
                </div>
            `;
            customAlert.querySelector("#playBtn").addEventListener("click", async () => {
                const accessToken = localStorage.getItem('accessToken');
                const logoutResponse = await fetchWithToken(`${HOST}/api/v1/auth/logout/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    credentials: 'include'
                });
                if (logoutResponse) {
                    const response = await deleteApiData(PROFILE_API_URL + "me/");
                    // add request to /logout
                    if (response) {
                        customAlert.remove();
                        alertsConrtainer.style.display = "none";
                        localStorage.removeItem('accessToken');
                        router.handleRoute('/login')
                    }

                }
            });
            customAlert.querySelector("#cancelBtn").addEventListener("click", () => {
                customAlert.remove();
                alertsConrtainer.style.display = "none";
            });

            alertsConrtainer.appendChild(customAlert);
        });

    }

    disconnectedCallback() {
        clearInterval(this.interval);
    }
}

function validatePassword(password) {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{8,}$/;
    return re.test(password);
    // return true;
}


const cssContent = /*css*/ `
    * {
        margin: 0;
        padding: 0;
    }
    :host {
        flex: 4;
        height: calc(100% - 50px);
        display: flex;
        gap: 50px;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }

    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 50px;
    }

    .actions {
        display: flex;
        flex-wrap: wrap-reverse;
        gap: 20px;
        width: 90%;
        align-items: center;
        justify-content: space-around;
    }
    
    .actions * {
        cursor: pointer;
    }


    h3 {
        color: white;
    }
    
    .disable {
        opacity: 0.5;
        pointer-events: none;
    }
    
    .active {
        border: 2px solid aqua;
        color: aqua;   
    }

`;

customElements.define("account-content", AccountContent);