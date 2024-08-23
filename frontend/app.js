// Game
import { Lobby } from "./Game/GamePlay/Lobby.js"
import { Buttons } from "./Game/GamePlay/buttons.js"
import { SinglePlayer } from './Game/GamePlay/SinglePlayer/SinglePlayerCart.js'
import { MultiPlayer } from './Game/GamePlay/MultiPlayer/MultiPlayerCart.js'
import { OnlineGame } from './Game/GamePlay/GameOnline/OnlineGameCart.js'
import { PageName } from "./Game/GamePlay/PageName.js";
import { PlayerBorder } from "./Game/GamePlay/PlayerBorder.js";
import { LaunchingGame } from './Game/GamePlay/launchingGame.js'
import { GameTable } from './Game/GamePlay/GameTable.js'
import { GameHeader } from './Game/GamePlay/GameHeader.js'
import { GameOver } from './Game/GamePlay/GameOver.js';
import { GameSelection } from './Game/GameSelection.js'

import { HeaderBar } from './Header/header-bar.js'
import { SearchBar } from './Header/Search-bar.js'
import { UserRank } from './Header/UserRank.js'
import { Hexagon } from './Header/hexagon.js'
import { Profile } from './Header/profile.js'

import { SideBarButtonIcons } from './side-bar/sb-icon.js'
import { SideBarButtonText } from './side-bar/sb-text.js'
import { SideBarButton } from './side-bar/sb-button.js'
import { CustomButton } from "./Tournament/CustomButton.js";
import { TournamentComponent } from "./Tournament/TournamentComponent.js";

import { SettingsComponent } from "./Settings/SettingsComponent.js"

import { createWebSocketsForTournaments } from "./Utils/TournamentWebSocketManager.js";



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

createWebSocketsForTournaments();