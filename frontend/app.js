//app.js

import { createWebSocketsForTournaments } from "./Utils/TournamentWebSocketManager.js";

import { ChatComponent } from "./Chat/ChatComponent.js";
// import { ChatItemComponent } from "./Chat/ChatList/ChatItemComponent.js";
// import { ChatListComponent } from "./Chat/ChatList/ChatListComponent.js";
// import { ChatFooterComponent } from "./Chat/ChatRoom/ChatFooterComponent.js";
// import { ChatHeaderComponent } from "./Chat/ChatRoom/ChatHeaderComponent.js";
// import { ChatRoomComponent } from "./Chat/ChatRoom/ChatRoomComponent.js";
// import { ReceiverMessageContainerComponent } from "./Chat/ChatRoom/MessageComponents/ReceiverMessageContainer.js";
// import { SenderMessageContainerComponent } from "./Chat/ChatRoom/MessageComponents/SenderMessageContainerComponent.js";
// import { ReceiverComponent } from "./Chat/ChatRoom/ReceiverComponent.js";
// import { SenderComponent } from "./Chat/ChatRoom/SenderComponent.js";
// import { FriendItemComponent } from "./Chat/Friends/FriendItemComponent.js";
// import { FriendsListComponent } from "./Chat/Friends/FriendsListComponent.js";
// import { CoverComponent } from "./Profile/CoverComponent.js";
// import { CustomGraph } from "./Profile/GraphComponent/CustomGraph.js";
import { ProfileComponent } from "./Profile/ProfileComponent.js";
// import { CustomProgressBar } from "./Profile/StatsComponents/LeagueComponents/CustomProgressBar.js";
// import { LeagueInfo } from "./Profile/StatsComponents/LeagueComponents/LeagueInfo.js";
// import { LeagueItem } from "./Profile/StatsComponents/LeagueComponents/LeagueItem.js";
// import { RecordComponent } from "./Profile/StatsComponents/RecordMatchesComponents/RecordComponent.js";
// import { StatsContainer } from "./Profile/StatsComponents/StatsContainer.js";
// import { DateComponent } from "./Profile/TableComponents/BodyComponents/Date/DateComponent.js";
// import { CustomTable } from "./Profile/TableComponents/CustomTable.js";
// import { AchievementComponent } from "./Profile/UserInfosComponents/AchievementComponent.js";
// import { LinkComponent } from "./Profile/UserInfosComponents/LinkComponent.js";
// import { ProfileInfoComponent } from "./Profile/UserInfosComponents/ProfileInfoComponent.js";
// import { UserInfoComponent } from "./Profile/UserInfosComponents/UserInfoComponent.js";
// import { UserInfoContainerComponent } from "./Profile/UserInfosComponents/UserInfoContainer.js";
import { TournamentComponent } from "./Tournament/TournamentComponent.js";

import { Login } from "./login.js";
window.customElements.define('login-page', Login);
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
import { TournamentsTable } from "./Tournament/TournamentsTable.js";
import { CreateTournament } from "./Tournament/CreateTournament.js";
import { PlayersAndStages } from "./Tournament/PlayersAndStages.js";
import { Visibility } from "./Tournament/VisibillitySettings.js";
import { TournamentRules } from "./Tournament/TournamentRules.js";
import { TournamentRound } from "./Tournament/TournamentRound.js";

import { SettingsComponent } from "./Settings/SettingsComponent.js"

customElements.define("tournament-round", TournamentRound);
customElements.define("visibillity-settings", Visibility);
customElements.define("players-and-stages", PlayersAndStages);
customElements.define("tournament-rules", TournamentRules);
customElements.define("create-tournament", CreateTournament);
customElements.define("custom-button", CustomButton);
customElements.define("tournament-page", TournamentComponent);

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

// customElements.define("sender-component", SenderComponent);
// customElements.define("receiver-component", ReceiverComponent);
// customElements.define("receiver-message-container", ReceiverMessageContainerComponent);
// customElements.define("sender-message-container", SenderMessageContainerComponent);
// customElements.define("chat-footer", ChatFooterComponent);
// customElements.define("chat-header", ChatHeaderComponent);
// customElements.define("chat-room", ChatRoomComponent);
// customElements.define("friend-item", FriendItemComponent);
// customElements.define("friends-list", FriendsListComponent);
// customElements.define("chat-item", ChatItemComponent);
// customElements.define("chat-list", ChatListComponent);
// customElements.define("chat-page", ChatComponent);
// customElements.define("cover-component", CoverComponent);
// customElements.define("profile-info-component", ProfileInfoComponent);
// customElements.define("user-info-component", UserInfoComponent);
// customElements.define("link-component", LinkComponent);
// customElements.define("achievement-component", AchievementComponent);
// customElements.define("user-info-container", UserInfoContainerComponent);
// customElements.define("league-item", LeagueItem);
// customElements.define("custom-progress-bar", CustomProgressBar);
// customElements.define("record-component", RecordComponent);
// customElements.define("league-info", LeagueInfo);
// customElements.define("stats-container", StatsContainer);
// customElements.define("custom-graph", CustomGraph);
// customElements.define("date-component", DateComponent);
// customElements.define("custom-table", CustomTable);
// customElements.define("profile-component", ProfileComponent);
