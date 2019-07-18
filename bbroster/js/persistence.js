
function setTeam(raceId)
{
  localStorage.setItem("bbRaceId", raceId);
  localStorage.removeItem("bbTeamRoster");
  
  window.location.href = "roster.html";
}

function unsetTeam()
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
