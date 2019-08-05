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
  allTeams.splice(localStorage.getItem("bbRosterNo"), 1);
  localStorage.removeItem("bbRosterNo");
  window.location.href = "index.html";
}

function saveTeam()
{
  var rosterNo = Number.parseInt(localStorage.getItem("bbRosterNo"));
  var JSONAllTeams = localStorage.getItem("bbTeamRosters");
  var allTeams = JSON.parse(JSONAllTeams);
  allTeams[rosterNo] = activeTeam;
  var newJSONAllTeams = JSON.stringify(allTeams);
  localStorage.setItem("bbTeamRosters", newJSONAllTeams);
}
