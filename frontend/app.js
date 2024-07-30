//app.js

import { ChatComponent } from "./ChatComponents/ChatComponent.js";
import { ChatItemComponent } from "./ChatComponents/ChatList/ChatItemComponent.js";
import { ChatListComponent } from "./ChatComponents/ChatList/ChatListComponent.js";
import { ChatFooterComponent } from "./ChatComponents/ChatRoom/ChatFooterComponent.js";
import { ChatHeaderComponent } from "./ChatComponents/ChatRoom/ChatHeaderComponent.js";
import { ChatRoomComponent } from "./ChatComponents/ChatRoom/ChatRoomComponent.js";
import { ReceiverMessageContainerComponent } from "./ChatComponents/ChatRoom/MessageComponents/ReceiverMessageContainer.js";
import { SenderMessageContainerComponent } from "./ChatComponents/ChatRoom/MessageComponents/SenderMessageContainerComponent.js";
import { ReceiverComponent } from "./ChatComponents/ChatRoom/ReceiverComponent.js";
import { SenderComponent } from "./ChatComponents/ChatRoom/SenderComponent.js";
import { FriendItemComponent } from "./ChatComponents/Friends/FriendItemComponent.js";
import { FriendsListComponent } from "./ChatComponents/Friends/FriendsListComponent.js";
import { CoverComponent } from "./ProfileComponents/CoverComponent.js";
import { CustomGraph } from "./ProfileComponents/GraphComponent/CustomGraph.js";
import { ProfileComponent } from "./ProfileComponents/ProfileComponent.js";
import { CustomProgressBar } from "./ProfileComponents/StatsComponents/LeagueComponents/CustomProgressBar.js";
import { LeagueInfo } from "./ProfileComponents/StatsComponents/LeagueComponents/LeagueInfo.js";
import { LeagueItem } from "./ProfileComponents/StatsComponents/LeagueComponents/LeagueItem.js";
import { RecordComponent } from "./ProfileComponents/StatsComponents/RecordMatchesComponents/RecordComponent.js";
import { StatsContainer } from "./ProfileComponents/StatsComponents/StatsContainer.js";
import { DateComponent } from "./ProfileComponents/TableComponents/BodyComponents/Date/DateComponent.js";
import { CustomTable } from "./ProfileComponents/TableComponents/CustomTable.js";
import { AchievementComponent } from "./ProfileComponents/UserInfosComponents/AchievementComponent.js";
import { LinkComponent } from "./ProfileComponents/UserInfosComponents/LinkComponent.js";
import { ProfileInfoComponent } from "./ProfileComponents/UserInfosComponents/ProfileInfoComponent.js";
import { UserInfoComponent } from "./ProfileComponents/UserInfosComponents/UserInfoComponent.js";
import { UserInfoContainerComponent } from "./ProfileComponents/UserInfosComponents/UserInfoContainer.js";
import { TournamentComponent } from "./TournamentComponents/TournamentComponent.js";

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
import { CustomButton } from "./TournamentComponents/CustomButton.js";
import { TournamentsTable } from "./TournamentComponents/TournamentsTable.js";
import { CreateTournament } from "./TournamentComponents/CreateTournament.js";
import { QRCodeComponent } from "./TournamentComponents/QRCodeComponent.js";
import { SettingContainer } from "./TournamentComponents/SettingContainer.js";
import { PlayersAndStages } from "./TournamentComponents/PlayersAndStages.js";
import { Visibility } from "./TournamentComponents/VisibillitySettings.js";


customElements.define("visibillity-settings", Visibility);
customElements.define("players-and-stages", PlayersAndStages);
customElements.define("setting-container", SettingContainer);
customElements.define("qrcode-component", QRCodeComponent);
customElements.define("create-tournament", CreateTournament);
customElements.define("tournaments-table", TournamentsTable);
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

customElements.define("sender-component", SenderComponent);
customElements.define("receiver-component", ReceiverComponent);
customElements.define("receiver-message-container", ReceiverMessageContainerComponent);
customElements.define("sender-message-container", SenderMessageContainerComponent);
customElements.define("chat-footer", ChatFooterComponent);
customElements.define("chat-header", ChatHeaderComponent);
customElements.define("chat-room", ChatRoomComponent);
customElements.define("friend-item", FriendItemComponent);
customElements.define("friends-list", FriendsListComponent);
customElements.define("chat-item", ChatItemComponent);
customElements.define("chat-list", ChatListComponent);
customElements.define("chat-page", ChatComponent);
customElements.define("cover-component", CoverComponent);
customElements.define("profile-info-component", ProfileInfoComponent);
customElements.define("user-info-component", UserInfoComponent);
customElements.define("link-component", LinkComponent);
customElements.define("achievement-component", AchievementComponent);
customElements.define("user-info-container", UserInfoContainerComponent);
customElements.define("league-item", LeagueItem);
customElements.define("custom-progress-bar", CustomProgressBar);
customElements.define("record-component", RecordComponent);
customElements.define("league-info", LeagueInfo);
customElements.define("stats-container", StatsContainer);
customElements.define("custom-graph", CustomGraph);
customElements.define("date-component", DateComponent);
customElements.define("custom-table", CustomTable);
customElements.define("profile-component", ProfileComponent);