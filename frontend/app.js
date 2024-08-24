import User from './cpn/User.js'
import SignupPage from "./cpn/SignupPage.js";
import LoginPage from "./cpn/LoginPage.js";
import { EmailConf, HomePage } from "./cpn/EmailConf.js";
import OAuth from "./cpn/Oauth.js";
import { router } from './cpn/Router.js';



customElements.define("user-cpn", User);
customElements.define("signup-page", SignupPage);
customElements.define("login-page", LoginPage);
customElements.define("email-page", EmailConf);
customElements.define("home-page", HomePage);
customElements.define("oauth-callback", OAuth);

document.addEventListener('DOMContentLoaded', (event) => {
    window.addEventListener("popstate", () =>
        router.handleRoute(window.location.pathname)
    );
});