function populateTeamSelect()
{
  var teamSelectContainer = document.getElementById("teamSelectContainer");
  
  var JSONActiveTeam = localStorage.getItem("bbTeamRoster");
  if (JSONActiveTeam !== null)
  {
    var loadTeamLink = document.createElement("a");
    loadTeamLink.href = "roster.html";
    loadTeamLink.innerHTML = "Load existing team.";
    teamSelectContainer.appendChild(loadTeamLink);
  }
  
  for (var team in teamDefs)
  {
    addTeamSelect(teamSelectContainer, team);
  }
}

/* Workaround for JavaScript scope issues only using final value of team.*/
function addTeamSelect(teamSelectContainer, team)
{
  var teamSelect = document.createElement("div");
  var teamSelectTitle = document.createElement("h1");
  var teamSelectButton = document.createElement("button");
  teamSelectButton.onclick = function() {setRace(team);};
  teamSelectButton.innerHTML = "Create " + teamDefs[team].race + " Team";
  teamSelectTitle.innerHTML = teamDefs[team].race;
  teamSelectContainer.appendChild(teamSelect);
  teamSelect.appendChild(teamSelectTitle);
  teamSelect.appendChild(teamSelectButton);
}