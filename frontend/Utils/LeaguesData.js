
export function getLeagueColor(league) {
    if (!league)
        return "aqua";
    const leagueColors = new Map();
    leagueColors.set("bronze", "#B54C1E");
    leagueColors.set("silver", "#C0C0C0");
    leagueColors.set("gold", "#EB9A45");
    leagueColors.set("platinum", "#459BEB");
    leagueColors.set("legendary", "#EB4545");
    return leagueColors.get(league.toLowerCase());
}

export function getLeagueImage(league) {
    const leagueColors = new Map();
    leagueColors.set("bronze", "./assets/images/leagues/bronze-league.svg");
    leagueColors.set("silver", "./assets/images/leagues/silver-league.svg");
    leagueColors.set("gold", "./assets/images/leagues/gold-league.svg");
    leagueColors.set("platinum", "./assets/images/leagues/platinum-league.svg");
    leagueColors.set("legendary", "./assets/images/leagues/legendary-league.svg");
    return leagueColors.get(league.toLowerCase());
}
