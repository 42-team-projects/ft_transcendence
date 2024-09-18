


// Game
import { Lobby } from "/Components/Game/GamePlay/Lobby.js"
import { Buttons } from "/Components/Game/GamePlay/buttons.js"
import { SinglePlayer } from '/Components/Game/GamePlay/SinglePlayer/SinglePlayerCart.js'
import { MultiPlayer } from '/Components/Game/GamePlay/GameOfline/GameOfline.js'
import { OnlineGame } from '/Components/Game/GamePlay/GameOnline/OnlineGameCart.js'
import { PageName } from "/Components/Game/GamePlay/PageName.js";
import { PlayerBorder } from "/Components/Game/GamePlay/PlayerBorder.js";
import { LaunchingGame } from '/Components/Game/GamePlay/launchingGame.js'
import { GameTable } from '/Components/Game/GamePlay/GameTable.js'
import { GameHeader } from '/Components/Game/GamePlay/GameHeader.js'
import { GameOver } from '/Components/Game/GamePlay/GameOver.js';
import { GameSelection } from '/Components/Game/GameSelection.js'

import { HeaderBar } from '/Components/Header/header-bar.js'
import { SearchBar } from '/Components/Header/Search-bar.js'
import { UserRank } from '/Components/Header/UserRank.js'
import { Hexagon } from '/Components/Header/hexagon.js'
import { Profile } from '/Components/Header/profile.js'
import { HomePage } from '/Components/Home/HomePage.js'

import { SideBarButtonIcons } from '/Components/side-bar/sb-icon.js'
import { SideBarButtonText } from '/Components/side-bar/sb-text.js'
import { SideBarButton } from '/Components/side-bar/sb-button.js'
import { CustomButton } from "/Components/Tournament/CustomButton.js";
import { LeaderBoardPage } from "/Components/LeaderBoard/LeaderBoardPage.js";
import { SettingsComponent } from "/Components/Settings/SettingsComponent.js"
import { getCurrentPlayerData } from "/Utils/GlobalVariables.js";



customElements.define("header-bar", HeaderBar)
customElements.define("sb-button", SideBarButton)
customElements.define('sb-text',SideBarButtonText)
customElements.define('sb-icon',SideBarButtonIcons)
customElements.define('c-hexagon',Hexagon)
customElements.define('search-bar', SearchBar);
customElements.define('c-profile', Profile)
customElements.define('user-rank',UserRank)
customElements.define('game-over', GameOver)
customElements.define('game-table', GameTable)
customElements.define('launching-game', LaunchingGame)
customElements.define('game-header', GameHeader)
customElements.define('page-name',PageName)
customElements.define('player-border',PlayerBorder)
customElements.define('game-lobby', Lobby)
customElements.define("single-player", SinglePlayer)
customElements.define("multi-player", MultiPlayer)
customElements.define("online-game", OnlineGame)
customElements.define('c-button', Buttons)
customElements.define('game-selection', GameSelection)

import SignupPage from "/Components/User/SignupPage.js";
import LoginPage from "/Components/User/LoginPage.js";
import EmailConf from "/Components/User/EmailConf.js";
import OAuth from "/Components/User/Oauth.js";
import { ForgotPassword, ConfirmPassword } from "/Components/User/ForgotPassword.js";
import { TwoFactorAuth } from "/Components/User/TwoFactorAuth.js";
import { router } from "/root/Router.js"
import { FooterBar } from "/Utils/FooterBar.js"

customElements.define("footer-bar", FooterBar);
customElements.define("signup-page", SignupPage);
customElements.define("login-page", LoginPage);
customElements.define("email-page", EmailConf);
customElements.define("oauth-callback", OAuth);
customElements.define("forgot-password", ForgotPassword);
customElements.define("confirm-password", ConfirmPassword);
customElements.define("two-factor", TwoFactorAuth);

document.addEventListener('DOMContentLoaded', async (event) => {
    window.addEventListener("popstate", () =>
        router.handleRoute(window.location.pathname)
    );
});
