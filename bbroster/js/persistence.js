
function setRace(raceId)
{
  localStorage.setItem("bbRaceId", raceId);
  localStorage.removeItem("bbTeamRoster");
  
  window.location.href = "roster.html";
}

function unsetRace()
{
  localStorage.removeItem("bbRaceId");
  localStorage.removeItem("bbTeamRoster");
  window.location.href = "index.html";
}

function saveTeam()
{
  var JSONActiveTeam = JSON.stringify(activeTeam);
  localStorage.setItem("bbTeamRoster", JSONActiveTeam);
}
