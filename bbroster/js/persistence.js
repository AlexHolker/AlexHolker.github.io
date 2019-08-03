
function setRace(raceId)
{
  localStorage.setItem("bbRaceId", raceId);
  localStorage.removeItem("bbTeamRoster");
  
  window.location.href = "roster.html";
}

function unsetRace()
{
  localStorage.removeItem("bbRaceId");
  localStorage.removeItem("bbTeamRosters");
  window.location.href = "index.html";
}

function saveTeam()
{
  var JSONAllTeams = JSON.stringify(allTeams);
  localStorage.setItem("bbTeamRosters", JSONAllTeams);
}
