import { CustomGraph } from "./GraphComponent/CustomGraph.js";
import { ProfileComponent } from "./ProfileComponent.js";
import { CustomProgressBar } from "./StatsComponents/LeagueComponents/CustomProgressBar.js";
import { LeagueInfo } from "./StatsComponents/LeagueComponents/LeagueInfo.js";
import { LeagueItem } from "./StatsComponents/LeagueComponents/LeagueItem.js";
import { StatsContainer } from "./StatsComponents/StatsContainer.js";
import { DateComponent } from "./TableComponents/BodyComponents/Date/DateComponent.js";
import { CustomTable } from "./TableComponents/CustomTable.js";

customElements.define("league-item", LeagueItem);
customElements.define("custom-progress-bar", CustomProgressBar);
customElements.define("league-info", LeagueInfo);
customElements.define("stats-container", StatsContainer);
customElements.define("custom-graph", CustomGraph);
customElements.define("date-component", DateComponent);
window.customElements.define("custom-table", CustomTable);
window.customElements.define("profile-component", ProfileComponent);