//var allTeams;

function openExistingRoster(rosterNo)
{
  localStorage.setItem("bbRosterNo", rosterNo);
  window.location.href = "roster.html";
}

function createNewRoster(raceId, newRosterNo)
{
  localStorage.setItem("bbRosterNo", newRosterNo);
  localStorage.setItem("bbRaceId", raceId);
  window.location.href = "roster.html";
}

function deleteRoster()
{
  var JSONAllTeams = localStorage.getItem("bbTeamRosters");
  var allTeams = JSON.parse(JSONAllTeams);
  allTeams.splice(localStorage.getItem("bbRosterNo"), 1);
  JSONAllTeams = JSON.stringify(allTeams);
  localStorage.setItem("bbTeamRosters", JSONAllTeams);
  localStorage.removeItem("bbRosterNo");
  window.location.href = "index.html";
}

function saveTeam()
{
  var rosterNo = Number.parseInt(localStorage.getItem("bbRosterNo"));
  var JSONAllTeams = localStorage.getItem("bbTeamRosters");
  var allTeams = JSON.parse(JSONAllTeams);
  allTeams[rosterNo] = activeTeam;
  JSONAllTeams = JSON.stringify(allTeams);
  localStorage.setItem("bbTeamRosters", JSONAllTeams);
}
