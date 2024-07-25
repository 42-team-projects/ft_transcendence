
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
    leagueColors.set("bronze", "./assets/leagues-logo/bronze-league.svg");
    leagueColors.set("silver", "./assets/leagues-logo/silver-league.svg");
    leagueColors.set("gold", "./assets/leagues-logo/gold-league.svg");
    leagueColors.set("platinum", "./assets/leagues-logo/platinum-league.svg");
    leagueColors.set("legendary", "./assets/leagues-logo/legendary-league.svg");
    return leagueColors.get(league.toLowerCase());
}
